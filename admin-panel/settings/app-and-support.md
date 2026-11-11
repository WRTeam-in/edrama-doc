---
sidebar_position: 3
title: App and support
description: App versions and forced updates, store links, the support email, feature switches and maintenance mode.
---

# App and support

**Where:** <AdminPath path="System › Settings › App & support" />

Everything here reaches the app at its next start, without a new release. Each card has its own **Save**.

## App versions

For **Android** and **iOS**:

| Field | What it does |
|---|---|
| **Latest** | Your newest version in the store. Older builds are offered the update, which they can skip, when a **Store link** is set. |
| **Minimum supported** | Builds below it must update before they can be used: the app shows its update screen. Can't be newer than **Latest**. |
| **Store link** | Your app's Google Play or App Store page (`https://` only). The app's update screen and the website's store buttons use it. |

Versions are numbers and dots only, such as `1.2.0`: the app's version name without the build number. **On latest** shows the share of devices seen in the last 30 days that run the latest version.

## Support email

Where viewers and creators write when they need help. It shows in the app's help screen, in creator emails and to suspended creators. Leave it blank to use `EDRAMA_SUPPORT_EMAIL` from `.env`, which is `support@example.com` until you change it, so set one of the two.

## Comment blocklist

A comment or review containing one of these **Words and phrases** waits for a person on <AdminPath path="Community › Comments & reviews" /> instead of going live. Whole words, any case. Press Enter after each (up to 500). Comments with a link, a long run of digits (such as a phone number) or one character repeated many times are held the same way.

## Features

Every feature is on to start. Switch one off and the app hides it at its next start.

| Switch | What it controls |
|---|---|
| **VIP** | Subscriptions that unlock every drama |
| **Series Pass** | One price for a whole series |
| **Auto-unlock** | Unlocks the next episode with coins as it starts |
| **Rewards (daily spin and ads for coins)** | The daily spin, streak titles and Rewards ads |
| **Phone sign-in** | Phone number sign-in, in the app and on the Creator Portal |
| **Episode comments** | Comments under episodes |
| **Series reviews** | Ratings and reviews on series pages |

## Maintenance mode

Turn on **Show the maintenance screen** and write a **Message** (up to 280 characters, such as when you'll be back). While it's on, the app shows the maintenance screen with your message instead of the catalogue. The language tabs below take the message in each of your other app languages; an empty tab shows the main message.
