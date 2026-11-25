---
sidebar_position: 3
title: Coins and unlocks
description: Paid and bonus coins, the four ways to unlock an episode, how a price is decided, price lock, the spend cap and auto-unlock.
---

# Coins and unlocks

## Free, then locked

Every series starts with **free episodes** to hook the viewer. After them, each episode is locked until the viewer unlocks it. The number of **free episodes** and the **coin price per episode** per region are set in <AdminPath path="Content › Titles" /> › the series › **Monetization** tab. A region without its own price uses the default region's. Creators propose a price within the limits you set (30–90 coins by default), and a reviewer confirms it.

What a particular viewer pays is decided on the server, never on the phone:

<Steps>

1. Take the series' price in the viewer's region (or the default region's).
2. Cap it by the viewer's [price lock](#price-lock) for that series, if they have one.
3. Show it in coins and in the region's money in the **unlock quote**, and charge exactly that.

</Steps>

## Two kinds of coins

| | Paid coins | Bonus coins |
|---|---|---|
| **Where from** | Bought in the coin store | The welcome bonus, the bonus in coin packs, the daily spin, streak titles, Rewards ads, team adjustments |
| **Expire?** | **Never** | Yes, after the days set in Monetization › Rewards (7 by default) |
| **Spent** | After bonus coins | **First**, earliest expiry first |
| **Earn the creator anything?** | Yes | **No** |

The unlock sheet says which coins it uses, such as *Uses 20 bonus first, then 40 paid.* Bonus coins can't be used for tips or creator payouts; a creator's share comes from **paid** coins.

The wallet shows both, and every coin in or out is a row in the viewer's coin history. Rows are never edited or deleted. A correction or refund is a new row.

## Four ways to unlock

On a locked episode, the **unlock sheet** shows every option with its price in coins **and** in the viewer's money:

| Option | What it costs | Notes |
|---|---|---|
| **Coins** | The episode's coin price | Bonus coins are used first |
| **One ad** | Watching one rewarded ad to the end | Up to the region's daily limit, on series with **Ads can unlock** on. Paid only once AdMob confirms the ad. |
| **Series Pass** | One coin price for the whole series, future episodes included | Can be switched off in Settings › App & support |
| **VIP** | A weekly, monthly or yearly subscription | Unlocks every series with **Included in VIP** on, with no ads |

**Ads can unlock** and **Included in VIP** are on for every series by default, in the series' Monetization tab.

### Series Pass

- Set per region in the title editor (optional). Unlocks **every episode, including future drops**.
- The unlock sheet shows the saving against paying per episode.
- It isn't held to the viewer's daily spend cap.
- Switch it off for everyone in <AdminPath path="System › Settings › App & support" /> › **Features**.

:::note To confirm
The project notes record that the Series Pass ignoring the daily spend cap is a deliberate choice (a pass usually costs more than the highest cap) still awaiting the product owner's confirmation.
:::

### Ad unlocks

- Only on series with **Ads can unlock** on (title editor › Paywall).
- One ad, one episode. The viewer always taps to watch; ads never auto-play an unlock.
- **Unlocks only once AdMob's server-side verification confirms** the ad was watched to the end. A failed or unconfirmed ad unlocks nothing, but still counts toward the day's limit.
- Never shown to VIP members.

See [Rewards, bonuses and ads](./rewards-economy.md#rewarded-ads) and [Monetization › Ads](/admin-panel/monetization/#ads).

### Every unlock is recorded

An episode a viewer can watch was unlocked one of six ways. Each is recorded, so reports, the Dashboard's donut and creator earnings all add up.

| Method | How | Earns | Counts toward |
|---|---|---|---|
| **Free** | Within the series' free episodes. | Nothing directly. | Views |
| **Coins** | The series' price, bonus coins first. | The paid coins' value. | Creator coin share |
| **Series Pass** | One coin price for every episode, including future ones. | The paid coins' value. | Creator coin share |
| **Ad** | One rewarded ad, up to 30 seconds, verified by AdMob. | AdMob's payment to you. | Creator ad pool, by verified ad unlocks |
| **VIP** | An active VIP subscription. | The subscription. | Creator VIP pool, by VIP minutes watched |
| **Grant** | Your team, from [Users › Grant episode](/admin-panel/using/audience/users/). | Nothing; no coins move. | No revenue share |

**YouTube episodes are always free.** Episodes added from YouTube can't be sold, gated or rewarded under YouTube's rules, and are never part of VIP minutes or creator earnings.

## Price lock

The first time a viewer unlocks an episode of a series **with coins**, the per-episode price they paid is **locked for them**. If you raise the price later, the rise doesn't reach viewers who already started. A price cut does.

The title editor's **Change prices** dialog tells you how many viewers have a lock on that series. This is one of the [fair-play rules](./fair-play-rules.md): a viewer halfway through a story is never squeezed.

## The cost card

Every series page shows **What it costs** before anything is paid: the free range (*E1–E5*), what it costs to **catch up** or **finish**, the Series Pass, and the rule *60 coins (≈ $0.59) an episode, never more. Or 1 ad ≤ 30 s per episode.* You can preview it per region in the title editor's **Monetization** tab.

## Spend cap and auto-unlock

- **Spend cap**: each viewer has a daily coin cap. They choose it from your choices (100, 300, 600 or 1,000 coins by default; 300 to start), and can raise it one step, for that day only.
- **Auto-unlock**: off by default. When a viewer turns it on, the next episode unlocks with coins as it starts, always within the cap.

## Money shown before the tap

The app turns coins into money with the region's **coin value**. In the Global region one coin is worth 0.0099 USD, so a 60-coin episode shows as about 0.59 USD.

## Charged once, always

Every unlock and purchase is **idempotent**: if a viewer double-taps or the connection retries, they're charged once. Every coin in and out is a new row in the viewer's **append-only ledger**, which they can see in their wallet and your team sees on their user page.

Unlocks belong to the **account**, not the phone. A viewer who signs in on a new phone gets them all back.

## Changing prices

- One title: **Change prices** in the title editor (with a reason).
- Many titles: **Import › Prices** on the Titles list ([Bulk imports](/admin-panel/using/content/bulk-imports/)).
- Creators are emailed when their series' prices change.
