---
sidebar_position: 9
title: Monetization
description: Regions and coin values, coin packs, VIP plans, ads, rewards and the fair-play rules.
---

# Monetization

**Where:** <AdminPath path="Money › Monetization" />

Everything viewers pay for is set **per region**. Pick the region with the **Region** switch at the top; the tabs then show that region's settings, with prices in its currency.

<DomainInput />

## Regions

<Shot src="/images/admin/monetization.webp" alt="Monetization, Regions tab: regions with their currency, coin value, countries, ad unlocks per day and VIP price" caption="The Regions tab. The demo data adds a few regions beyond Global and India." />

Every country belongs to one region. A country no active region lists uses the **default region** and its prices. eDrama starts with two:

| Region | Currency | Coin value | Unlock ads per day |
|---|---|---|---|
| **Global** (default) | USD | 1 coin = 0.0099 | 6 |
| **India** | INR | 1 coin = 0.29 | 20 |

| Field | What it is |
|---|---|
| **Name**, **Code** | The code is capital letters, digits and underscores, such as `JP`. It can't change later. |
| **Currency** | ISO 4217, such as `USD`. It can't change later: prices, purchases and reports are stored in it. |
| **Coin value** | What one coin is worth in the currency, with up to six decimals. The app shows every price in coins **and** in money before each unlock, and reports use it to turn coins into money. |
| **Time zone** | The region's time zone. |
| **Countries** | ISO 3166-1 countries. Choosing a country another region lists moves it here. |
| **Active** | Off sends its countries to the default region for new sessions. |

A **New region** starts as a copy of the default region's coin packs, VIP plans, title prices, ad limits and rewards, with money prices converted at the two coin values. Review them, then turn it on. **Make default** changes which region serves every other country. Viewers keep the prices they already locked.

### How a viewer's region is decided

1. **When the account is created** (the first time the app opens), the backend takes the viewer's country from the `CF-IPCountry` header, which Cloudflare adds when your domain runs through Cloudflare's proxy. Without that header, it uses the country the phone sends. The header always wins, so viewers behind Cloudflare can't pick a cheaper region by changing their phone. To read another header, set `EDRAMA_COUNTRY_HEADER` in `.env`.
2. The country goes to the active region that lists it, or else the **default region**. The region is saved on the account.
3. **On every app start after that**, an account that **never paid** (no purchase, no VIP subscription, no paid coins) moves to the region of the country it is in now. A viewer whose first start was abroad, or who moved, gets their own prices without asking anyone.
4. An account that **has paid keeps its region**, so coins bought at one region's coin value never pay for another region's prices. If a paying viewer really moved, your team can move them with **Change region** on their page in <AdminPath path="Audience › Users" />, with a reason.

A move never touches coins, purchases, unlocks, Series Passes, VIP subscriptions or locked prices. Only what comes next follows the new region. Every move is in the audit log: **Region followed the viewer's country** (by the viewer's own app) or **Region changed** (by a team member).

The app shows viewers where their prices come from, such as "Prices in INR · India", in the coin store and in Settings.

:::tip Use Cloudflare's proxy if you sell in several regions
Without it the backend falls back to the phone's country, which viewers can change.
:::

## Coin packs

The packs viewers buy in the app's coin store. eDrama starts with five per region:

| Coins | Bonus | Global (USD) | India (INR) | Flag |
|---|---|---|---|---|
| 300 | +300 | 1.99 | 99 | First top-up (once per account) |
| 500 | +50 | 4.99 | 199 | |
| 1,000 | +200 | 9.99 | 399 | Popular |
| 2,000 | +600 | 19.99 | 799 | |
| 5,000 | +2,000 | 49.99 | 1999 | Best value |

These are starting values. Change them to your own prices.

- **Paid coins never expire.** **Bonus coins** expire after the days set on **Rewards** and are always spent first.
- **Google Play product ID** and **App Store product ID** must match **consumable** products you create in Play Console and App Store Connect. Each store sets its own price tiers per country, so set the store prices to match.
- A pack someone bought can't be deleted: turn off **Shown in the app** instead.

## VIP plans

Weekly, monthly and yearly subscriptions that unlock every drama with no ads. Starting prices: 5.99, 19.99 and 119.99 USD (Global); 49, 149 and 999 INR (India).

