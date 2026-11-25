---
sidebar_position: 9
title: Monetization
description: Regions and coin values, coin packs, VIP plans, ads, rewards and the fair-play rules.
---

# Monetization

**Where:** <AdminPath path="Money › Monetization" />

Everything viewers pay for is set **per region**. Pick the region with the **Region** switch at the top; the tabs (**Regions**, **Coin packs**, **VIP plans**, **Ads**, **Rewards**, **Fair-play rules**) then show that region's settings, with prices in its currency.

<Access area="Prices & coin packs" view="See every tab" edit="Change regions, packs, plans, ads and rewards" />

<DomainInput />

## Regions

A **region** is a group of countries that share a currency and prices. Selling the same drama at fair local prices in, say, India and the United States is what regions are for.

<Shot src="/images/admin/monetization.webp" alt="Monetization, Regions tab: regions with their currency, coin value, countries, ad unlocks per day and VIP price" caption="The Regions tab. The demo data adds a few regions beyond Global and India." />

Every country belongs to one region. A country no active region lists uses the **default region** and its prices. eDrama starts with two:

| Region | Code | Currency | Coin value | Time zone | Countries | Unlock ads per day |
|---|---|---|---|---|---|---|
| **Global** (default) | `GLOBAL` | USD | 1 coin = 0.0099 | UTC | Every country no other region lists | 6 |
| **India** | `IN` | INR | 1 coin = 0.29 | Asia/Kolkata | India | 20 |

:::warning Placeholders
India's coin value and prices are placeholders. Replace them with your own before launch.
:::

| Field | What it is |
|---|---|
| **Name**, **Code** | The code is capital letters, digits and underscores, such as `JP`. It can't change later. |
| **Currency** | ISO 4217, such as `USD`. It can't change later: prices, purchases and reports are stored in it. The **Currency symbol** position (before or after the amount) applies to every region in that currency. |
| **Coin value** | What one coin is worth in the currency, with up to six decimals. The app shows every price in coins **and** in money before each unlock, and reports use it to turn coins into money. |
| **Time zone** | The region's time zone. |
| **Countries** | ISO 3166-1 countries. Choosing a country another region lists moves it here. |
| **Active** | Off sends its countries to the default region for new sessions. Purchases, unlocks and price locks keep their region. The default region is always on. |
| **Reason** | Optional. Kept with the change in the audit log. |

### Add, change or delete a region

<Steps>

1. Choose **New region** and fill in the fields above.
2. Leave **Active** off and choose **Save region**.
3. The new region starts as a **copy of the default region's** coin packs, VIP plans, title prices, ad limits and rewards, with money prices converted at the two coin values. Review them on each tab.
4. Turn **Active** on.

</Steps>

- **Make default** changes which region serves every other country. Viewers keep the prices they already locked. Exactly one region is the default, and it's always on.
- **Delete** works only for a region no viewer, purchase, unlock or report row belongs to.

Exchange rates into your reporting currency are set separately, in [Regions and languages](./settings/regions-and-languages.md). How regions work for viewers: [Regions & currencies](/features/regions-and-currencies/).

### How a viewer's region is decided

1. **When the account is created** (the first time the app opens), the backend takes the viewer's country from the `CF-IPCountry` header, which Cloudflare adds when your domain runs through Cloudflare's proxy. Without that header, it uses the country the phone sends. The header always wins, so viewers behind Cloudflare can't pick a cheaper region by changing their phone. To read another header, set `EDRAMA_COUNTRY_HEADER` in `.env`.
2. The country goes to the active region that lists it, or else the **default region**. The region is saved on the account.
3. **On every app start after that**, an account that **never paid** (no purchase, no VIP subscription, no paid coins) moves to the region of the country it is in now. A viewer whose first start was abroad, or who moved, gets their own prices without asking anyone.
4. An account that **has paid keeps its region**, so coins bought at one region's coin value never pay for another region's prices. If a paying viewer really moved, your team can move them with **Change region** on their page in <AdminPath path="Audience › Users" />, with a reason. A viewer **can't choose** another region themselves.

