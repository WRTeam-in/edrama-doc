---
sidebar_position: 12
title: "Me, settings and help"
sidebar_label: "Settings & help"
description: "The Me tab, every setting viewers can change, Help & refunds, legal pages and becoming a creator."
---

## The Me tab

The **Me** tab shows the viewer's profile (or **Sign in** for guests), **VIP is on** for members, and three stats: **Coins**, **Day streak** and **Titles**. Below:

| Row | Opens |
|---|---|
| **My List** | Everything they saved. |
| **Wallet** | Their balance and every coin in and out. |
| **VIP** | The VIP page. |
| **Spend guard** | *300 coins a day · 180 used today.* |
| **Restore purchases** | Gets back anything already bought. |
| **Prices** | *From the country you're in*: their region and currency. |
| **Invite friends** | Shares the app: *I'm watching short dramas on eDrama. Try it: …* |
| **Become a creator** | Your creator application form (while applications are open). |
| **Help & refunds** | The support form (below). |
| **Settings** | Below. |

The app's version is at the bottom.

## Settings

<Screen
  id="app-settings"
  type="phone"
  wire="app-settings"
  title="Settings"
  caption="Settings for a guest: Playback (Autoplay next episode, Auto-unlock, Data saver, Quality, Subtitles), App (App language, Appearance, Haptics, Notifications, Legal, Clear cache) and Coins and safety. A signed-in viewer also sees their profile."
  markers={[
    {x: 12, y: 10.8, title: 'Playback', text: 'Autoplay next episode, Auto-unlock, Data saver, Quality and Subtitles.'},
    {x: 30, y: 21.4, title: 'Auto-unlock', text: 'Off by default, never past the daily limit.'},
    {x: 84, y: 39.5, title: 'Subtitles', text: '“Same as app language”, or another language, or off.'},
    {x: 8, y: 44.4, title: 'App', text: 'App language, Appearance, Haptics, Notifications, Legal and Clear cache.'},
    {x: 84, y: 67.2, title: 'Notifications', text: 'Which alerts they get, such as new drops and replies, and quiet hours. “4 of 4 on.”'},
    {x: 30, y: 79.4, title: 'Clear cache', text: 'Frees up space. Coins and unlocks stay safe.'},
    {x: 22, y: 84.6, title: 'Coins and safety', text: 'Prices (from the country they are in), Spend guard and Restore purchases.'},
  ]}
/>

| Group | Setting | Default |
|---|---|---|
| **Playback** | **Autoplay next episode** | On |
| | **Auto-unlock**: *off by default, never past your daily limit* | Off |
| | **Data saver**: start every episode at 360p, then sharpen | Off |
| | **Subtitles**: same as app language, a language, or Off | Same as app language |
| **App** | **App language** | The phone's, if offered |
| | **Appearance**: Dark, Light, or Same as phone | Dark |
| | **Haptics** (vibration feedback) | On |
| | **Notifications** ([details](/features/viewer-app/library-and-notifications/#what-viewers-can-switch)) and **Quiet hours** | |
| **Coins and safety** | **Prices**, **Spend guard**, **Restore purchases**, **Clear cache** (*free up space; your coins and unlocks stay safe*) | |
| **Legal** | **Terms of use**, **Privacy policy**, **Privacy choices** (*how ads use your data*), **Refund policy**, **Community guidelines** | |
| **Account** | **Edit profile**, **Sign out**, **Delete account** ([Accounts](/features/viewer-app/accounts/)) | |

Legal pages open in the app, in the viewer's language when you've translated them ([Legal pages](/admin-panel/settings/legal-and-security/)).

## Help & refunds

<Screen
  id="app-help"
  type="phone"
  wire="app-form"
  title="Help & refunds"
  caption="Help & refunds with A refund picked: what it’s about, what happened, the email for the reply, Refund policy and Email us instead, and Send request. Viewers with purchases also pick which purchase."
  markers={[
    {x: 50, y: 11.9, title: 'Help & refunds', text: '“A person on our team replies by email, usually within 24 hours.”'},
    {x: 13.8, y: 22.2, title: 'What’s this about?', text: 'A refund, Coins didn’t arrive, Video or playback, My account, Something else.'},
    {x: 50, y: 38, title: 'What happened?', text: 'Up to 2,000 characters. The more detail, the faster the fix.'},
    {x: 50, y: 59.3, title: 'Email for our reply', text: 'Where the team’s answer goes.'},
    {x: 31.1, y: 67.7, title: 'Refund policy', text: 'Opens the refund policy page.'},
    {x: 66.6, y: 67.7, title: 'Email us instead', text: 'Opens the email app to the support address.'},
    {x: 50, y: 94.8, title: 'Send request', text: 'Becomes a ticket in the Admin Panel’s Support tickets, with a reference.'},
  ]}
/>

The request arrives in [Support tickets](/admin-panel/using/audience/support-tickets/). Viewers can also email your support address directly (**Email us instead**), set in <Path>Settings › App & support</Path>.
