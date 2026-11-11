---
sidebar_position: 1
title: Website
description: What the eDrama public website is, how it gets its content, and what you need to put it live.
---

# Website

eDrama comes with a public website: a landing page, a page for every series, category and creator, plus a sitemap, `robots.txt` and `llms.txt`. It helps people find your series on Google and leads every visitor to the app.

<DocBanner />

## How it works

- The website is a **Next.js** app that you host separately from the Admin Panel, for example on Vercel.
- It has no database of its own. It reads your backend's public website API (`/api/v1/website…`), which holds no viewer data and needs no keys.
- Everything it shows is edited in <AdminPath path="Content › Website" />: sections, layouts, texts, header and footer, theme, languages, search text and social links.
- The name, logos and theme colour come from <AdminPath path="System › Settings › Branding" />, so the app, the panels and the website always match.
- Series are **shown, never played**. Every poster and button leads to the app.
- Pages are built once and shared by every visitor, then rebuilt in the background every 5 minutes. When you **Publish** in the Admin Panel, the backend tells the website to refresh at once.
- If your backend can't be reached, the website keeps showing its last good copy.

## Set it up in this order

<Steps>
<Step title="Install the Admin Panel first">

The website needs a running backend. See [Admin Panel › Installation](/admin-panel/installation/).

</Step>
<Step title="Run the website on your computer">

[Requirements and local setup](./local-setup.md).

</Step>
<Step title="Connect it to your Admin Panel">

[Connect to the Admin Panel](./connect.md): the server address, the website address and the refresh secret.

</Step>
<Step title="Put it live">

[Deploy to Vercel](./deploy-vercel.md), or [any Node.js server](./other-hosts.md).

</Step>
<Step title="Fill in the content">

[Edit the website](./edit-content.md) from the Admin Panel, then Publish.

</Step>
</Steps>

## A common domain layout

| Address | What runs there |
|---|---|
| `your-domain.com` (or `www.`) | This website |
| `admin.your-domain.com` | The backend, Admin Panel and Creator Portal |
