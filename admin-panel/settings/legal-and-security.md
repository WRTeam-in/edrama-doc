---
sidebar_position: 9
title: Legal pages and security
description: Your terms, privacy policy and other legal pages, and two-factor sign-in for the team.
---

# Legal pages and security

## Legal pages

**Where:** <AdminPath path="System › Settings › Legal pages" />

Seven pages, shown in the app and on the website:

- Terms of service
- Privacy policy
- Creator terms (creators accept these before they upload)
- Content licences & credits
- Refund policy
- Community guidelines
- Takedown requests (DMCA)

None is published on a fresh install: each shows **Not published yet** until you write it. **Write** (or **Edit**) a page, fill in its **Title** and **Text** in Markdown (headings, lists and links show in the app), and **Publish**. The language tabs take the page in your other app languages; an empty tab shows the default language's text, so update the translations when you change the terms. Each publish adds a **new version** and keeps the earlier ones, so what a viewer agreed to can be shown later. Each page is public at `/legal/<page>` on your Admin Panel's domain.

**Search & sharing** on each page sets an optional **Search title** and **Search description** per language, or **Hide from search engines**. Empty boxes keep the page's own title and first lines.

:::caution Write your own legal text
Store reviewers check that your privacy policy and terms describe your app. Have them written for your business and country.
:::

## Sign-in & security

**Where:** <AdminPath path="System › Settings › Sign-in & security" />

Only the Owner can turn on **Require two-factor for every member**. Members without it must then set it up at their next click. The card shows how many active members already use two-factor. See [Team and roles](../team-and-roles.md#two-factor-authentication).
