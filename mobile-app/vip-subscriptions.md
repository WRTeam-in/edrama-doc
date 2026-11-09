---
sidebar_position: 11.5
title: VIP subscriptions
description: Create the weekly, monthly and yearly VIP plans as auto-renewable subscriptions in Google Play and the App Store, and connect them to eDrama.
---

# VIP subscriptions

VIP plans are **auto-renewable subscriptions**: the store charges the viewer again at the end of every period until they cancel. They are set up differently from coin packs, which are one-time consumable products ([Ads and purchases](./ads-and-purchases.md#in-app-purchases)).

eDrama starts with three plans per region: **weekly**, **monthly** and **yearly**. For each plan you create a subscription in each store, then enter the store's IDs in <AdminPath path="Money › Monetization › VIP plans" />.

:::danger No free trials
eDrama's VIP has **no free trial and no introductory offer**, a fair-play rule that the server enforces. Don't add trial or intro offers in either store. The Admin Panel also refuses a product ID, base plan ID or perk that names a trial, an intro offer or a "free week"/"7 days free".
:::

## Before you start

- Your app is created in Play Console and App Store Connect, with your own [package name](./package-name.md).
- **Google Play:** a payments profile is set up for your developer account, and an app build with billing has been uploaded to a testing track at least once. Play Console only lets you create products after that.
- **App Store:** the **Paid Applications Agreement** is signed, with your banking and tax details, in App Store Connect › **Business**. See the [common in-app purchase guide](https://wrteam-in.github.io/common_app_doc/GeneralSettings/iap) for both.

## Google Play

On Google Play, a **subscription** holds one or more **base plans**. Each base plan has its own billing period and prices. eDrama stores both IDs for each VIP plan, so either layout works:

- **One subscription with three base plans** (for example subscription `vip`, base plans `weekly`, `monthly`, `yearly`), or
- **three subscriptions**, each with one base plan.

<Steps>
<Step title="Create the subscription">

Play Console › your app › **Monetize with Play › Products › Subscriptions** › **Create subscription**. Enter a **Product ID** (such as `vip`; it can't change later) and a name. This is the **Google Play subscription ID** in eDrama.

</Step>
<Step title="Add a base plan">

In the subscription, **Add base plan**:

- **Base plan ID**: such as `weekly`. This is the **Google Play base plan ID** in eDrama.
- **Type**: **Auto-renewing**.
- **Billing period**: **Weekly**, **Monthly** or **Yearly**, matching the eDrama plan.
- **Prices**: set them per country. Google can fill other countries from one price.

Save, then **Activate** the base plan. Repeat for the other two plans.

</Step>
<Step title="Leave offers empty">

Don't create **offers** (free trials or intro prices) on these base plans.

</Step>
</Steps>

## App Store

On the App Store, subscriptions live in a **subscription group**. A viewer can have only one subscription of a group at a time, and can move between them, so put all three VIP plans in **one group**.

<Steps>
<Step title="Create the group">

App Store Connect › your app › **Monetization › Subscriptions** › **Create** a subscription group, such as `VIP`. Add a group localization (the name viewers see in their subscription settings).

</Step>
<Step title="Create a subscription for each plan">

In the group, **Create** a subscription:

- **Reference Name**: for you, such as `VIP Weekly`.
- **Product ID**: such as `com.yourcompany.yourapp.vip.weekly`. It can never be reused. This is the **App Store product ID** in eDrama.
- **Subscription Duration**: **1 Week**, **1 Month** or **1 Year**, matching the eDrama plan.
- **Subscription Prices**: pick a price, and adjust other countries if you want.
- **Localization**: a display name and description.
- **Review Information**: a screenshot of the VIP screen and a short note for the reviewer.

Repeat for the monthly and yearly plans.

</Step>
<Step title="Set the levels">

Drag the subscriptions into **levels** in the group, with your best-value plan at the top (often yearly). Apple uses the order for upgrades and downgrades.

</Step>
<Step title="Don't add introductory offers">

Leave **Introductory Offers**, **Promotional Offers** and **Offer Codes** empty.

</Step>
<Step title="Submit them with a build">

Your first subscriptions are reviewed **with an app version**: select them in the version's **In-App Purchases and Subscriptions** section before you submit it for review.

</Step>
</Steps>

## Connect them to eDrama

<Steps>
<Step title="Enter the IDs">

<AdminPath path="Money › Monetization" />, pick the region, open **VIP plans**, and **Edit** each plan:

| Field | Value |
|---|---|
| **Price** | The price viewers pay in this region's currency, matching the store price |
| **Google Play subscription ID** | The subscription's Product ID |
| **Google Play base plan ID** | The base plan's ID |
| **App Store product ID** | The subscription's Product ID |
| **Perks** | What VIP includes, one per line (the default is "Every drama unlocked. No ads.") |
| **Offered in the app** | On |

Do this for every region you sell in. The store IDs are usually the same in every region, and the prices are per region.

</Step>
<Step title="Add the store keys and notifications">

Renewals, cancellations and refunds reach eDrama only through the stores' server notifications. Set up both in [Settings › Payments](/admin-panel/settings/payments/): the Google Play keys with real-time developer notifications, and the App Store keys with the server notifications URL (version 2).

</Step>
</Steps>

## How it behaves

- The viewer buys VIP in the app. The server checks the purchase with the store before VIP turns on.
- Each renewal, cancellation, refund or chargeback arrives from the store, and the viewer's VIP is extended or ended to match.
- eDrama reminds the viewer **24 hours before every renewal charge**.
- Viewers cancel from the app's VIP screen, which opens the store's own subscription page.
- **Subscribers** and **Auto-renew on** for each plan show on the **VIP plans** tab. VIP revenue, after the store fee, shows on the **Dashboard**.

## Test it

| Store | How | Renewals |
|---|---|---|
| Google Play | Add **License testers** in Play Console › **Settings › License testing**, and install the app from a testing track | Speeded up: a weekly or monthly plan renews about every 5 minutes, a yearly one about every 30 minutes |
| App Store | Sign in with a **Sandbox** account (App Store Connect › **Users and Access › Sandbox**) on a TestFlight or development build. Set the App Store card's **Environment** to **Sandbox**. | Speeded up: 1 week ≈ 3 minutes, 1 month ≈ 5 minutes, 1 year ≈ 1 hour |

After a few renewals, the test subscription shows on the viewer in <AdminPath path="Audience › Users" />, with **Auto-renew** on.
