---
sidebar_position: 11
title: Ads and purchases
description: AdMob rewarded ads and in-app purchases of coins and VIP.
---

# Ads and purchases

<DomainInput />

## AdMob rewarded ads

Create your AdMob account and add the Android and iOS apps: **[common guide › Google AdMob](https://wrteam-in.github.io/common_app_doc/GeneralSettings/advertisement/google-admob)**.

eDrama uses two **rewarded** ad units: one that unlocks an episode, and one for Rewards (bonus coins). What goes where:

| What | Where |
|---|---|
| **AdMob app ID**, Android | `android/app/src/main/AndroidManifest.xml`: the `com.google.android.gms.ads.APPLICATION_ID` value |
| **AdMob app ID**, iOS | `ios/Runner/Info.plist`: `GADApplicationIdentifier` |
| **Ad unit IDs** | Admin Panel › Money › Monetization › **Ads**, per region. **Not** in the app. |
| **Server-side verification** | AdMob › each ad unit › **Server-side verification**: <ServerUrl path="/api/v1/webhooks/admob-ssv" /> |

:::caution Replace the test IDs
The app ships with **Google's sample test app IDs**. Put your own in both files before you release.
:::

An ad unlocks an episode or pays coins only once AdMob confirms it on that callback, so server-side verification is required.

### Consent

The app asks for ad consent with Google's **User Messaging Platform**. Create the messages in AdMob › **Privacy & messaging**: a GDPR message for Europe, and an IDFA message (Apple's tracking prompt) for iOS. Viewers can reopen their choices in Me › Settings › Privacy choices.

## In-app purchases

Coins are **consumable** products and VIP plans are **auto-renewable subscriptions**. The Series Pass is paid in coins, so it needs no store product.

<Steps>
<Step title="Create the products">

In Play Console and App Store Connect, create one **consumable** product per coin pack (**[common guide › In-app purchases](https://wrteam-in.github.io/common_app_doc/GeneralSettings/iap)**) and one **auto-renewable subscription** per VIP plan (**[VIP subscriptions](./vip-subscriptions.md)**).

</Step>
<Step title="Enter the same IDs in the Admin Panel">

Monetization › **Coin packs**: **Google Play product ID** and **App Store product ID** for each pack.
Monetization › **VIP plans**: **Google Play subscription ID**, **Google Play base plan ID** and **App Store product ID**.

</Step>
<Step title="Connect the stores">

Add the Google Play and App Store keys and webhooks so the server can check every purchase: [Settings › Payments](/admin-panel/settings/payments/).

</Step>
</Steps>

The app never decides how many coins a purchase gives: it sends the store's receipt to your server, which checks it with the store and adds the coins. **Restore purchases** in the coin store claims anything interrupted.

To test, use Google Play's licence testers and Apple's Sandbox accounts, and set the App Store card's **Environment** to **Sandbox**.
