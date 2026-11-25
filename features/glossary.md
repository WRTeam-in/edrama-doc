---
sidebar_position: 7
title: "Glossary"
sidebar_label: "Glossary"
description: "Plain-language meanings of the terms used across eDrama and this documentation."
---

The words you'll meet in eDrama and in these pages, in alphabetical order.

| Term | Meaning |
|---|---|
| **Ad unlock** | Watching one rewarded ad (30 seconds at most) to unlock one episode. |
| **AdMob** | Google's ad network. eDrama uses its **rewarded ads**, which the viewer chooses to watch in return for something. |
| **Age rating** | All, 13+, 16+ or 18+, set on each title. |
| **API** | The set of addresses the app uses to ask your server for data and actions, under `/api/v1`. |
| **Append-only** | A record that is only ever added to, never edited or deleted. The coin ledger and the audit log are append-only. |
| **Audit log** | The history of every important change in the Admin Panel: who did it, when, and why. |
| **Auto-unlock** | An option a viewer can turn on: the next locked episode is unlocked with coins as it starts. Off by default and always held to the daily spend limit. |
| **Bonus coins** | Free coins from the welcome bonus, the daily spin, ads or a coin pack's bonus. They expire and are always spent first. |
| **Category** (also **trope**) | A genre label such as "Revenge" or "Rebirth". Titles have categories; viewers pick favourites during onboarding. In the code they are called *tropes*. |
| **Coin** | The app's currency. Bought in coin packs, spent to unlock episodes. A coin's money value is set per region. |
| **Coin value** | What one coin is worth in a region's currency, for example 1 coin = 0.0099 USD. |
| **Creator** | An invited person or studio who publishes their own series through the Creator Portal and earns a share of the revenue. |
| **Creator share** | The percent of a series' revenue that goes to its creator. Default 50%. |
| **Cron** | A server feature that runs a command on a timetable. eDrama needs one cron line that runs every minute. |
| **Drop** | The release of a new episode. "Drop alerts" tell followers about it. |
| **Exchange rate** | How much one unit of a currency is worth in your reporting currency, from a date. |
| **ffmpeg** | A free program that converts video. eDrama uses it to turn uploads into streams. |
| **Firebase** | Google's app platform. eDrama uses it for viewer sign-in and push notifications. |
| **Free episodes** | The first episodes of a series anyone can watch without paying. The first locked one is the **paywall**. |
| **Guest** | A viewer using the app without signing in. Guests can watch and earn bonus coins but can't buy. |
| **HLS** | The streaming format eDrama uses: the video is cut into small pieces at several qualities, and the player picks the best one for the connection. |
| **Home builder** | The Admin Panel screen where you design the app's Home tab from sections. |
| **Idempotent** | Safe to repeat. If a viewer taps "Unlock" twice or the connection retries, they are charged once. |
| **Ledger** | The list of every coin in and out of a viewer's wallet, with the balance after each line. |
| **Paid coins** | Coins bought with money. They never expire. |
| **Price lock** | Once a viewer unlocks their first episode of a series with coins, their per-episode price for that series can never rise. A lower price still applies. |
| **Push notification** | A message that appears on the phone's lock screen, sent through Firebase. |
| **Queue / queue worker** | A waiting list of background jobs and the process that works through it. |
| **Region** | A group of countries that share a currency, prices, coin packs, VIP plans, ad limits and rewards. |
| **Reporting currency** | The one currency the Dashboard and totals are shown in. Default USD. |
| **Rewarded ad** | An ad the viewer chooses to watch, in return for an unlock or bonus coins. |
| **Series Pass** | One price in coins that unlocks every episode of a series, including future ones. |
| **SMTP** | The standard way servers send email. You give eDrama your email provider's SMTP details. |
| **Spend guard** (daily spend limit) | The most coins a viewer allows themselves to spend in a day. Unlocks past it pause and ask first. |
| **SSV** (server-side verification) | AdMob telling your server directly that an ad was watched to the end, so an ad can't be faked. |
| **Streak** | The number of days in a row a viewer has used the daily spin. |
| **Studio** | Another name for the Admin Panel. |
| **Title** | A series in the catalogue. Every title has an **owner type**: eDrama Original (made by you), Licensed (from a studio) or Creator. |
| **Two-factor** (2FA) | Signing in with a code from an authenticator app as well as the password. |
| **VIP** | A weekly, monthly or yearly subscription that unlocks every episode with no ads. |
| **Welcome bonus** | Bonus coins a new account gets once per device. Default 100 coins for 7 days. |
