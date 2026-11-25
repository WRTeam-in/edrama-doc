---
sidebar_position: 8
title: "Unlocking episodes"
sidebar_label: "Unlocking episodes"
description: "The Keep watching sheet: unlocking with coins, one ad, the Series Pass or VIP, auto-unlock, and the daily spend limit."
---

When a viewer reaches a locked episode, the **Keep watching** sheet opens with every way to unlock it, the price in coins and in money, and their balance, **before anything is charged**.

<Screen
  id="app-unlock-sheet"
  type="phone"
  wire="app-sheet"
  title="Keep watching"
  caption="The Keep watching sheet for episode 2: Unlock with coins (selected), Watch 1 ad, Series Pass and VIP, the balance with paid and bonus coins, Auto-unlock, and the Unlock button."
  markers={[
    {x: 21.5, y: 33.5, title: 'Keep watching', text: '“E2 · Five Years Gone · The Heiress Returns”.'},
    {x: 40, y: 42.6, title: 'Unlock with coins', text: 'The price in coins and money. Bonus coins are spent first.'},
    {x: 40, y: 51.5, title: 'Watch 1 ad', text: '“Unlocks when it ends · up to 30 s · 6 of 6 left today.” Free: 1 ad = 1 episode.'},
    {x: 40, y: 60.4, title: 'Series Pass', text: '“All 3 episodes + future drops”, with what it saves.'},
    {x: 40, y: 69.2, title: 'VIP', text: '“Everything unlocked · no ads · cancel any time”, with the price per period.'},
    {x: 30, y: 77.8, title: 'Balance', text: 'Paid and bonus coins, and when bonus coins expire.'},
    {x: 88, y: 77.8, title: 'Top up', text: 'Opens the coin packs without leaving the sheet.'},
    {x: 40, y: 84.5, title: 'Auto-unlock', text: 'Unlocks the next episodes as they start, only up to the daily spend limit.'},
    {x: 50, y: 93.9, title: 'Unlock E2 · 60 coins', text: 'The button changes with the option picked.'},
  ]}
/>

## The four ways to unlock

| Option | How it works |
|---|---|
| **Coins** | Pays the series' price per episode. **Bonus coins are spent first**, earliest expiry first, then paid coins. The viewer is charged exactly the price shown. |
| **Watch 1 ad** | One rewarded ad, **30 seconds at most**, unlocks **one** episode once it's watched to the end and AdMob confirms it. Each region has a daily limit (*Today's ad unlocks are used up. Back tomorrow.*). Only on series that allow ads. |
| **Series Pass** | One price in coins for **every episode, including future drops**, with the saving shown. |
| **VIP** | Opens the VIP page: every series unlocked, no ads. |

Free and already-unlocked episodes simply play. Unlocks belong to the **account**, so they come back on any phone the viewer signs in to.

### After unlocking

*E8 unlocked · 60 coins · 20 bonus, 40 paid*, the coins fly to the balance, and the episode plays. A Series Pass shows *Every episode of Heiress Returns is yours.*

### Not enough coins

*You need 15 more coins for E8. Top up and it unlocks straight after.* **Top up to unlock** opens the coin store on *You need 15 more coins for this episode*; once the coins land, the unlock finishes by itself.

### If the ad didn't finish

| Message | Meaning |
|---|---|
| *The ad didn't load, so nothing was used.* | Try again or pick another way. |
| *Watch the ad to the end to unlock.* | It was closed early. |
| *Checking your ad…* | Waiting for AdMob's confirmation. |
| *We couldn't confirm the ad yet. The episode unlocks by itself once AdMob confirms it.* | AdMob is slow; nothing more to do. |
| *The ad didn't finish, so this episode is still locked.* | AdMob didn't confirm it. |

## Auto-unlock

With **Auto-unlock next episodes** on, the next locked episode is unlocked with coins **as it starts**: *Auto-unlocked E9 · 60 coins*. It's **off by default**, and it **never goes past the daily spend limit**. Change it in the sheet or in <Path panel="app">Me › Settings › Auto-unlock</Path>.

## The daily spend limit (spend guard)

Viewers choose how many coins they may spend a day (100, 300, 600 or 1,000 by default; 300 to start). When an unlock would go past it:

> **You've hit today's limit.** You set 300 coins a day. You've used 280. This unlock costs 60 coins. Spend guard paused it, so nothing is charged without you deciding.

They can **Raise today to 360 and unlock**, or **Watch 1 ad instead**. Set the limit in <Path panel="app">Rewards › Wallet › Spend guard</Path>. The Series Pass isn't held to the daily limit.
