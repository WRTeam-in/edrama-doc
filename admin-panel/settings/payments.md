---
sidebar_position: 8
title: Payments
description: Revenue share, store fees, creator price limits, the daily spend cap, and the Google Play and App Store keys that verify purchases.
---

# Payments

**Where:** <AdminPath path="System › Settings › Payments" />

Coins and VIP are sold through **Google Play** and the **App Store**. The backend checks every purchase with the store before it adds coins, and the stores tell it about renewals, refunds and chargebacks.

<DomainInput />

## Revenue share

| Field | What it does |
|---|---|
| **Default creator share** | The percent of paid coin revenue a creator earns on their series (50 by default). A creator's own percent, set on their page in <AdminPath path="Community › Creators" />, wins. |
| **Google Play fee**, **App Store fee** | The stores' cut, in percent (15 by default). Used to work out net revenue. |
| **Reason for the change** | Required. Recorded in the audit log. |

The share and fees are **saved on each unlock and purchase**, so a change never rewrites past money: new unlocks and purchases use the new values. How the numbers combine is explained, with a calculator, on [How earnings work](/features/how-earnings-work/).

## Creator price limits

What a creator may charge per episode, and the free episodes every creator series starts with: **Lowest coin price**, **Highest coin price** (30 and 90 coins by default) and **Free episodes at least** (5 by default). Prices already set stay until they next change.

## Daily spend cap

The daily coin caps a viewer can choose in the app (**Choices, in coins**: up to 6 amounts, 100, 300, 600 and 1,000 by default; press Enter after each) and the **Default cap** (300), which must be one of the choices. The cap is a fair-play rule and is always on.

## Balance adjustments

**Approval limit**: when a team member adds or removes more coins than this (1,000 by default), a second member must approve the change.

## Google Play keys

<Steps>
<Step title="Create a service account">

In the [Google Cloud console](https://console.cloud.google.com/), pick or create a project and enable the **Google Play Android Developer API** for it. Then, under **IAM & Admin › Service accounts**, create a service account and add a **JSON key** for it (**Keys › Add key › Create new key › JSON**).

</Step>
<Step title="Give it access in Play Console">

Play Console › **Users and permissions** › **Invite new users**: add the service account's email (it ends in `iam.gserviceaccount.com`) with **View financial data, orders and cancellation survey responses** and **Manage orders and subscriptions**, for your app. New access can take up to a day to start working.

</Step>
<Step title="Add the keys">

On the **Google Play** card, press **Add keys** and enter the **Package name** (your app's ID, such as `com.yourcompany.yourapp`) and the **Service account JSON** (open the downloaded file and paste its whole contents).

</Step>
<Step title="Turn on real-time notifications">

So renewals, cancellations and refunds reach eDrama at once:

1. In Google Cloud **Pub/Sub**, create a topic. Give `google-play-developer-notifications@system.gserviceaccount.com` the **Pub/Sub Publisher** role on it.
2. Create a **push** subscription on the topic, with the endpoint <ServerUrl path="/api/v1/webhooks/google-play" />. Turn on **authentication**, pick a service account, and set the **audience** to the same URL.
3. Enter that service account's email in **Pub/Sub push service account**. Google Play notifications are refused without it.
4. In Play Console › **Monetize with Play › Monetization setup** › **Real-time developer notifications**, enter the topic's full name and send a test notification.

</Step>
</Steps>

## App Store keys

<Steps>
<Step title="Create an In-App Purchase key">

App Store Connect › **Users and Access** › **Integrations** › **In-App Purchase**: generate a key and download the `.p8` file (you can download it only once). Note the **Key ID** and the **Issuer ID** shown on that page.

</Step>
<Step title="Add the keys">

On the **App Store** card, press **Add keys** and enter the **Issuer ID**, **Key ID**, **Private key (.p8)** (open the file in a text editor and paste everything, including the `BEGIN` and `END` lines) and **Bundle ID** (your app's bundle ID).

**Environment** only decides where **Test connection** asks Apple for a test notification: **Production** (default) or **Sandbox**. Purchases are always checked with the live App Store first and then the sandbox, so TestFlight and App Review purchases work either way.

</Step>
<Step title="Add the server notifications URL">

App Store Connect › your app › **App Information** › **App Store Server Notifications**: choose **Version 2** and paste <ServerUrl path="/api/v1/webhooks/app-store" /> for **both** production and sandbox.

</Step>
</Steps>

Press **Save keys**, then **Test connection** on each card. Google Play's test reads your app's subscriptions; the App Store's asks Apple to send a test notification to the URL above. Secrets are stored encrypted and never shown again; leave one empty to keep it.

## Products in the stores

Coin packs are **consumable** in-app products and VIP plans are **auto-renewable subscriptions**. Create them in Play Console and App Store Connect with the **same product IDs** you enter in [Monetization](../monetization.md). Coin packs: the [common in-app purchase guide](https://wrteam-in.github.io/common_app_doc/GeneralSettings/iap). VIP plans: [VIP subscriptions](/mobile-app/vip-subscriptions/), step by step for both stores.
