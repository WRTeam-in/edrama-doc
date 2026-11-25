---
sidebar_position: 8
title: Payments
description: Revenue share, store fees, creator price limits, the daily spend cap, the Google Play and App Store keys that verify purchases, and the creator revenue schedule.
---

# Payments

**Where:** <AdminPath path="System › Settings › Payments" />

Coins and VIP are sold through **Google Play** and the **App Store**. The backend checks every purchase with the store before it adds coins, and the stores tell it about renewals, refunds and chargebacks.

<DomainInput />

## Revenue share

| Field | What it does |
|---|---|
| **Default creator share** | The percent of paid coin revenue a creator earns on their series (50 by default). A creator's own percent, set on their page in <AdminPath path="Community › Creators" />, wins. |
| **Google Play fee**, **App Store fee** | The stores' cut, in percent (15 by default). Used to work out net revenue: the "after store fee" figures and the creator pools. |
| **Reason for the change** | Required. Recorded in the audit log. |

The share and fees are **saved on each unlock and purchase**, so a change never rewrites past money: new unlocks and purchases use the new values. How the numbers combine is explained, with a calculator, on [How earnings work](/features/how-earnings-work/).

## Creator price limits

What a creator may charge per episode, and the free episodes every creator series starts with. Prices already set stay until they next change.

| Setting | Default |
|---|---|
| **Lowest coin price** | 30 coins |
| **Highest coin price** | 90 coins |
| **Free episodes at least** | 5 |

## Daily spend cap

The daily coin caps a viewer can choose in the app (the "spend guard"):

| Setting | Default |
|---|---|
| **Choices, in coins** | Up to 6 amounts: 100, 300, 600 and 1,000 to start. Press Enter after each. |
| **Default cap** | 300. Must be one of the choices. |

The cap is a fair-play rule, so it can't be removed here. To hide the daily limit from the app altogether, switch off **Daily spend limit** in <AdminPath path="System › Settings › App & support" /> › **Features**.

## Balance adjustments

**Approval limit**: when a team member adds or removes more coins than this (1,000 by default), a second member must approve the change ([Balance adjustments](/admin-panel/using/audience/balance-adjustments/)).

## Google Play keys

Your server talks to Google Play to **verify** every coin-pack purchase and VIP subscription, to **refund** from the Admin Panel, and to hear about refunds, renewals and cancellations through **real-time developer notifications**.

<Steps>
<Step title="Create a service account">

