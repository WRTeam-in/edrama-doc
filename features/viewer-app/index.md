---
sidebar_position: 2
title: The viewer app
description: The screens and features of the eDrama app for Android and iOS.
---

# The viewer app

The viewer app is what your audience downloads from Google Play and the App Store. It's built for **vertical episodes of 60 to 90 seconds**: open a series, swipe up for the next episode, and unlock more when the free ones run out. It's a Flutter app for **Android 7+** and **iOS 15+**, on phones and tablets, in a dark theme by default with a light theme too. It has four tabs, below.

<Screen
  id="app-home"
  type="phone"
  wire="app-feed"
  title="Home"
  caption="The Home tab: the logo, coin balance, search and notifications on top, the featured series slider with Play E1, My List and Details, the Browse by mood row, and the tab bar."
  markers={[
    {x: 19.5, y: 6.1, title: 'Your logo', text: 'From the app’s brand files.'},
    {x: 67.5, y: 6.1, title: 'Coins', text: 'The viewer’s balance (here the welcome bonus). Tap for the wallet.'},
    {x: 81.5, y: 6.1, title: 'Search', text: 'Titles, categories and creators.'},
    {x: 93.2, y: 6.1, title: 'Notifications', text: 'New drops and replies, with an unread dot.'},
    {x: 50, y: 24, title: 'Featured series', text: 'The hero slider from the Home builder. Swipe to browse; the dots show where you are.'},
    {x: 30, y: 35.3, title: 'Schedule, kicker, categories', text: 'The series’ schedule line, its kicker and its categories, set on the title.'},
    {x: 34.4, y: 54.4, title: 'Play E1 / Continue', text: 'Starts or resumes the series.'},
    {x: 74, y: 54.4, title: 'My List · Details', text: 'Save it to the Library, or open the series page.'},
    {x: 20, y: 65.6, title: 'Rows of series', text: 'Browse by mood, Trending this week, Top 10 and more, in the order set in the Home builder.'},
    {x: 50, y: 93.8, title: 'Tab bar', text: 'Home, Library, Rewards and Me. Rewards becomes Wallet when your team switches Rewards off.'},
  ]}
/>

## The four tabs

| Tab | What's there |
|---|---|
| **Home** | The sections your team built: featured series, Continue watching, rows, banners, categories. See [Home & discovery](./home-and-discovery.md). |
| **Library** | **Watching** (series in progress), **My List** (saved for later) and **Unlocked** (episodes and Series Passes you own). See [Library & notifications](./library-and-notifications.md). |
| **Rewards** | The daily spin, the streak, titles, ads for coins, the coin store and the wallet. When Rewards is switched off, this tab becomes **Wallet**. See [Rewards](./rewards.md). |
| **Me** | The profile, VIP, settings, help and account. See [Settings & help](./settings-and-help.md). |

Swipe between tabs or tap them. Tapping the tab you're on scrolls it back to the top. Pressing back on any tab other than Home goes Home.

## Getting started

- **Guest mode**: viewers start watching at once, with no sign-up, and get a **welcome bonus** of coins (100 coins for 7 days by default).
- **Sign in only when it matters**: before a purchase, so coins and unlocks follow them to a new phone. Apple, Google, email and phone sign-in. Guest history and the bonus move into the account.
- **Onboarding**: pick favourite genres, then language and data saver. Viewers can skip it.

## Watching

- **Home**: sections you build in the Admin Panel's **Home builder**: a hero slider, Continue Watching, rows of series, Top 10 and more.
- **Series page**: the artwork and synopsis, the **cost to finish**, every episode with its state (free, unlocked, locked), More Like This, and reviews.
- **Vertical player**: swipe between episodes full screen. Episodes list, Up Next, playback speed, quality, subtitles, likes, comments, and **Report a problem**. Quality adapts to the viewer's connection, and **data saver** keeps it lower.
- **Screen protection**: screenshots and recordings of the player are blocked on Android, and the video is hidden while the screen is recorded on iOS.

