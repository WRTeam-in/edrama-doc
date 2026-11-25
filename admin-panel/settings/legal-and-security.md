---
sidebar_position: 9
title: Legal pages and security
description: Your terms, privacy policy and other legal pages, and two-factor sign-in for the team.
---

# Legal pages and security

## Legal pages

**Where:** <AdminPath path="System › Settings › Legal pages" />

Seven pages, shown in the app, on the website and at `https://your-domain.com/legal/{page}` on your Admin Panel's domain:

| Page | Address | Used for |
|---|---|---|
| **Terms of service** | `/legal/terms` | The app's terms. Opened in the app from <Path panel="app">Me › Settings › Terms of use</Path>. |
| **Privacy policy** | `/legal/privacy` | Required by both stores. |
| **Creator terms** | `/legal/creator-terms` | Creators accept these before they upload: the version in force, before creating a series. |
| **Content licences & credits** | `/legal/licences` | Credits for licensed content and fonts. |
| **Refund policy** | `/legal/refunds` | Linked from the app's Help & refunds. |
| **Community guidelines** | `/legal/community` | The rules for comments and reviews. |
| **Takedown requests (DMCA)** | `/legal/takedown` | How rights holders report content. |

None is published on a fresh install: each shows **Not published yet** until you write it. **Each publish adds a new version and keeps the earlier ones**, so what a viewer or creator agreed to can always be shown later.

### Write and publish

<Steps>

1. Choose **Write** (for a page never published) or **Edit**.
2. Enter the **Title** and the **Text** in Markdown: `## headings`, lists, `**bold**` and `[links](https://…)` show in the app.
3. Under **Languages**, optionally write the same page in each app language. An empty tab shows the default language's text. When you change the terms, change these too: they're published with the same version.
4. Choose **Publish**.

</Steps>

The list shows each page's **version** and when it was updated.

:::warning Creator terms
Creators can't create a series until the **Creator terms** are published. When you publish a **new version**, every creator is asked to read and accept it again before continuing.
:::

:::caution Write your own legal text
Store reviewers check that your privacy policy and terms describe your app. Have them written for your business and country.
:::

### Search & sharing

Choose **Search & sharing** on a page to set, per language, an optional **Search title** (about 60 characters), **Search description** (about 150 characters), or **Hide from search engines**. Empty boxes keep the page's own title and first lines.

## Sign-in & security

**Where:** <AdminPath path="System › Settings › Sign-in & security" />

### Require two-factor for every member

**Only the Owner** can turn on **Require two-factor for every member**. The card shows how many active members already use two-factor and names those who don't.

<Steps>

1. Turn on **Require two-factor for every member**.
2. Confirm. The dialog says how many members don't use it yet (including you, if you don't).

</Steps>

From their next click, members without two-factor are held on the setup page, and nobody reaches the Studio without a second factor. Turning it off lets members sign in with their password alone; those who use two-factor keep it.

A member who lost their phone and recovery codes can be helped with **Reset 2FA** on [Team and roles](../team-and-roles.md#two-factor-authentication).

### Always on

These protections can't be switched off:

| Protection | Details |
|---|---|
| **Lockout** | 5 failed sign-ins for one email from one address lock it for 15 minutes. |
| **Session length** | 12 hours from sign-in; no "remember me". |
| **Disabled members** | Signed out at their next click. |
| **Strong passwords** | At least 12 characters, not found in a known data breach. |
| **Same answer for every failure** | Sign-in and password reset never reveal whether an email has an account. |
| **Audit** | Every sign-in, failure, lockout and sign-out is in the [audit log](/admin-panel/using/system/audit-log/). |
| **Encrypted secrets** | Integration keys, viewers' email and phone, and two-factor secrets are stored encrypted. |
