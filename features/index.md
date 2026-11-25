---
sidebar_position: 1
title: Features
description: What eDrama does, for viewers, creators and your team.
---

# Features

eDrama is a complete short-drama platform: vertical mini-series with short episodes, where viewers watch the first episodes free and unlock the rest with coins, one short ad, a Series Pass or VIP. It comes with a mobile app for viewers, a back office where your team runs the catalogue and the money, and a portal where invited creators publish their own series. Fair, visible pricing is the product's promise, and it is built into the code so nobody can switch it off by accident.

<DocBanner />

## The parts

| Part | Who uses it | Guide |
|---|---|---|
| **Mobile app** (Android and iOS) | Viewers | [The viewer app](./viewer-app/index.md) |
| **Admin Panel** | Your team | [Admin Panel menus](./admin-panel-menus.md) |
| **Creator Portal** | Approved creators | [Creator Portal](/creator-portal/) |
| **Website** | Visitors from search and social | [Website](/website/) |
| **Backend and API** | Everything above | [Admin Panel setup](/admin-panel/) |

The Admin Panel, the Creator Portal and the API all run on **one server** (a computer on the internet that you rent from a hosting company). The mobile app is a separate project that you build on your own computer and publish to Google Play and the App Store. How the pieces fit together: [How eDrama works](./how-it-works.md).

## Where to start

| You are… | Start with |
|---|---|
| The **owner** of the platform, setting it up for the first time | [Launch checklist](/admin-panel/go-live-checklist/) |
| The person **installing** it on a server | [Server installation](/admin-panel/requirements/) |
| The person **building the app** for the stores | [Mobile app setup](/mobile-app/) |
| A **team member** running content, support or finance | [Admin Panel](/admin-panel/using/) |
| A **creator** publishing series | [Creator Portal](/creator-portal/) |
| Anyone who wants to know **what viewers see** | [Viewer App](/features/viewer-app/) |

No technical background is needed for the Admin Panel, Creator Portal and Viewer App guides. The installation and app setup guides involve a server and a few commands; each command is given in full, with a copy button.

## Money, explained

- [Coins and unlocks](./coins-and-unlocks.md): paid and bonus coins, the ways to unlock, price lock and the spend cap.
- [How earnings work](./how-earnings-work.md): how a paid unlock turns into store fees, the creator's share and yours, and how monthly statements and payouts work.
- [Earnings calculator](./earnings-calculator.md): try your own prices and volumes.
- [How eDrama makes money](./making-money.md), [VIP subscriptions](./vip-subscriptions.md), [Rewards, bonuses and ads](./rewards-economy.md), [Regions and currencies](./regions-and-currencies.md) and [Refunds and chargebacks](./refunds-and-chargebacks.md).

## Built-in fair-play rules

The backend enforces these, and the Admin Panel can't switch them off:

- Every price is shown in coins **and** money before the tap.
- **Price lock**: a viewer's per-episode price never rises mid-series.
- A daily **spend cap**, and auto-unlock off by default.
- **One ad of 30 seconds or less unlocks one episode.**
- VIP has **no free trial trap**, a reminder 24 hours before every charge, cancel in two taps, and no ads.
- An **append-only coin history**: nothing is deleted, nothing is charged twice, and corrections are added as new rows.

Why each rule exists: [Fair-play rules](./fair-play-rules.md).

## How to read these pages

<Steps>

1. **Follow the menu paths.** A chip like <Path>Settings › Branding</Path> tells you exactly where to click: open the panel shown in colour, then each part in turn. Creator Portal paths are gold, such as <Path panel="creator">My series › New series</Path>, and the app's are blue, such as <Path panel="app">Me › Settings</Path>.
2. **Use the numbered screens.** Many pages show the screen they describe with numbered markers. Each number is explained right below it; point at a number (or tap it) to highlight its explanation.
3. **Watch for the coloured notes.** A green **Tip** saves you time, a blue **Note** explains why something works the way it does, an amber **Warning** protects you from a mistake, and a red **Danger** is about something that can't be undone.

</Steps>

:::info[Where a behaviour couldn't be confirmed]
These pages were written from eDrama's source code. Where the code leaves a question open, the page says so in a note titled **To confirm** instead of guessing.
:::

:::info Where a behaviour couldn't be confirmed
These pages were written from eDrama's source code. Where the code leaves a question open, the page says so in a note titled **To confirm** instead of guessing.
:::

## Built with

<Defaults
  title="Technology"
  rows={[
    ['Server software', 'Laravel 13 and Filament 5 on PHP 8.5, MySQL 8'],
    ['App framework', 'Flutter, for Android 7+ and iOS 15+'],
    ['Website', 'Next.js 16 and React 19, on Node.js 20.9+'],
  ]}
/>

New to the terms? The [Glossary](./glossary.md) explains every one in plain language.
