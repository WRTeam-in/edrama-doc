---
sidebar_position: 11
title: Ads and purchases
description: AdMob rewarded ads and in-app purchases of coins and VIP.
---

# Ads and purchases

<DomainInput />

<Anchor id="admob-rewarded-ads" />

## AdMob rewarded ads

eDrama shows **rewarded ads** only: ads a viewer chooses to watch to unlock one episode or earn bonus coins. Setting them up has two halves:

| Where | What |
|---|---|
| **In the app** (this page) | Your AdMob **app ID** for Android and for iOS. |
| **In the Admin Panel** | The **ad unit IDs**, daily limits and coin amounts, per region: <Path>Money › Monetization › Ads</Path>. See [Ads & rewards](/admin-panel/monetization/#ads). |

:::warning[Replace the test IDs]
The app ships with **Google's sample test app IDs**: `ca-app-pub-3940256099942544~3347511713` (Android) and `ca-app-pub-3940256099942544~1458002511` (iOS). Every build shows test ads and earns nothing. An Android release build without `admob.appId` prints a `WARNING` about the test ID; **iOS doesn't warn**, so check `Info.plist` yourself before you publish.
:::

| What | Where | Format |
|---|---|---|
| AdMob **app ID**, Android | `admob.appId` in `android/key.properties` or `android/local.properties` | `ca-app-pub-…~…` (with a `~`) |
| AdMob **app ID**, iOS | `GADApplicationIdentifier` in `ios/Runner/Info.plist` | `ca-app-pub-…~…` |
| **Ad unit IDs** (unlock and Rewards, per platform) | Admin Panel › Monetization › **Ads**, per region. **Not** in the app. | `ca-app-pub-…/…` (with a `/`) |
| **Server-side verification** callback | AdMob › each ad unit | <ServerUrl path="/api/v1/webhooks/admob-ssv" inline /> |

<CommonGuide to="GeneralSettings/advertisement/google-admob" title="Google AdMob" text="Create the AdMob account and the Android and iOS apps, with screenshots." />

### Create the apps in AdMob

In [AdMob](https://apps.admob.com/), choose **Apps › Add app**, once for Android and once for iOS. Each app gets an **app ID** that looks like `ca-app-pub-1234567890123456~1234567890` (note the `~`).

### Android

Put the Android app ID in `android/local.properties` (not committed to version control) or `android/key.properties`:

```properties title="android/local.properties"
admob.appId=ca-app-pub-1234567890123456~1234567890
```

The build reads it and writes it into the Android manifest for you: don't edit `AndroidManifest.xml` by hand.

### iOS

Put the iOS app ID in `ios/Runner/Info.plist`:

```xml title="ios/Runner/Info.plist"
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-1234567890123456~0987654321</string>
```

<Anchor id="consent" />

### Privacy and consent

The app asks for ad consent where the law requires it (using Google's consent message), and viewers can change their choice in <Path panel="app">Me › Settings › Privacy choices</Path>. On iOS it also shows Apple's tracking prompt, with this text from `Info.plist`:

> This lets eDrama show ads that fit you better. Your choice doesn't change what you can watch.

Change the app's name in that line when you rebrand. The consent messages themselves come from Google's **User Messaging Platform**: create them in AdMob › **Privacy & messaging**, a **GDPR** message for Europe and an **IDFA** explainer for Apple's tracking prompt (plus a US state regulations message if you serve the US).

### The rest happens on the server

After the IDs, everything else is in the Admin Panel: ad units per platform and region, daily limits, coins per ad and **server-side verification**, which makes sure an ad really was watched before anything is unlocked or paid. Follow [AdMob integration](/admin-panel/monetization/#ads).

<Anchor id="in-app-purchases" />

## In-app purchases

Viewers buy **coin packs** (one-time purchases) and **VIP** (a subscription) through Google Play and the App Store. The app itself needs no code change: it asks your server which products to show, then the store sells them, and your server checks every receipt before coins land.

What you must do is create the **same products** in each store, with IDs that match the ones in <Path>Money › Monetization</Path>. The **Series Pass** is paid in coins, so it needs no store product.

### Before you start

- Your app exists in Play Console and App Store Connect, with your own [package name](/mobile-app/package-name/).
- **Google Play:** a **payments profile** is set up for your developer account, and a build with billing has been uploaded to a testing track at least once. Play Console only lets you create products after that.
- **App Store:** the **Paid Applications Agreement** is signed, with your banking and tax details, in App Store Connect › **Business**.

<CommonGuide to="GeneralSettings/iap" title="In-app purchases" text="Payments profile, agreements, and creating products in Play Console and App Store Connect, with screenshots." />

### The product IDs the installer created

You can keep these or change them, as long as the store and the Admin Panel agree.

### Coin packs

| Pack | Google Play product ID | App Store product ID |
|---|---|---|
| 300 + 300 bonus (first top-up offer) | `coins_300_first` | `com.edrama.app.coins.300.first` |
| 500 + 50 bonus | `coins_500` | `com.edrama.app.coins.500` |
| 1000 + 200 bonus (Popular) | `coins_1000` | `com.edrama.app.coins.1000` |
| 2000 + 600 bonus | `coins_2000` | `com.edrama.app.coins.2000` |
| 5000 + 2000 bonus (Best value) | `coins_5000` | `com.edrama.app.coins.5000` |

Create these as **consumable** products (they can be bought again and again).

### VIP

| Plan | Google Play | App Store |
|---|---|---|
| Weekly | Subscription `vip`, base plan `weekly` | `com.edrama.app.vip.weekly` |
| Monthly | Subscription `vip`, base plan `monthly` | `com.edrama.app.vip.monthly` |
| Yearly | Subscription `vip`, base plan `yearly` | `com.edrama.app.vip.yearly` |

Create these as **auto-renewable subscriptions** (on iOS, the three in one subscription group): step by step for both stores on [VIP subscriptions](/mobile-app/vip-subscriptions/). The IDs are entered in the Admin Panel's Monetization › **VIP plans** as **Google Play subscription ID**, **Google Play base plan ID** and **App Store product ID**.

:::danger[No free trials]
eDrama's VIP never starts with a free trial or a cut-price introductory offer: it's one of the [fair-play rules](/features/fair-play-rules/). The server refuses a subscription the store started with a free trial (and leaves a Google Play one unacknowledged so Google refunds it). **Don't add offers or trials** to these products in either store.
:::

### Prices

Each store sets its own price tiers per country. Set the store prices to match what you entered in the Admin Panel for each region, as closely as the tiers allow. The coin store in the app lists your Admin Panel prices (with a line such as "Prices in INR · India"), and the store confirms its own price at checkout: if the two differ, viewers notice.

### Connect the stores to your server

The server needs keys to check receipts and to hear about refunds and renewals:

- [Google Play setup](/admin-panel/settings/payments/#google-play-keys): a service account, and real-time developer notifications.
- [App Store setup](/admin-panel/settings/payments/#app-store-keys): an In-App Purchase key, and App Store Server Notifications.

### Test before launch

| Store | How | Subscription renewals while testing |
|---|---|---|
| **Google Play** | Add your testers in Play Console › **Settings › License testing**, then install the app from a testing track. | Speeded up: weekly and monthly renew about every 5 minutes, yearly about every 30 minutes. |
| **App Store** | Create a **Sandbox** tester (App Store Connect › **Users and Access › Sandbox**) and sign in with it on a TestFlight or development build. No server setting changes: purchases are checked with the live App Store, then the sandbox. | Speeded up: 1 week ≈ 3 minutes, 1 month ≈ 5 minutes, 1 year ≈ 1 hour. |

Buy a coin pack and check that it appears on <Path>Money › Transactions</Path> with its receipt checks passed. After a few VIP renewals, the test subscription shows on the viewer in <Path>Audience › Users</Path> with **Auto-renew** on.

### How it behaves

- The app never decides how many coins a purchase gives: it sends the store's receipt to your server, which checks it with the store and then adds the coins or turns VIP on.
- Each renewal, cancellation, refund or chargeback reaches eDrama through the stores' **server notifications**, and VIP is extended or ended to match. Set them up in [Google Play](/admin-panel/settings/payments/#google-play-keys) and [App Store](/admin-panel/settings/payments/#app-store-keys).
- Viewers get a reminder **24 hours before every renewal charge**, and cancel from the app's VIP screen, which opens the store's own subscription page.
- **Restore purchases** in the coin store claims anything that was interrupted.
