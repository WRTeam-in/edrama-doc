---
sidebar_position: 6
title: Admin Panel menus
description: What every menu in the eDrama Admin Panel does.
---

# Admin Panel menus

Every page of the Admin Panel, in the order of the sidebar. Team members only see the pages their [role](/admin-panel/team-and-roles/) allows.

## Overview

### Dashboard
How the platform is doing today: viewers, unlocks, revenue and more, in your reporting currency. Figures refresh every 15 minutes.

## Content

### Titles
Every drama, its episodes, its prices per region and who owns it. A title is one of three kinds:

- **Your own** series (an Original),
- a **Licensed** series, with the licensor's share of net revenue from your contract,
- a **Creator** series, made by an invited creator who earns their share of every paid unlock.

Every title starts as a **draft**: add episodes, artwork and prices, send it to review, then publish. **Prices** set the coin price per episode and the Series Pass per region; a region without its own price uses the default region's. **Price lock** keeps the price each viewer started with. Episodes have subtitles, and a series can be marked **Complete** once every episode is out.

**Where it's shown** (Monetization tab) puts a series in **Every region** (the default) or **Only these regions**. See [Series in some regions only](/admin-panel/monetization/#series-in-some-regions-only).

### Categories
The labels on your titles, and the picks in the app's onboarding. Drag to set the order the app shows them in.

### Upload & pipeline
Upload episode files (MP4, MOV or MKV), many at once. Each goes **Uploading → Processing → Ready**, turned into vertical streaming video in the background. See [Storage and video](/admin-panel/settings/storage-and-video/).

### Release schedule
Episodes go out at each one's publish time. Drag an episode to move it, and pick the time zone to read the times in.

### Home builder
Build the app's Home from sections: add, set up, drag to reorder, and choose who sees each one. A phone preview updates as you edit.

### Website
Your public website's sections, header, footer, look and search settings. Edit, preview, then publish. See [Website › Edit the website](/website/edit-content/).

## Community

### Creators
Invited creators, their revenue share, and new applications. Each creator's page also shows **Earnings & payouts**: what they earned in closed months, what you paid and what is still owed, with **Record payout**. See [Becoming a creator](/creator-portal/becoming-a-creator/) and [Statements and payouts](./how-earnings-work.md#statements-and-payouts).

### Review queue
Creator titles, new episodes and viewer reports waiting for a decision. Every decision is logged. See [The review queue](/creator-portal/review-queue/).

### Comments & reviews
What viewers say about your titles. Check reports, approve what was held by the blocklist, and remove what breaks the rules.

## Audience

### Users
Find a viewer by name, email or ID, and open their profile, wallet and coin history, unlocks, purchases and devices. Wallet changes always need a reason and are logged. From a viewer you can adjust their balance, grant an episode, **change their region** (with a reason; their coins and purchases stay), or ban the account.

### Balance adjustments
Coins added or removed by the team. Over the **Approval limit** (Settings › Payments), a second member approves.

### Support tickets
What viewers sent from the app's Help screen. Reply by email, then record where each one stands.

### Push
Send a notification to every viewer or to a title's followers, now or at a set time. Pushes respect each viewer's quiet hours and daily cap.

## Money

### Monetization
Coins, VIP, ads and rewards, set per region, and the locked fair-play rules. See [Monetization](/admin-panel/monetization/).

### Transactions
Every purchase across Google Play and the App Store. Receipts are verified on the server before coins land. Refunds from the store arrive by themselves; refunds from the panel are limited by each role's refund limit. Export to CSV, download the **Monthly creator report**, and **Close month for creators**. See [How earnings work](./how-earnings-work.md).

## System

### Settings
Everything you configure without touching code. See [Settings](/admin-panel/settings/branding/).

### Team & roles
Members, invites, roles and their permissions. See [Team and roles](/admin-panel/team-and-roles/).

### Audit log
Append-only: who did what, to which record, and why. It can be exported.

### System
Background jobs, queues, scheduled tasks and failed jobs, with retry. See [Background jobs](/admin-panel/background-jobs/).

### License & updates
Your purchase code and installing updates. See [License and updates](/admin-panel/license-and-updates/).

### Clear demo data
Shown only to the Owner while demo data is imported. See [First steps](/admin-panel/first-steps/#demo-data).
