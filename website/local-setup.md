---
sidebar_position: 2
title: Requirements and local setup
description: Run the eDrama website on your computer before putting it live.
---

# Requirements and local setup

## Before you start

- **Node.js 20 or newer** ([nodejs.org](https://nodejs.org/)). Check with `node -v`.
- **npm**, which comes with Node.js. The website ships with a `package-lock.json`.
- A running eDrama backend. On your computer that can be the Admin Panel at `http://localhost:8000`.

The website is built with Next.js 16 and React 19.

## Steps

<Steps>
<Step title="Open the website folder">

Open the website's source code (it comes with your purchase) in a terminal or in an editor such as VS Code.

</Step>
<Step title="Install the packages">

```bash
npm install
```

</Step>
<Step title="Create your settings file">

```bash
cp .env.example .env.local
```

Open `.env.local` and set at least `EDRAMA_API_URL`. All settings are explained on [Connect to the Admin Panel](./connect.md).

```ini title=".env.local"
EDRAMA_API_URL=http://localhost:8000
```

</Step>
<Step title="Start it">

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

</Step>
</Steps>

## Check it worked

The home page shows your app name and the sections from <AdminPath path="Content › Website" />.

## Troubleshooting

- **A plain "eDrama" page with no sections.** The website couldn't reach the backend. Check `EDRAMA_API_URL`: it is the server's address **without** `/api`, and it must start with `https://`. Plain `http://` is accepted only for `localhost`, `127.0.0.1` and `*.test` hosts.
- **A "back soon" page.** The website is switched off in the Admin Panel. Use **Switch website on** in <AdminPath path="Content › Website" />.

## Checks before you deploy

```bash
npm run lint
npm run build
```