A move never touches coins, purchases, unlocks, Series Passes, VIP subscriptions or locked prices. Only what comes next follows the new region. Every move is in the audit log: **Region followed the viewer's country** (by the viewer's own app) or **Region changed** (by a team member).

The app shows viewers where their prices come from, such as "Prices in INR · India", in the coin store and in Settings. A note above the regions table says which source your server is using for countries right now.

:::tip Use Cloudflare's proxy if you sell in several regions
Without it the backend falls back to the phone's country, which viewers can change. The header only counts when it comes through a proxy your server trusts: set `EDRAMA_TRUSTED_PROXIES=cloudflare` in `.env`. Behind a CDN that always sends the header and blocks direct access to your server, also set `EDRAMA_TRUST_APP_COUNTRY=false`, so a region can only come from the CDN. See [Environment file](./environment.md).
:::

<Anchor id="coin-packs" />

## Coin packs

The packs viewers buy in the app's coin store: a number of coins, often with **bonus coins** on top, for a price.

<Screen
  id="admin-coin-packs"
  type="browser"
  wire="list"
  url="/admin/monetization?tab=packs"
  title="Coin packs"
  caption="The Coin packs tab for the Global region: coins, bonus, price, price per coin, episodes, flags and store IDs."
  markers={[
    {x: 21.5, y: 28, title: 'Region', text: 'Coin packs are set per region.'},
    {x: 92.7, y: 28, title: 'New coin pack', text: 'Add a pack to this region.'},
    {x: 21, y: 39.6, title: 'Pack', text: 'Coins and bonus coins.'},
    {x: 45.9, y: 39.7, title: 'Price and per coin', text: 'In the region’s currency.'},
    {x: 67.6, y: 39.7, title: 'Flags', text: 'Once per account (first top-up), Popular, Best value or Hidden.'},
    {x: 81.6, y: 38.8, title: 'Store SKU', text: 'The Google Play and App Store product IDs.'},
    {x: 92.5, y: 39.9, title: 'Edit', text: 'Change the pack, or turn it off.'},
  ]}
/>

eDrama starts with five per region:

| Coins | Bonus | Global (USD) | India (INR) | Flag |
|---|---|---|---|---|
| 300 | +300 | 1.99 | 99 | First top-up (once per account) |
| 500 | +50 | 4.99 | 199 | |
| 1,000 | +200 | 9.99 | 399 | Popular |
| 2,000 | +600 | 19.99 | 799 | |
| 5,000 | +2,000 | 49.99 | 1999 | Best value |

These are starting values. Change them to your own prices with **Edit**, or add one with **New coin pack**.

| Field | What it is |
|---|---|
| **Coins**, **Bonus** | **Paid coins never expire.** **Bonus coins** expire after the days set on **Rewards** and are always spent first. |
| **Price** | In the region's currency. |
| **Google Play product ID** | Lower-case letters, digits, dots, underscores and dashes. Must match a **consumable** product in Play Console. |
| **App Store product ID** | Must match a **consumable** product in App Store Connect. |
| **Once per account**, **Popular**, **Best value** | Flags: only one pack per region can carry each. The first top-up offer can be bought **once per account**. |
| **Shown in the app** | Off hides the pack without deleting it. |
| **Order** | The order in the store. |