| Field | What it is |
|---|---|
| **Price** | In the region's currency |
| **Offered in the app** | Show or hide the plan |
| **Google Play subscription ID**, **Google Play base plan ID** | From Play Console. Use the base plan itself, never an offer. |
| **App Store product ID** | From App Store Connect |
| **Perks** | One perk per sentence or line, as the app lists them |

How to create these subscriptions in each store: [VIP subscriptions](/mobile-app/vip-subscriptions/).

Locked subscription rules: **no free trial** that turns into a charge, a **renewal reminder 24 hours before every charge**, **cancel in two taps** in the app, and **VIP never sees an ad**.

## Ads

Rewarded ads from Google AdMob, used two ways: **one ad unlocks one episode**, and **Rewards ads** pay bonus coins.

| Field | What it is |
|---|---|
| **Unlock ads per day**, **Rewards ads per day** | Daily limits per viewer in this region |
| **Coins per Rewards ad** | 15 by default |
| **Maximum ad length** | Never more than 30 seconds |
| **Unlock and Rewards ads share one daily limit** | Off: each ad unit has its own limit |
| **Unlock ad unit ID**, **Rewards ad unit ID** | Your two rewarded ad units, in the format `ca-app-pub-0000000000000000/0000000000` |

:::danger Turn on server-side verification
In AdMob, open **Ad units** › each unit › **Server-side verification** and set the callback URL to <ServerUrl path="/api/v1/webhooks/admob-ssv" />. An ad unlocks an episode or pays coins **only once AdMob confirms it there**.
:::

Locked ad rules: 1 ad = 1 reward, at most 30 seconds, no playable or interactive ads in the unlock path, VIP never sees ads, and ads never auto-play an unlock.

## Rewards

- **Spin wheel**: the prizes in the order they sit on the wheel (an even number of them), each with **Coins** and a **Weight** (its chance compared with the others). Every spin pays. The screen shows the average spin and about how many coins a daily viewer earns a month.
- **VIP spin multiplier**: VIP viewers get the prize times this number (2 by default).
- **Streak titles**: earned at a viewer's best streak and kept for good. A title's **Bonus coins** are paid once.
- **Streak shields**: a shield covers one missed day. **One shield every** (7 days by default) and **Most a viewer holds** (2).
- **Welcome bonus**: coins for new viewers (100 by default) and **Days to use them** (7).
- **Bonus coins expire after**: counted from the day they're earned (7 days by default).

Bonus coins are spent before paid coins, earliest expiry first, and they never count towards creator earnings.

## Fair-play rules

These are locked so a pricing change can't quietly undo them:

- The price is shown in coins **and** money before every unlock.
- **Price lock**: once a viewer starts a series, their per-episode price can't rise.
- The cost to finish is on every series page.
- Auto-unlock is off by default and always capped.
- A daily spend cap (300 coins by default).
- An append-only coin history the viewer can see.
- Unlocks belong to the account and come back on a new phone.
- VIP: a reminder before renewal, cancel in two taps, no ads.

## Series in some regions only

Every series is shown in every region by default. When you only have the rights in some countries, or want a series for one market, limit it:

<Steps>
<Step title="Open the series">

<AdminPath path="Content › Titles" /> › the series › **Monetization** tab › **Where it's shown**.

</Step>
<Step title="Pick the regions">

Choose **Only these regions**, tick the regions, and save. Only regions that are switched on can be picked. The change is recorded in the audit log.

</Step>
</Steps>

What changes for viewers in every other region:

- The series disappears from Home, search, categories, creator pages, Top 10 and My List.
- A link to it says **"This series isn't available in your region."**
- Its episodes can't be unlocked or bought there.
- Followers there get no new-episode alerts, and Push composer messages sent to its followers skip them.
- **Viewers who already unlocked an episode or bought its Series Pass keep the series**, wherever they are, so nobody loses what they paid for.

The [website](/website/) shows what the default region's viewers see, so include the default region if the series should be on the website.

A region that a series is limited to can't be deleted.

## Title prices

Each series' **Coin price per episode** and **Series Pass** price are set per region on the series itself, in <AdminPath path="Content › Titles" /> › the series › **Prices**. A region without its own price uses the default region's. See [Features › Coins and unlocks](/features/coins-and-unlocks/).
