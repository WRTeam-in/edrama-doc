---
sidebar_position: 1.5
title: "How eDrama works"
sidebar_label: "How eDrama works"
description: "The pieces of eDrama, the outside services it uses, and how a series travels from upload to a viewer's phone."
---

Before you install anything, it helps to see the whole picture: what runs where, which outside services eDrama connects to, and how an episode and a coin move through the system.

## The pieces

| Piece | What it is | Where it lives |
|---|---|---|
| **Viewer app** | The Android and iOS app your audience uses. | Built from the Flutter project on your computer, then published to Google Play and the App Store. |
| **Admin Panel** (also called the **Studio**) | Your team's back office. | `https://your-domain.com/admin` |
| **Creator Portal** | Where invited creators publish their own series. | `https://your-domain.com/creator` |
| **API** | The "language" the app uses to talk to your server: every list of series, every unlock and every purchase goes through it. | `https://your-domain.com/api/v1` |
| **Public pages** | Share pages for a series (`/s/…`) and a creator (`/c/…`), legal pages (`/legal/…`), the creator application form (`/creator/apply`). | On the same server. |
| **Public website** *(optional)* | A separate marketing website whose sections, look and pages you edit from the Admin Panel's **Website** screen. | Its own address, connected to your server. |

The Admin Panel, the Creator Portal, the API and the public pages are one Laravel application (Laravel is the PHP framework the server software is written in). You install it once, on one server.

:::note[To confirm]
The public website is a separate project that reads its content from your server. Its own source code was not part of the material reviewed for these pages, so this documentation covers only how you manage it from the Admin Panel. See [Website](/website/edit-content/).
:::

## Outside services

eDrama works on its own server, but it relies on a few well-known services for things a single server shouldn't do alone. Each one is set up once, mostly by pasting keys into <Path>Settings</Path>.

| Service | What eDrama uses it for | Needed? |
|---|---|---|
| **Firebase** (Google) | Viewer sign-in (Google, Apple, phone, email and guest accounts), push notifications, and app attestation. | Yes |
| **Google Play** and **App Store** | Selling coin packs and VIP subscriptions, and telling your server about refunds and renewals. | Yes, for the stores you publish in |
| **AdMob** (Google) | Rewarded ads that unlock an episode or pay bonus coins. | Only if you use ads |
| **ffmpeg** | A free program on your server that turns each uploaded video into streams at several qualities. | Yes, unless you use Cloudflare Stream |
| **Amazon S3 / Cloudflare R2** | Storing files and videos outside your server's own disk. | Optional |
| **Cloudflare Stream** | Processing and streaming videos instead of your server. | Optional |
| **SMTP email** | Sending invites, password resets, creator emails and alerts. | Strongly recommended |
| **Google Gemini** | AI Studio: generating characters, storyboards and video takes. | Optional |
| **YouTube** | Adding a YouTube video as a free episode. | Optional |

Full instructions for each are in [Integrations](/admin-panel/integrations/).

## From upload to a viewer's phone

<Flow
  steps={[
    {label: 'Upload', note: 'From the Admin Panel or Creator Portal'},
    {label: 'Process', note: 'ffmpeg or Cloudflare makes 1080p–360p'},
    {label: 'Review', note: 'Only for creators’ work'},
    {label: 'Schedule', note: 'A publish time per episode'},
    {label: 'Released', tone: 'live', note: 'Followers get a drop alert'},
  ]}
/>

<Steps>

1. **Upload.** Your team uploads episode files on <Path>Content › Upload & pipeline</Path>; a creator uploads on their series in the Creator Portal. Uploads go straight from the browser and carry on after a dropped connection.
2. **Process.** The server (or Cloudflare Stream) turns each file into adaptive streams at 1080p, 720p, 480p and 360p, never above the original's quality, plus a poster image.
3. **Review.** A creator's series and episodes wait in the **Review queue** until a person approves them. Your own team's titles are approved in the title editor.
4. **Schedule.** Each episode gets a publish time. A background task checks every minute and releases episodes whose time has come.
5. **Release.** The episode appears in the app. Viewers who follow the series get one "new episodes" alert per series per day.

</Steps>

## How a coin moves

<Flow
  steps={[
    {label: 'Buy a coin pack', tone: 'coin', note: 'In Google Play or the App Store'},
    {label: 'Server checks receipt', note: 'Coins land only after it passes'},
    {label: 'Unlock an episode', note: 'At the price shown first'},
    {label: 'Ledger row', note: 'Every coin in and out is recorded'},
    {label: 'Creator share', tone: 'vip', note: 'Saved with each unlock'},
  ]}
/>

A viewer buys coins in the store. Your server checks the receipt with Google or Apple before a single coin lands. When the viewer unlocks an episode, the price they were shown is the price they pay, and the coins leave their wallet as a new line in an **append-only ledger** (a history nobody can edit or delete). If the series belongs to a creator, the creator's share is saved with that unlock, so a later change to their share never rewrites the past. Read more in [Monetization](/features/making-money/).

## Background work

Some jobs can't happen while someone waits for a page: processing video, sending pushes, releasing episodes on time, counting the Dashboard's numbers. eDrama does them in the background with two things your server must keep running:

- **The scheduler**, started by one **cron** line (a server feature that runs a command on a timetable, here every minute).
- **Queue workers**, which take jobs from a waiting list one by one. On shared hosting the scheduler can run them for you.

If either stops, videos stop processing and episodes stop releasing. [Cron & queues](/admin-panel/background-jobs/) shows how to set them up and how to check them on <Path>System › System</Path>.
