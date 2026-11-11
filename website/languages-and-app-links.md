---
sidebar_position: 7
title: Languages and app links
description: Website addresses per language, and how website links open the app.
---

# Languages and app links

## Languages

- The **default language** is at plain addresses: `/series/…`, `/categories/…`.
- Every other language turned on in <AdminPath path="Content › Website" /> › **Look & languages** lives under its code: `/hi/series/…`, `/ar/series/…`. Only languages already turned on for the app in <AdminPath path="System › Settings › Regions & languages" /> can be picked.
- Right-to-left languages such as Arabic are laid out right to left.
- Visitors switch language from the header when **Show a language menu in the header** is on, and light or dark when **Let visitors switch between light and dark** is on (both on **Look & languages**).
- Website texts are translated on the **Translations** tab. Series and category names use the translations already entered for the app.
- The sitemap lists every page in every language, with links between the language versions.

## Links that open the app

The website serves the two files phones read to open links in your app instead of the browser:

- `/.well-known/assetlinks.json` (Android)
- `/.well-known/apple-app-site-association` (iOS)

Both are filled from your backend's app settings, so they stay empty until the backend knows your app (see [Admin Panel › Share links](/admin-panel/share-links/)). Your app must list the website's domain too: see [Mobile App › Deep links](/mobile-app/deep-links/).

The app's own share links (`/s/<id>` for a series, `/c/<handle>` for a creator) also work on the website: they redirect to the series or creator page.

## Pages the website has

| Address | Page |
|---|---|
| `/` | Home, built from your sections |
| `/series` | All series, with category chips |
| `/series/<slug>` | One series: banner, poster, synopsis, creator, an **Open in app** button and store buttons |
| `/categories` and `/categories/<slug>` | All categories, and the series in one |
| `/creators/<slug>` | A creator's profile and series |
| `/sitemap.xml`, `/robots.txt` | For search engines |
| `/llms.txt`, `/llms-full.txt` | For AI assistants, only when you allow AI crawlers and `llms.txt` |
| `/app-ads.txt` | For AdMob, only when `APP_ADS_TXT` is set ([Connect to the Admin Panel](./connect.md)) |
