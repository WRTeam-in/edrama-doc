---
sidebar_position: 0
title: "Settings"
description: "How the Settings screen is organised, how saving works, and where every integration key lives."
sidebar_label: "Settings overview"
---

**Settings** holds everything an operator configures without touching code. It's one page with a menu of sections down the side, in five groups, and a **Save** bar at the bottom.

<Access area="Settings" view="See settings" edit="Change them" owner="Two-factor requirement, AI Studio keys and billing" />

<Screen
  id="admin-settings"
  type="browser"
  wire="form"
  url="/admin/settings?s=branding"
  title="Settings"
  caption="Settings, open on Branding."
  markers={[
    {x: 27.9, y: 24.9, title: 'Sections menu', text: 'Grouped into Brand & look, App & content, Money, Messages, Trust & access.'},
    {x: 55.4, y: 22.6, title: 'Section form', text: 'The settings of the section you picked.'},
    {x: 85.4, y: 22.6, title: 'Preview', text: 'How your choices look on the app and the Studio.'},
    {x: 92.1, y: 95.5, title: 'Save', text: 'Changes take effect when you save. Many changes ask for a reason, kept in the audit log.'},
  ]}
/>

## The sections

| Group | Section | What it holds |
|---|---|---|
| **Brand & look** | [Branding](/admin-panel/settings/branding/) | App name, tagline, logos, favicon, wordmark font, theme colour, the Studio's default theme |
| | [Sign-in screen](/admin-panel/settings/branding/#sign-in-screen) | The photos, motion, poster strip and words of the sign-in pages |
| **App & content** | [Regions & languages](/admin-panel/settings/regions-and-languages/) | App languages and their files, the Studio language, the reporting currency and exchange rates |
| | [App & support](/admin-panel/settings/app-and-support/) | App versions and store links, support email, feature switches, maintenance mode, comment blocklist |
| | [Video pipeline](/admin-panel/settings/video-pipeline/) | Upload size, YouTube episodes, creator upload limits, release delay |
| | [Storage & video](/admin-panel/settings/storage-and-video/) | Where files live (this server, Amazon S3, Cloudflare R2) and what streams videos (this server or Cloudflare Stream) |
| | [AI Studio](/admin-panel/settings/ai-studio/) | Switch, models, limits, prices, keys and billing |
| **Money** | [Payments](/admin-panel/settings/payments/) | Revenue share, store fees, creator price limits, spend cap choices, adjustment approval limit, Google Play and App Store keys |
| | [Creator revenue](/admin-panel/settings/payments/#creator-revenue) | Monthly import, pool percents, approval, AdMob Reporting API |
| **Messages** | [Notifications](/admin-panel/settings/firebase-and-notifications/) | Push limits and quiet hours, notification wording, Firebase keys, system alerts |
| | [Email delivery (SMTP)](/admin-panel/settings/email/) | Your email server |
| | [Email templates](/admin-panel/settings/email/#email-templates) | The wording of every team and creator email |
| **Trust & access** | [Legal pages](/admin-panel/settings/legal-and-security/) | Terms, privacy, Creator Terms, refunds and more, versioned |
| | [Sign-in & security](/admin-panel/settings/legal-and-security/#sign-in--security) | Require two-factor for the whole team |

## Integration keys

Keys for outside services sit on **cards** at the end of their section. Every card has a **Where do I find these?** guide with the exact steps and links, the webhook or redirect address to copy, **Save** and **Test connection**.

| Card | Section |
|---|---|
| Google Play, App Store | Payments |
| AdMob Reporting API | Creator revenue |
| Amazon S3 bucket, Cloudflare R2 bucket, Cloudflare Stream | Storage & video |
| Firebase, System alerts | Notifications |
| SMTP server | Email delivery (SMTP) |

:::info[Secrets are write-only]
Keys are **stored encrypted** and **never shown again** after saving: the field reads "Saved. Leave empty to keep it." Type a new value only to replace it. A value that came from the server's `.env` file says so; saving one here replaces it. Save before **Test connection**: it checks the keys as saved.
:::