In the [Google Cloud console](https://console.cloud.google.com/), pick the project linked to your Play account (or create one) and enable the **Google Play Android Developer API** for it. Then, under **IAM & Admin › [Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)**, create a service account and add a **JSON key** for it (**Keys › Add key › Create new key › JSON**). A file downloads.

</Step>
<Step title="Give it access in Play Console">

[Play Console](https://play.google.com/console) › **Users and permissions** › **Invite new users**: add the service account's email (it ends in `iam.gserviceaccount.com`) with **View financial data, orders and cancellation survey responses** and **Manage orders and subscriptions**, for your app. New access can take **up to a day** to start working: if **Test connection** fails straight after, try again later.

</Step>
<Step title="Add the keys">

On the **Google Play** card, press **Add keys**:

| Field | What to enter |
|---|---|
| **Package name** | Your app's ID, such as `com.yourcompany.yourapp` |
| **Service account JSON** | Open the downloaded file and paste its whole contents. |
| **Pub/Sub push service account** | The account the push subscription signs with (next step). **Required** for real-time notifications: without it, every Google Play notification is refused. |

</Step>
<Step title="Turn on real-time notifications">

So renewals, cancellations and refunds reach eDrama at once:

1. In Google Cloud **Pub/Sub**, create a topic. On the topic's **Permissions**, give `google-play-developer-notifications@system.gserviceaccount.com` the **Pub/Sub Publisher** role, so Google Play can post to it.
2. Create a **push** subscription on the topic, with the endpoint shown on the card as **Real-time notifications push URL**: <ServerUrl path="/api/v1/webhooks/google-play" inline />. Turn on **authentication**, pick a service account, and set the **audience** to the same URL.
3. Enter that service account's email in **Pub/Sub push service account** on the Google Play card, and save.
4. In Play Console › **Monetize with Play › Monetization setup** › **Real-time developer notifications**, enter the topic's full name (`projects/<project>/topics/<topic>`) and send a test notification.

</Step>
</Steps>

Each notification is checked, stored once, and processed in the background (up to 5 tries). Google's **voided purchases** list is also checked daily, so refunds and chargebacks are never missed.

## App Store keys

Your server checks every iOS purchase with Apple and receives **App Store Server Notifications (version 2)** for renewals, refunds and cancellations.

<Steps>
<Step title="Create an In-App Purchase key">

[App Store Connect](https://appstoreconnect.apple.com/) › **Users and Access** › **Integrations** › **In-App Purchase**: generate a key and download the `.p8` file (you can download it only once). Note the **Key ID** (10 characters). The **Issuer ID** is shown at the top of **Users and Access › Integrations › App Store Connect API**.

</Step>
<Step title="Add the keys">

On the **App Store** card, press **Add keys** and enter the **Issuer ID**, **Key ID**, **Private key (.p8)** (open the file in a text editor and paste everything, including the `BEGIN` and `END` lines) and **Bundle ID** (your iOS app's bundle ID, such as `com.yourcompany.yourapp`).

**Environment** only decides where **Test connection** asks Apple for a test notification: **Production** (default) or **Sandbox**.

:::info TestFlight and App Review purchases just work
Every purchase is checked with the **live App Store first, then the sandbox**, whatever **Environment** says. So TestFlight, Sandbox testers and App Review can buy without you switching anything. Leave **Environment** on **Production**.
:::

</Step>
<Step title="Add the server notifications URL">

Copy the **Server notifications URL (version 2)** from the card, <ServerUrl path="/api/v1/webhooks/app-store" inline />. In App Store Connect › your app › **App Information** › **App Store Server Notifications**, choose **Version 2** and paste it for **both** production and sandbox. Notifications are signed by Apple and checked before anything is stored.

</Step>
</Steps>

Press **Save keys**, then **Test connection** on each card. Google Play's test reads your app's subscriptions; the App Store's asks Apple to send a test notification to the URL above. Secrets are stored encrypted and never shown again; leave one empty to keep it.

:::note Refunds on the App Store
Apple decides App Store refunds. In Transactions, the purchase drawer links to Apple's refund request page for the viewer, and Apple's notification updates the purchase when a refund (or a refund reversal) happens. See [Refunds and chargebacks](/features/refunds-and-chargebacks/).
:::

## Products in the stores

Coin packs are **consumable** in-app products and VIP plans are **auto-renewable subscriptions**. Create them in Play Console and App Store Connect with the **same product IDs** you enter in [Monetization](../monetization.md):

- **Google Play**: one consumable product per coin pack, and the `vip` subscription with base plans `weekly`, `monthly` and `yearly`.
- **App Store**: one consumable per coin pack, and the three VIP subscriptions in one subscription group.

Coin packs: the [common in-app purchase guide](https://wrteam-in.github.io/common_app_doc/GeneralSettings/iap). VIP plans: [VIP subscriptions](/mobile-app/vip-subscriptions/), step by step for both stores.

:::warning
A purchase must be for the product the app names; the server refuses mismatches. VIP base plans must not carry a free-trial offer.
:::

## Creator revenue {#creator-revenue}

<AdminPath path="System › Settings › Creator revenue" /> controls how each month's ad and VIP money is shared with creators. The monthly statements themselves are on [Creator revenue](/admin-panel/using/money/creator-revenue/).

| Setting | Default | Meaning |
|---|---|---|
| **Prepare each month by itself** | On | On the import day, the month before is imported from AdMob (when connected) and calculated, and members with Transactions (Edit) get a bell. |
| **Import day of the month** | 5 | 1 to 28. AdMob finalises a month's earnings in the first days of the next. |
| **Ads pool** | 100% | Of each region's unlock-ad earnings. |
| **VIP pool** | 100% | Of each region's VIP revenue, after refunds and store fees. |
| **A second member approves** | Off | Whoever last changed a month (a pool or an adjustment) can't approve it. |

Each creator's own share percent is on their page and starts from the default share. A country's earnings go to the region that lists it.

### AdMob Reporting API

A card to connect AdMob **read-only**, so the monthly import can read your unlock ads' earnings by country and ad unit:

<Steps>

1. In Google Cloud, enable the [AdMob API](https://console.cloud.google.com/apis/library/admob.googleapis.com). Set up **APIs & Services › OAuth consent screen** and **publish** it (in testing mode, Google ends the connection after 7 days).
2. [Credentials](https://console.cloud.google.com/apis/credentials) › **Create credentials › OAuth client ID › Web application**. Add the **Authorised redirect URI** shown on the AdMob Reporting API card.
3. Paste the **OAuth client ID** and **client secret** on the card and **Save**.
4. Choose **Connect AdMob** and sign in with the Google account that owns the AdMob account. The **refresh token** (and the **publisher ID**, `pub-…`, when there's one AdMob account) are filled in for you.

</Steps>

Without it, creator revenue's ads pools stay at zero unless set by hand. The ad units themselves are set up in [Monetization › Ads](../monetization.md#ads).
