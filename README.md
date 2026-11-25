# eDrama Documentation

The complete documentation website for **eDrama**: server installation, the Flutter app, the Admin Panel, the Creator Portal, the viewer app, monetization, integrations, FAQs and troubleshooting.

Built with [Docusaurus 3](https://docusaurus.io/) (the same stack as WRTeam's other product docs), with eDrama's own brand: the app's black and "Greenlight" accent, coin gold, Instrument Serif and Geist.

## Run it locally

Requires **Node.js 20 or newer**.

```bash
npm install
npm run start          # live preview at http://localhost:3000
```

Full-text search is built when the site is built, so to try search:

```bash
npm run build
npm run serve          # http://localhost:3000, with search
```

`npm run build` fails on any broken link or anchor, so a green build means every link works.

## Deploy

- **Any static host** (Netlify, Vercel, Cloudflare Pages, S3, nginx): run `npm run build` and upload the `build/` folder.
- **GitHub Pages**: push to `main`; `.github/workflows/deploy.yaml` builds and publishes. Set the address with `DOCS_URL` and `DOCS_BASE_URL`, for example `DOCS_URL=https://wrteam-in.github.io DOCS_BASE_URL=/eDrama-Doc/`.

## Project layout

```
docs/                     every page, one .mdx file each, in folders per navbar section
  intro.mdx, getting-started/   Introduction
  installation/                 Setup › Server installation
  app-setup/                    Setup › Mobile app setup
  admin/                        Admin Panel (content, community, audience, money, settings, system)
  creator/                      Creator Portal
  viewer-app/                   Viewer App
  monetization/                 Monetization
  website/                      Website setup (deploy and connect the Next.js site)
  integrations/                 Integrations and external links
  help/                         FAQs, Troubleshooting, Support, Changelog
sidebars.js               the order of pages in each section
docusaurus.config.js      navbar, footer, search, colours mode
src/css/custom.css        the eDrama theme (light "Paper" and dark "Ink")
src/components/Screen/    annotated screenshots with numbered markers (manifest.json lists the files), wireframe fallback
src/components/Docs/      Steps, Path, Pill, Flow, Cards, HelpBanner, Access, Defaults
src/components/Domain/    DomainInput + ServerUrl: the reader types their domain once, every callback address fills in
src/components/Checklist/ Checklist, ChecklistGroup, ChecklistItem: ticks saved in the browser (launch checklist)
src/components/EarningsCalculator/  the creator earnings calculator
src/clientModules/        the reading-progress bar on doc pages
src/theme/                MDX components available on every page; shareable FAQ blocks
src/pages/index.js        the animated home page
static/img/brand/         eDrama logos and mark (from the app's assets)
static/img/hero/          home-page poster key art for demo series (made with Gemini; edit POSTERS in src/pages/index.js)
static/img/screens/       the real screenshots, as WebP (see below)
static/fonts/             Geist and Instrument Serif (SIL Open Font License)
scripts/screens-manifest.mjs  lists static/img/screens with each file's size (runs before start and build)
SCREENSHOTS.md            every screenshot: where it is used and how it was captured
VERIFICATION-NOTES.md     what couldn't be confirmed from the source code
```

## Writing pages

Pages are Markdown (MDX). These components work on any page without importing them:

| Component | Use |
|---|---|
| `<Path>Settings › Branding</Path>` | A menu path. `panel="creator"` (gold), `panel="app"` (blue) or `panel="server"`. |
| `<Steps>` … numbered list … `</Steps>` | Numbered steps with a connecting line. Leave a blank line inside the tags. |
| `<Screen …/>` | An annotated screen (below). |
| `<Flow steps={['Draft', 'Live']} />` | A status flow. A step can be `{label, tone, note}`. |
| `<Cards items={[{icon, title, text, to}]} />` | Linked cards. |
| `<Access area="Users" view="…" edit="…" />` | Which permission a screen needs. |
| `<Defaults rows={[['Setting', 'Value']]} />` | A box of default values. |
| `<Pill tone="live">Live</Pill>` | A small label. |
| `<HelpBanner />` | The "contact support" banner. |
| `<Tabs>` / `<TabItem>` | Tabs. |
| `<DomainInput />` and `<ServerUrl path="/api/v1/…" />` | The reader types their Admin Panel domain once; every `ServerUrl` on the site shows their real address with a **Copy** button. Add `inline` for use inside a sentence. |
| `<Checklist id="…">` › `<ChecklistGroup title="…">` › `<ChecklistItem id="…">` | A checklist with a progress ring whose ticks are saved in the browser. Item ids must stay the same, or saved ticks are lost. Put each tag on its own line with blank lines between. |
| `<EarningsCalculator />` | The creator earnings calculator. |
| `:::tip`, `:::note`, `:::warning`, `:::danger` | Coloured notes. |

FAQ entries use `<details id="…">` and get a **Share** button that copies a direct link. Put `<details>` and `<summary>` on separate lines.

Front-matter values must be in double quotes (titles often contain colons).

## Screenshots with numbered markers

Every `<Screen>` is a **real screenshot** with numbered markers on the things the page explains, and a numbered list under it. Hovering a marker highlights its explanation and the other way round. `SCREENSHOTS.md` lists every screen, where it's used and how it was captured.

- Screenshots live in `static/img/screens/<id>.webp` (`.png` and `.jpg` work too), where `<id>` is the `id` in the `<Screen>` tag.
- `npm run screens` lists them with their pixel size in `src/components/Screen/manifest.json`. It runs by itself before `npm start` and `npm run build`, so a new or replaced file just needs a restart or rebuild.
- Each screenshot shows at its **own aspect ratio**. A full-page capture (taller than 16:10) scrolls inside its browser frame, and clicking an item in the list scrolls to its marker.
- A `<Screen>` without a screenshot falls back to a **wireframe** (`wire` prop) marked *Wireframe*, with a note saying which file to save.

To replace a screenshot:

1. Capture the screen. Admin Panel and Creator Portal: **1600 px wide** (taller is fine for a full page). Viewer app: straight from the phone, **1080 × 2400** or similar.
2. Save it as `static/img/screens/<id>.webp` (or `.png`). For WebP: `cwebp -q 90 -m 6 -sharp_yuv shot.png -o <id>.webp`, or `-lossless` for text-heavy screens.
3. Restart or rebuild.
4. Check the markers still sit on the right things. Their `x` and `y` are **percentages** of the screenshot's width and height, measured to the centre of the marker.

```mdx
<Screen
  id="admin-dashboard"
  type="browser"            // or "phone"
  wire="dashboard"          // wireframe used only if the screenshot is missing
  url="/admin"              // shown in the frame's address bar
  title="Dashboard"
  caption="What the screenshot shows."
  markers={[
    {x: 89.5, y: 14.9, title: 'Range', text: 'Last 7, 30 or 90 days.'},
  ]}
/>
```

A marker can also take `area: [x, y, width, height]` to outline a region while it's highlighted.

Wireframes are in `src/components/Screen/wires.js`: browser presets `dashboard`, `list`, `editor`, `form`, `split`, `builder`, `calendar`, `upload`, `auth`, `wizard`, `studio`, `modal`, `system`; phone presets `app-feed`, `app-player`, `app-sheet`, `app-detail`, `app-list`, `app-wallet`, `app-settings`, `app-rewards`, `app-form`, `app-splash`, `app-grid`.

## Sources

Written from the eDrama Admin Panel (Laravel 13, Filament 5) and the eDrama app (Flutter 3.47.7) source code. Where the code left a question open, pages say so in a **To confirm** note; the full list is in `VERIFICATION-NOTES.md`.
