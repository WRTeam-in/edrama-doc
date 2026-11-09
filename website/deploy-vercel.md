---
sidebar_position: 4
title: Deploy to Vercel
description: Put the eDrama website live on Vercel, with your own domain.
---

# Deploy to Vercel

[Vercel](https://vercel.com) is the easiest place to run the website: it builds Next.js apps with no server to manage, and its free Hobby plan is enough to start (check Vercel's own terms for commercial use).

## Before you start

- A Vercel account.
- The website's code in a Git repository you own (GitHub, GitLab or Bitbucket), or the [Vercel CLI](https://vercel.com/docs/cli) on your computer.
- Your Admin Panel installed and reachable over `https://`.

## Steps

<Steps>
<Step title="Create the project">

In Vercel, click **Add New › Project** and import the website's repository. Vercel detects Next.js by itself (the repository's `vercel.json` says so too). No build settings need changing.

</Step>
<Step title="Add the settings">

Before the first deploy, open **Environment Variables** and add the variables from [Connect to the Admin Panel](./connect.md), at least `EDRAMA_API_URL` and `REVALIDATE_SECRET`. Add them for **Production** and **Preview**.

</Step>
<Step title="Deploy">

Click **Deploy**. From now on every push to `main` deploys the live site, and every other branch gets its own preview address.

</Step>
<Step title="Add your domain">

In the project, open **Settings › Domains**, add your domain (for example `your-domain.com` and `www.your-domain.com`) and point its DNS records at Vercel exactly as that screen shows.

</Step>
<Step title="Tell the Admin Panel">

Set the same address in <AdminPath path="Content › Website" /> › **Connection & history** › **Website address**.

</Step>
</Steps>

## Check it worked

Open your domain: the home page shows your sections. Open `https://your-domain.com/sitemap.xml` and `https://your-domain.com/robots.txt` to see the files search engines read.

## Deploying from your computer instead

The website includes `scripts/deploy.sh`, which uses the Vercel CLI:

```bash
npm install --global vercel
vercel link              # once: link the folder to your Vercel project
scripts/deploy.sh        # a preview deployment, with its own address
scripts/deploy.sh --prod # the live site
```

It runs `npm ci`, `npm run lint` and `npm run build` before deploying.

## Deploying from GitHub Actions (optional)

The website's `.github/workflows/deploy.yml` checks every push (lint, type check, `npm audit`) and can deploy to Vercel too. To turn the deploy on, add three repository secrets:

| Secret | Where to find it |
|---|---|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

Without `VERCEL_TOKEN` the workflow only runs the checks, so it works alongside Vercel's own Git connection. Use one or the other for deploys, not both.
