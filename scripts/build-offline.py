#!/usr/bin/env python3
"""Builds a simple, offline HTML copy of the documentation for the download package.

It reads the pages Docusaurus already rendered (run `bun run build` first), keeps only each page's content, and
writes plain HTML files with one shared sidebar, relative links and local images. No JavaScript: it opens straight
from the folder (file://), as CodeCanyon reviewers and buyers do.

    python3 scripts/build-offline.py <output-folder> [online-docs-url]
"""

from __future__ import annotations

import html
import os
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BUILD = ROOT / "build"
BASE = "/edrama-doc/"

# Sections in reading order: (folder, sidebar heading). Pages inside each come from their front matter.
SECTIONS = [
    ("admin-panel", "Admin Panel"),
    ("mobile-app", "Mobile App"),
    ("website", "Website"),
    ("creator-portal", "Creator Portal"),
    ("features", "Features"),
    ("support", "Help"),
    ("faqs", "Help"),
    ("changelog", "Help"),
]

# Interactive pages left to the online documentation.
ONLINE_ONLY = {"features/earnings-calculator"}


def front_matter(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    match = re.match(r"---\n(.*?)\n---", text, re.S)
    data: dict[str, str] = {}
    if match:
        for line in match.group(1).splitlines():
            key, _, value = line.partition(":")
            data[key.strip()] = value.strip().strip("'\"")
    if "title" not in data:
        heading = re.search(r"^# (.+)$", text, re.M)
        data["title"] = heading.group(1).strip() if heading else path.stem
    return data


def position(value: str | None) -> float:
    try:
        return float(value) if value is not None else 999.0
    except ValueError:
        return 999.0


def section_pages(folder: str) -> list[dict]:
    """The pages of one section, in sidebar order, with sub-folders (such as Settings) as groups."""
    base = ROOT / folder
    entries: list[tuple[float, str, list[dict]]] = []
    for path in sorted(base.iterdir()):
        if path.suffix in (".md", ".mdx"):
            meta = front_matter(path)
            slug = f"{folder}/{path.stem}" if path.stem != "index" else f"{folder}/index"
            if slug in ONLINE_ONLY:
                continue
            pos = -1.0 if path.stem == "index" else position(meta.get("sidebar_position"))
            entries.append((pos, path.stem, [{"slug": slug, "title": meta.get("sidebar_label") or meta["title"]}]))
        elif path.is_dir():
            category = path / "_category_.json"
            label, pos = path.name.replace("-", " ").title(), 999.0
            if category.exists():
                import json

                data = json.loads(category.read_text(encoding="utf-8"))
                label, pos = data.get("label", label), position(str(data.get("position")))
            children = []
            for child in sorted(path.glob("*.md*")):
                meta = front_matter(child)
                children.append(
                    (position(meta.get("sidebar_position")), child.stem,
                     {"slug": f"{folder}/{path.name}/{child.stem}", "title": meta.get("sidebar_label") or meta["title"],
                      "group": label})
                )
            children.sort(key=lambda c: (c[0], c[1]))
            entries.append((pos, path.name, [c[2] for c in children]))
    entries.sort(key=lambda e: (e[0], e[1]))
    return [page for _, _, pages in entries for page in pages]


def built_file(slug: str) -> Path:
    folder = slug[: -len("/index")] if slug.endswith("/index") else slug
    return BUILD / folder / "index.html"


def extract_content(page_html: str) -> str:
    start = page_html.find('<div class="theme-doc-markdown markdown">')
    if start < 0:
        raise SystemExit("page content not found: is the build up to date?")
    depth, pos = 0, start
    for tag in re.finditer(r"<(/?)div\b[^>]*>", page_html[start:]):
        depth += -1 if tag.group(1) else 1
        if depth == 0:
            pos = start + tag.end()
            break
    return page_html[start:pos]


def clean(content: str) -> str:
    """Drops what needs JavaScript; keeps everything readable."""
    content = re.sub(r"<dialog\b.*?</dialog>", "", content, flags=re.S)
    content = re.sub(r'<div class="box_[^"]*"><label[^>]*for="ed-domain".*?</p></div>', "", content, flags=re.S)
    # A screenshot sits in a button (click to enlarge): keep the image, link it to the full-size file instead.
    content = re.sub(
        r'<button[^>]*class="thumb_[^"]*"[^>]*>(<img[^>]*src="([^"]+)"[^>]*>)</button>',
        r'<a href="\2" target="_blank">\1</a>', content, flags=re.S)
    content = re.sub(r"<button\b.*?</button>", "", content, flags=re.S)
    content = re.sub(r'\s(loading|decoding)="[^"]*"', "", content)
    return content


def relative(target: str, from_dir: str) -> str:
    return os.path.relpath(target, from_dir or ".").replace(os.sep, "/")


def rewrite_links(content: str, page_dir: str, known: dict[str, str], online: str, assets: dict[str, str]) -> str:
    def fix(match: re.Match) -> str:
        attr, url = match.group(1), html.unescape(match.group(2))
        if not url.startswith(BASE):
            return match.group(0)
        path, _, anchor = url[len(BASE):].partition("#")
        anchor = f"#{anchor}" if anchor else ""
        if path.startswith(("images/", "assets/")):
            local = assets.get(path, path)
            return f'{attr}="{html.escape(relative(local, page_dir))}"'
        key = path.strip("/")
        if key in known:
            return f'{attr}="{html.escape(relative(known[key], page_dir) + anchor)}"'
        return f'{attr}="{html.escape(online + path + anchor)}" target="_blank"'

    return re.sub(r'\b(href|src)="([^"]*)"', fix, content)


def output_path(slug: str) -> str:
    return slug + ".html"


def sidebar(pages: list[dict], current: str, page_dir: str) -> str:
    out, heading, group = [], None, None
    for page in pages:
        if page["section"] != heading:
            if group:
                out.append("</ul></li>")
                group = None
            if heading is not None:
                out.append("</ul>")
            heading = page["section"]
            out.append(f"<p class=\"nav-heading\">{html.escape(heading)}</p><ul>")
        if page.get("group") != group:
            if group:
                out.append("</ul></li>")
            group = page.get("group")
            if group:
                out.append(f"<li><span class=\"nav-group\">{html.escape(group)}</span><ul>")
        active = ' class="active" aria-current="page"' if page["slug"] == current else ""
        href = relative(output_path(page["slug"]), page_dir)
        out.append(f"<li><a href=\"{href}\"{active}>{html.escape(page['title'])}</a></li>")
    if group:
        out.append("</ul></li>")
    out.append("</ul>")
    return "".join(out)


STYLE = """
:root{--ed-accent:#4a7300;--ed-ink:#141416;--ed-muted:#5b5b63;--ed-line:#e6e6ea;--ed-soft:#f6f6f8}
html,body{background:#fff}
body{margin:0;color:var(--ed-ink)}
.layout{display:grid;grid-template-columns:280px minmax(0,1fr);min-height:100vh}
.side{border-right:1px solid var(--ed-line);background:var(--ed-soft);padding:20px 16px 40px;position:sticky;top:0;height:100vh;overflow:auto;box-sizing:border-box}
.side .logo img{height:28px;display:block;margin:0 0 6px}
.side .version{font-size:13px;color:var(--ed-muted);margin:0 0 18px}
.side ul{list-style:none;margin:0;padding:0}
.side ul ul{padding-left:12px;border-left:1px solid var(--ed-line);margin:2px 0 6px 6px}
.side li a{display:block;padding:5px 8px;border-radius:6px;color:var(--ed-ink);font-size:14px;line-height:1.35;text-decoration:none}
.side li a:hover{background:#ececf0}
.side li a.active{background:var(--ed-ink);color:#fff}
.nav-heading{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--ed-muted);margin:18px 8px 6px;font-weight:600}
.nav-group{display:block;padding:5px 8px;font-size:14px;font-weight:600}
main{padding:40px 48px 64px;max-width:860px;box-sizing:border-box}
.pager{display:flex;justify-content:space-between;gap:16px;margin-top:48px;padding-top:20px;border-top:1px solid var(--ed-line)}
.pager a{display:block;padding:12px 16px;border:1px solid var(--ed-line);border-radius:10px;text-decoration:none;color:var(--ed-ink);max-width:48%}
.pager a small{display:block;color:var(--ed-muted);font-size:12px}
.pager .next{margin-left:auto;text-align:right}
.online{margin-top:24px;font-size:14px;color:var(--ed-muted)}
.markdown img{max-width:100%;height:auto}
.markdown figure{margin:24px 0}
@media (max-width:860px){.layout{grid-template-columns:1fr}.side{position:static;height:auto;border-right:0;border-bottom:1px solid var(--ed-line)}main{padding:24px 16px 48px}}
"""


def page_html(title: str, body: str, nav: str, css: str, logo: str, version: str, prev, nxt, online_url: str) -> str:
    pager = []
    if prev:
        pager.append(f'<a class="prev" href="{prev[0]}"><small>Previous</small>{html.escape(prev[1])}</a>')
    if nxt:
        pager.append(f'<a class="next" href="{nxt[0]}"><small>Next</small>{html.escape(nxt[1])}</a>')
    return f"""<!doctype html>
<html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)} | eDrama Documentation</title>
<link rel="stylesheet" href="{css}">
<style>{STYLE}</style>
</head><body>
<div class="layout">
<nav class="side" aria-label="Documentation">
<a class="logo" href="{logo[1]}"><img src="{logo[0]}" alt="eDrama"></a>
<p class="version">Documentation {html.escape(version)}</p>
{nav}
</nav>
<main>
{body}
<div class="pager">{''.join(pager)}</div>
<p class="online">The latest version, with search, is online: <a href="{online_url}" target="_blank">{online_url}</a></p>
</main>
</div>
</body></html>
"""


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    out = Path(sys.argv[1]).resolve()
    online = sys.argv[2] if len(sys.argv) > 2 else "https://wrteam-in.github.io/edrama-doc/"
    online = online.rstrip("/") + "/"
    version = sys.argv[3] if len(sys.argv) > 3 else ""
    if not (BUILD / "index.html").exists():
        raise SystemExit("Run `bun run build` first.")

    pages: list[dict] = []
    for folder, heading in SECTIONS:
        for page in section_pages(folder):
            page["section"] = heading
            pages.append(page)

    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)

    # Assets: the site stylesheet, brand images, screenshots and any image the pages import.
    css_files = sorted((BUILD / "assets" / "css").glob("*.css"))
    (out / "assets").mkdir()
    shutil.copy(css_files[0], out / "assets" / "docs.css")
    shutil.copytree(BUILD / "images", out / "images")
    assets: dict[str, str] = {}
    if (BUILD / "assets" / "images").exists():
        shutil.copytree(BUILD / "assets" / "images", out / "assets" / "images")
        for image in (out / "assets" / "images").iterdir():
            assets[f"assets/images/{image.name}"] = f"assets/images/{image.name}"

    # URL path (without the base) -> output file, for every page in this copy.
    known: dict[str, str] = {}
    for page in pages:
        slug = page["slug"]
        url = slug[: -len("/index")] if slug.endswith("/index") else slug
        known[url] = output_path(slug)
    known[""] = "index.html"

    for i, page in enumerate(pages):
        slug = page["slug"]
        target = out / output_path(slug)
        target.parent.mkdir(parents=True, exist_ok=True)
        page_dir = os.path.dirname(output_path(slug))
        content = clean(extract_content(built_file(slug).read_text(encoding="utf-8")))
        content = rewrite_links(content, page_dir, known, online, assets)
        prev = (relative(output_path(pages[i - 1]["slug"]), page_dir), pages[i - 1]["title"]) if i else None
        nxt = (relative(output_path(pages[i + 1]["slug"]), page_dir), pages[i + 1]["title"]) if i + 1 < len(pages) else None
        target.write_text(page_html(
            page["title"], content, sidebar(pages, slug, page_dir), relative("assets/docs.css", page_dir),
            (relative("images/brand/logo-horizontal-light.svg", page_dir), relative("index.html", page_dir)),
            version, prev, nxt, online), encoding="utf-8")

    # Start page: where to begin, then every section.
    first = {p["section"]: p for p in reversed(pages)}
    start = [
        ("Install the backend", "admin-panel/requirements.html", "Server requirements, upload, the installation wizard and background jobs."),
        ("Configure the Admin Panel", "admin-panel/first-steps.html", "First steps, then every Settings screen and Monetization."),
        ("Set up the mobile app", output_path(first["Mobile App"]["slug"]), "Flutter, Firebase, rebranding, ads, purchases and release builds."),
        ("Deploy the website", output_path(first["Website"]["slug"]), "Run, connect and deploy the public website."),
        ("Features", output_path(first["Features"]["slug"]), "What eDrama does for viewers, creators and your team."),
        ("Support", "support/index.html", "How to reach us, and the FAQs."),
    ]
    cards = "".join(
        f'<li><a href="{href}"><strong>{html.escape(t)}</strong><br><span>{html.escape(d)}</span></a></li>'
        for t, href, d in start)
    body = f"""<div class="markdown"><header><h1>eDrama Documentation</h1></header>
<p>Install, configure and re-brand eDrama: the Admin Panel and API, the Flutter app, the website and the Creator Portal.</p>
<p>Start with the backend. The app and the website both connect to it.</p>
<ul class="start">{cards}</ul></div>
<style>.start{{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}}
.start li{{margin:0}}.start a{{display:block;padding:16px;border:1px solid var(--ed-line);border-radius:12px;text-decoration:none;color:var(--ed-ink);height:100%;box-sizing:border-box}}
.start a:hover{{border-color:var(--ed-ink)}}.start span{{color:var(--ed-muted);font-size:14px}}</style>"""
    (out / "index.html").write_text(page_html(
        "Start here", body, sidebar(pages, "", ""), "assets/docs.css",
        ("images/brand/logo-horizontal-light.svg", "index.html"), version, None,
        ("admin-panel/index.html", pages[0]["title"]), online), encoding="utf-8")

    # Any link left pointing at the old site base is a bug in this script.
    leftovers = [str(p.relative_to(out)) for p in out.rglob("*.html") if re.search(r'(href|src)="' + BASE, p.read_text(encoding="utf-8"))]
    if leftovers:
        raise SystemExit(f"links to {BASE} left in: {', '.join(leftovers)}")
    print(f"Offline documentation: {out} ({len(pages) + 1} pages)")


if __name__ == "__main__":
    main()
