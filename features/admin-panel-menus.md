---
sidebar_position: 6
title: Admin Panel menus
description: What every menu in the eDrama Admin Panel does.
---

# Admin Panel menus

Every page of the Admin Panel, in the order of the sidebar. Team members only see the pages their [role](/admin-panel/team-and-roles/) allows. Each item links to its step-by-step guide, with annotated screens, in [Using the Admin Panel](/admin-panel/using/).

## Overview

### Dashboard
How the platform is doing today: viewers, unlocks, revenue and more, in your reporting currency. Figures refresh every 15 minutes. See [Dashboard](/admin-panel/using/dashboard/).

## Content

### Titles
Every drama, its episodes, its prices per region and who owns it. A title is one of three kinds:

- **Your own** series (an Original),
- a **Licensed** series, with the licensor's share of net revenue from your contract,
- a **Creator** series, made by an invited creator who earns their share of every paid unlock.

Every title starts as a **draft**: add episodes, artwork and prices, send it to review, then publish. **Prices** set the coin price per episode and the Series Pass per region; a region without its own price uses the default region's. **Price lock** keeps the price each viewer started with. Episodes have subtitles, and a series can be marked **Complete** once every episode is out. See [Titles](/admin-panel/using/content/titles/), the [Title editor](/admin-panel/using/content/title-editor/) and [Episodes and subtitles](/admin-panel/using/content/episodes-and-subtitles/).

**Where it's shown** (Monetization tab) puts a series in **Every region** (the default) or **Only these regions**. See [Series in some regions only](/admin-panel/monetization/#series-in-some-regions-only).

### Categories
The labels on your titles, and the picks in the app's onboarding. Drag to set the order the app shows them in. See [Categories](/admin-panel/using/content/categories/).

### Upload & pipeline
Upload episode files (MP4, MOV or MKV), many at once. Each goes **Uploading → Processing → Ready**, turned into vertical streaming video in the background. See [Upload pipeline](/admin-panel/using/content/upload-pipeline/) and [Storage and video](/admin-panel/settings/storage-and-video/). Many titles, prices or episodes at once: [Bulk imports](/admin-panel/using/content/bulk-imports/).

### AI Studio
Make characters, storyboards and video takes for your own series with Google Gemini, then assemble them into an episode. Off until the Owner switches it on in Settings. See [AI Studio (team)](/admin-panel/using/content/ai-studio/) and [AI Studio settings](/admin-panel/settings/ai-studio/).

### Release schedule
Episodes go out at each one's publish time. Drag an episode to move it, and pick the time zone to read the times in. See [Release schedule](/admin-panel/using/content/release-schedule/).

### Home builder
Build the app's Home from sections: add, set up, drag to reorder, and choose who sees each one. A phone preview updates as you edit. See [Home builder](/admin-panel/using/content/home-builder/).

### Website
Your public website's sections, header, footer, look and search settings. Edit, preview, then publish. See [Website › Edit the website](/website/edit-content/).

## Community

### Creators
Invited creators, their revenue share, and new applications. Each creator's page also shows **Earnings & payouts**: what they earned in closed months, what you paid and what is still owed, with **Record payout**. See [Creators](/admin-panel/using/community/creators/), [Becoming a creator](/creator-portal/becoming-a-creator/) and [Statements and payouts](./how-earnings-work.md#statements-and-payouts).

### AI usage
What AI Studio made this month, by creator and for the team, with the estimated cost, whose Gemini key paid, and the calls that failed. See [AI usage](/admin-panel/using/community/ai-usage/).

### Review queue
Creator titles, new episodes and viewer reports waiting for a decision. Every decision is logged. See [The review queue](/creator-portal/review-queue/).

### Comments & reviews
What viewers say about your titles. Check reports, approve what was held by the blocklist, and remove what breaks the rules. See [Comments and reviews](/admin-panel/using/community/comments-and-reviews/).

## Audience

### Users
Find a viewer by name, email or ID, and open their profile, wallet and coin history, unlocks, purchases and devices. Wallet changes always need a reason and are logged. From a viewer you can adjust their balance, grant an episode, **change their region** (with a reason; their coins and purchases stay), or ban the account. See [Users](/admin-panel/using/audience/users/).

### Balance adjustments
Coins added or removed by the team. Over the **Approval limit** (Settings › Payments), a second member approves. See [Balance adjustments](/admin-panel/using/audience/balance-adjustments/).

### Support tickets
What viewers sent from the app's Help screen. Reply by email, then record where each one stands. See [Support tickets](/admin-panel/using/audience/support-tickets/).

### Push
Send a notification to every viewer or to a title's followers, now or at a set time. Pushes respect each viewer's quiet hours and daily cap. See [Push](/admin-panel/using/audience/push/).

## Money

### Monetization
Coins, VIP, ads and rewards, set per region, and the locked fair-play rules. See [Monetization](/admin-panel/monetization/).

### Transactions
Every purchase across Google Play and the App Store. Receipts are verified on the server before coins land. Refunds from the store arrive by themselves; refunds from the panel are limited by each role's refund limit. Export to CSV, download the **Monthly creator report**, and **Close month for creators**. See [Transactions](/admin-panel/using/money/transactions/) and [How earnings work](./how-earnings-work.md).

### Creator revenue
Each month's ads and VIP money shared with creators: imported from AdMob, calculated per region, reviewed and approved before it goes onto the statements. See [Creator revenue](/admin-panel/using/money/creator-revenue/).

## System

### Settings
Everything you configure without touching code. See [Settings overview](/admin-panel/settings/overview/).

### Team & roles
Members, invites, roles and their permissions. See [Team and roles](/admin-panel/team-and-roles/).

### Audit log
Append-only: who did what, to which record, and why. It can be exported. See [Audit log](/admin-panel/using/system/audit-log/).

### System
Background jobs, queues, scheduled tasks and failed jobs, with retry. See [System health](/admin-panel/using/system/system-health/) and [Background jobs](/admin-panel/background-jobs/).

### License & updates
Your purchase code and installing updates. See [License and updates](/admin-panel/license-and-updates/).

### Clear demo data
Shown only to the Owner while demo data is imported. See [First steps](/admin-panel/first-steps/#demo-data).