## Unlocking and paying

- **Unlock sheet**: on a locked episode, every option with its price in coins and money: coins, one rewarded ad, a **Series Pass** for the whole series, or **VIP**. See [Coins and unlocks](../coins-and-unlocks.md).
- **Coin store**: coin packs with bonus coins, a first top-up offer, and **restore purchases**.
- **VIP**: weekly, monthly or yearly plans, with a renewal reminder and cancel in two taps.
- **Wallet**: the balance, a readable coin history with every row explained, pending purchases, and the **spend cap**.
- **Prices line**: the coin store and Settings show where prices come from, such as "Prices in INR · India".

## Rewards

- A free **daily spin** that always pays bonus coins, with the odds shown. VIP members win more (the region's VIP multiplier).
- A **streak** for spinning on days in a row, with **titles** that pay bonus coins the first time they're reached, and **streak shields** that cover a missed day. Shields are earned, never sold.
- **Ads for coins**: watch a rewarded ad for bonus coins, up to a daily limit.
- The coin balance (paid and bonus) and the coin history.

Everything is set per region in Monetization › Rewards.

## Library and discovery

- **Library**: Watching, My List and Unlocked.
- **Search** and **browse by genre**.
- **Creator profiles** with Follow and their series.
- A series limited to some regions is only found by viewers in those regions.

## Staying in touch

- **Notifications inbox**, and push notifications for new episodes, account and purchases, and offers, with **quiet hours**.
- **Help**: a support form to your team, with a purchase picker for payment questions.

## Settings

Under **Me › Settings**: autoplay, auto-unlock, data saver and subtitles; language; theme (dark, light or same as phone); haptics; notification switches and quiet hours; restore purchases and clear cache; sign in, edit profile, sign out and **delete account**; your legal pages and ad privacy choices. **Me** also links to **Become a creator**.

## Always working

- **Offline**: what's already loaded keeps working, and a banner says *You're offline. What's loaded still plays.* Every list the app loads is saved on the phone and shown when the server can't be reached.
- **Slow connections**: **data saver** (in onboarding and Settings) starts every episode at 360p, then sharpens, and loads the next episode later.
- **Maintenance** and **update required** screens, switched from <AdminPath path="System › Settings › App & support" />.
- **Languages**: English built in, with more downloaded from the Admin Panel, including right-to-left languages.

## What the app learns from your server

At each start, the app reads its configuration from your server: the app name and theme colour, which features are on, the viewer's region with its prices, and the languages. So most changes you make in the Admin Panel reach viewers **without a new app release**. If your server is in [maintenance mode](/admin-panel/settings/app-and-support/#maintenance-mode), viewers see a "Back soon" screen instead of the catalogue.

## Every screen, step by step

<Cards
  columns={3}
  items={[
    {icon: 'viewer', title: 'Watch', text: 'The vertical player, speed, quality, subtitles.', to: '/features/viewer-app/player/', tone: 'info'},
    {icon: 'coin', title: 'Unlock', text: 'Coins, one ad, Series Pass or VIP.', to: '/features/viewer-app/unlocking-episodes/', tone: 'coin'},
    {icon: 'gift', title: 'Earn', text: 'The daily spin, streaks and ads for coins.', to: '/features/viewer-app/rewards/', tone: 'coin'},
    {icon: 'crown', title: 'Subscribe', text: 'VIP: everything unlocked, no ads.', to: '/features/viewer-app/vip/', tone: 'vip'},
    {icon: 'users', title: 'Talk', text: 'Comments, ratings and reviews.', to: '/features/viewer-app/comments-and-reviews/', tone: 'like'},
    {icon: 'help', title: 'Get help', text: 'Help & refunds, legal pages, settings.', to: '/features/viewer-app/settings-and-help/', tone: 'info'},
  ]}
/>

Each card opens a detailed page with annotated screens. The full list is in the sidebar under **The viewer app**.
