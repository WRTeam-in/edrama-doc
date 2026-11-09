# eDrama Documentation

The buyer documentation for **eDrama** by WRTeam: installing the backend and Admin Panel, the website, the Creator Portal, and setting up and re-branding the Flutter app.

👉 **Live:** https://wrteam-in.github.io/edrama-doc/

## Run it locally

You need **Node.js 20 or newer** (or [Bun](https://bun.sh)).

```bash
npm install      # or: bun install
npm run start    # opens http://localhost:3000/edrama-doc/
```

## Build

```bash
npm run build    # fails on any broken link
npm run serve    # serves the built site
```

## Layout

| Folder | Section |
|---|---|
| `mobile-app/` | Mobile App |
| `admin-panel/` | Admin Panel (server, installation, settings) |
| `website/` | Website |
| `creator-portal/` | Creator Portal |
| `features/` | Features, earnings explained and the earnings calculator |
| `support/`, `faqs/`, `changelog/` | Single pages |
| `src/components/` | Page components: Steps, AdminPath, ServerUrl, Checklist, AccentPreview, Shot, EarningsCalculator |
| `static/images/` | Logos and screenshots (WebP, kept under 400 KB each by `scripts/check-media.sh`) |

## Deploy

Every push to `main` builds the site and publishes it to the `gh-pages` branch with GitHub Actions (`.github/workflows/deploy.yaml`). Pull requests are built and checked, not deployed.