The starting packs use `coins_300_first`, `coins_500`, `coins_1000`, `coins_2000` and `coins_5000` on Google Play and `com.edrama.app.coins.300.first`, `com.edrama.app.coins.500` and so on on the App Store: create products with these IDs, or change them here to yours. Each store sets its own price tiers per country, so set the store prices to match. See [In-app purchases](/mobile-app/ads-and-purchases/#in-app-purchases) for creating the products in each store.

:::note
A pack someone bought can't be deleted, so it stays in their history: turn off **Shown in the app** instead. A pack with a pending purchase can't be deleted either.
:::

## VIP plans

Weekly, monthly and yearly subscriptions that unlock every drama with no ads. Starting prices:

| Plan | Global (USD) | India (INR, placeholder) |
|---|---|---|
| Weekly | 5.99 | 49 |
| Monthly | 19.99 | 149 |
| Yearly | 119.99 | 999 |

Each plan card shows its price, the weekly equivalent and saving, subscribers and how many have auto-renew on.

| Field | What it is |
|---|---|
| **Price** | In the region's currency, above zero |
| **Offered in the app** | Show or hide the plan |
| **Google Play subscription ID**, **Google Play base plan ID** | From Play Console. Use the base plan itself, never an offer. They start as `vip` with the base plans `weekly`, `monthly` and `yearly`. |
| **App Store product ID** | From App Store Connect. They start as `com.edrama.app.vip.weekly`, `.monthly` and `.yearly`. |
| **Perks** | One perk per sentence or line, as the app lists them ("Every drama unlocked. No ads." to start). The language tabs take translations. |

How to create these subscriptions in each store: [VIP subscriptions](/mobile-app/vip-subscriptions/).

The three plans are fixed: press **Edit** on one to change it.

:::danger No free trials
VIP has **no free trial**: a price of zero, or an ID or perk that names a trial or a free introductory offer, is refused. The server also refuses a subscription that started with a free trial.
:::

**Rules in the app**: the VIP page in the app lists the subscription's terms in plain words. By default it shows the **built-in rules**, translated into every app language. Choose **Edit rules** to write your own (one per line, per language), or **Use built-in rules** to go back.

Locked subscription rules: **no free trial** that turns into a charge, a **renewal reminder 24 hours before every charge**, **cancel in two taps** in the app, and **VIP never sees an ad**. See [VIP subscriptions](/features/vip-subscriptions/).

## Ads

Rewarded ads from Google AdMob, ads a viewer chooses to watch, used two ways: **one ad unlocks one episode**, and **Rewards ads** pay bonus coins.

AdMob is set up in three places:

| Where | What |
|---|---|
| The app project | The AdMob **app IDs** ([Ads and purchases](/mobile-app/ads-and-purchases/)). |
| This **Ads** tab | The **ad unit IDs** per platform and region, and the limits. |
| <AdminPath path="System › Settings › Creator revenue" /> | The [AdMob Reporting API](./settings/payments.md#admob-reporting-api), so unlock-ad earnings can be shared with creators. |

| Field | What it is |
|---|---|
| **Unlock ads per day**, **Rewards ads per day** | Daily limits per viewer in this region (6 each in Global and 20 each in India to start) |
| **Coins per Rewards ad** | 15 by default |
| **Maximum ad length** | Never more than 30 seconds |
| **Unlock and Rewards ads share one daily limit** | Off: each ad unit has its own limit |
| **Unlock ad unit ID (Android)**, **Unlock ad unit ID (iOS)**, **Rewards ad unit ID (Android)**, **Rewards ad unit ID (iOS)** | Your rewarded ad units, in the format `ca-app-pub-0000000000000000/0000000000`. An AdMob ad unit belongs to one app, so Android and iOS each need their own. A platform without a unit shows no ads in that region. |

### Create the ad units

<Steps>

1. In [AdMob](https://apps.admob.com/), for **each app** (Android and iOS), create two **Rewarded** ad units: one for unlocks, one for Rewards.
2. Turn on **server-side verification** for every unit (below).
3. Enter the four unit IDs on this tab for each region, with the daily limits and coins per Rewards ad.

</Steps>

:::danger Turn on server-side verification
In AdMob, open **Ad units** › each unit › **Server-side verification** and set the callback URL to <ServerUrl path="/api/v1/webhooks/admob-ssv" inline /> (also shown on this tab). An ad unlocks an episode or pays coins **only once AdMob confirms it there**, so ads can't be faked. Without it, ads play but reward nothing.
:::

Locked ad rules: 1 ad = 1 reward (never two ads that turn into six), at most 30 seconds, no playable or interactive ads in the unlock path, paid only once AdMob confirms the ad, VIP never sees ads anywhere, and ads never auto-play an unlock: the viewer always taps to watch. Use AdMob's **Blocking controls** to keep interactive formats out of your rewarded units.

## Rewards

<Screen
  id="admin-rewards"
  type="browser"
  wire="form"
  url="/admin/monetization?tab=rewards"
  title="Rewards"
  caption="The Rewards tab for the Global region: the spin wheel’s prizes and the streak titles."
  markers={[
    {x: 21.5, y: 28, title: 'Region', text: 'Rewards are set per region.'},
    {x: 90.8, y: 28, title: 'Restore default rewards', text: 'Fills the form with the default wheel, titles, shields and multiplier.'},
    {x: 37.4, y: 36, title: 'Spin wheel', text: '6 to 12 prizes (an even number), in wheel order; drag to rearrange.'},
    {x: 23.3, y: 51.5, title: 'A prize', text: 'Its coins and weight; the chance is worked out for you.'},
    {x: 49.6, y: 59.2, title: 'Chance', text: 'Weight compared with the others.'},
    {x: 78.3, y: 36, title: 'Streak titles', text: 'Names earned at a viewer’s best streak, with one-time bonus coins.'},
    {x: 63.1, y: 59.6, title: 'Translations', text: 'Each title’s name in other app languages.'},
    {x: 93.7, y: 95.5, title: 'Save rewards', text: 'Nothing changes for viewers until you save.'},
  ]}
/>

- **Spin wheel**: viewers spin **once a day for free**, and **every spin pays** bonus coins; the server picks the prize, and viewers can see the odds. Set the prizes in the order they sit on the wheel (an even number, from 6 to 12, so the colours alternate; drag rows to rearrange), each with **Coins** and a **Weight** (its chance compared with the others: 200 comes up twice as often as 100). The screen shows the average spin and about how many coins a daily viewer earns a month.
- **VIP spin multiplier**: VIP viewers get the prize times this number (2 by default). Title bonuses are never multiplied.
- **Streak titles**: each with **Days**, **Title** and **Bonus coins**, earned at a viewer's best streak and kept for good. A title's bonus coins are paid once, the first time it's reached. Titles can be renamed, added and translated per language; the app colours them by their order.
- **Streak shields**: each daily spin adds a day to the viewer's streak, and a shield covers one missed day by itself. **One shield every** (7 days of streak by default; `0` turns shields off) and **Most a viewer holds** (2). Shields are only earned, never sold.
- **Welcome bonus**: coins for new viewers (100 by default), given **once per device**, and **Days to use them** (7).
- **Bonus coins expire after**: counted from the day they're earned (7 days by default). Applies to spin, ad and pack bonuses.

The default wheel (8 prizes, in wheel order):

| Prize | 10 | 200 | 15 | 50 | 20 | 100 | 25 | 30 |
|---|---|---|---|---|---|---|---|---|
| **Weight** | 300 | 3 | 250 | 35 | 200 | 12 | 120 | 80 |
| **Chance** | 30% | 0.3% | 25% | 3.5% | 20% | 1.2% | 12% | 8% |

The default streak titles:

| Days | Title | Bonus coins |
|---|---|---|
| 1 | Extra | 0 |
| 3 | Understudy | 5 |
| 7 | Scene Stealer | 20 |
| 14 | Plot Twister | 30 |
| 30 | Drama Champion | 75 |
| 60 | Drama Royalty | 100 |
| 100 | Drama Legend | 150 |
| 365 | Hall of Famer | 500 |

The Rewards ads limits are shown here but set on the **Ads** tab. **Restore default rewards** fills the form with the default wheel, titles, shields and VIP multiplier (the welcome bonus and expiry stay as they are); nothing changes until you press **Save rewards**.

Bonus coins are spent before paid coins, earliest expiry first, and they never count towards creator earnings. Rewards can be switched off for everyone in <AdminPath path="System › Settings › App & support" /> › **Features**: the app's Rewards tab then becomes the Wallet tab. See [Rewards economy](/features/rewards-economy/).

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

Why each rule exists: [Fair-play rules](/features/fair-play-rules/).

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

Each series' **Coin price per episode** and **Series Pass** price are set per region on the series itself: <AdminPath path="Content › Titles" /> › the series › **Monetization** tab › **Prices** › **Change prices**, with a reason for the audit log. A region left empty uses the default region's price. Viewers who already started the series keep their price if it rises.

The same tab sets the paywall: **Free episodes**, **Included in VIP** and **Ads can unlock**. See [Features › Coins and unlocks](/features/coins-and-unlocks/) and the [Title editor](/admin-panel/using/content/title-editor/).
