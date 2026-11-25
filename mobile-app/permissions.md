---
sidebar_position: 13.5
title: "Permissions and platform settings"
sidebar_label: "Permissions & platform settings"
description: "Every Android permission and iOS Info.plist key and entitlement the app uses, why, and what to change when you rebrand or publish."
---

The project is already configured for both platforms. This page lists what's there, why each item exists, and the few you change when you rebrand. Use it when you fill in the stores' privacy forms, so your answers match what the app does.

## Android

### Versions

| Setting | Value | Where |
|---|---|---|
| Minimum Android | **7.0 (API 24)** | `minSdk` in `android/app/build.gradle.kts` |
| Target Android | API 36 (Flutter's default for 3.47.7) | `targetSdk` (from Flutter) |
| Java | 17 | `build.gradle.kts` |
| Code shrinking | R8 on for release (shrink, optimise, obfuscate) | `build.gradle.kts` |

### Permissions

The app itself declares two permissions; the libraries it uses add the rest when Android builds the app.

| Permission | Added by | Why |
|---|---|---|
| `POST_NOTIFICATIONS` | The app | Pushes on Android 13+. Asked **once**, when the viewer first shows interest, never at launch. |
| `VIBRATE` | The app | Touch feedback on taps, unlocks and errors (viewers can turn it off). |
| `INTERNET`, `ACCESS_NETWORK_STATE` | Flutter, Firebase, video player | Everything online, and noticing when the connection drops. |
| `WAKE_LOCK`, `FOREGROUND_SERVICE`, `com.google.android.c2dm.permission.RECEIVE` | Firebase Cloud Messaging | Receiving pushes. |
| `com.android.vending.BILLING` | In-app purchases | Coin packs and VIP through Google Play. |
| `com.google.android.gms.permission.AD_ID`, `ACCESS_ADSERVICES_AD_ID`, `ACCESS_ADSERVICES_ATTRIBUTION`, `ACCESS_ADSERVICES_TOPICS` | Google Mobile Ads (AdMob) | Rewarded ads. **Declare "Yes, my app uses advertising ID"** in Play Console. |
| `BIND_GET_INSTALL_REFERRER_SERVICE` | Firebase Analytics | Where an install came from. |

The app asks for **no** camera, location, contacts or storage permission on Android: profile photos are picked through the system's photo picker.

### Other settings already in place

| Setting | Value | Why |
|---|---|---|
| Backup | `allowBackup="false"`, no device-to-device copy | The app's data is a cache of your server's, tied to this install; a new phone signs in instead. |
| Launch mode | `singleTop` | Tapping a push or a link reuses the open app. |
| App links | Two `https` hosts with `autoVerify` | Share and website links open the app ([Deep links](/mobile-app/deep-links/)). |
| Notification defaults | Icon `ic_stat_edrama`, colour `brand_green`, channel `drops` | ([Push notifications](/mobile-app/push-notifications/)) |
| AdMob app ID | `${admobAppId}` from `admob.appId` | Filled in by the build; don't edit the manifest ([Ads setup](/mobile-app/ads-and-purchases/)) |
| Screen protection | `FLAG_SECURE` while the player is open, when `protectScreen` is on | Blocks screenshots and recordings of episodes ([Defaults & limits](/mobile-app/defaults-and-limits/#screen-protection)) |

**You change:** only `android:label` (the name under the icon) and the two link hosts in `build.gradle.kts`.

## iOS

### Versions

| Setting | Value | Where |
|---|---|---|
| Minimum iOS | **15.0** | `ios/Podfile` and the Runner target's deployment target |
| Devices | iPhone and iPad | iPad is supported, so App Store Connect asks for **iPad screenshots** too |

### Info.plist keys

`ios/Runner/Info.plist`:

| Key | Value in the download | Change it? |
|---|---|---|
| `CFBundleDisplayName` | eDrama | **Yes**: the name under the icon |
| `NSPhotoLibraryUsageDescription` | "Choose a photo for your eDrama profile." | **Yes**: name your app |
| `NSCameraUsageDescription` | "Take a photo for your eDrama profile." | **Yes**: name your app |
| `NSUserTrackingUsageDescription` | "This lets eDrama show ads that fit you better…" | **Yes**: name your app. Shown in Apple's tracking prompt ([Ads setup](/mobile-app/ads-and-purchases/#privacy-and-consent)) |
| `GADApplicationIdentifier` | Google's test AdMob app ID | **Yes**: your AdMob iOS app ID |
| `CFBundleURLTypes` › `CFBundleURLSchemes` | Two `YOUR_…` placeholders | **Yes**: from your Firebase files ([Firebase](/mobile-app/firebase/#fill-in-the-ios-url-schemes)) |
| `SKAdNetworkItems` | Google's ad network IDs | No: AdMob needs them to attribute ads |
| `UIBackgroundModes` | `remote-notification` | No: pushes in the background |
| `ITSAppUsesNonExemptEncryption` | `false` | No: the app only uses standard encryption (HTTPS), so App Store Connect doesn't ask the export-compliance question on every build |
| `LSApplicationQueriesSchemes` | `mailto`, `message` | No: lets Help open the email app |
| `NSAppTransportSecurity` › `NSAllowsLocalNetworking` | `true` | No: only allows plain `http` to local addresses while developing; your server must still be `https` |
| `FlutterDeepLinkingEnabled` | `true` | No: links open the right screen |
| `CFBundleShortVersionString`, `CFBundleVersion` | From `pubspec.yaml` | No: change `version:` in `pubspec.yaml` instead ([Release build](/mobile-app/release-build/)) |

### Entitlements and capabilities

`ios/Runner/Runner.entitlements`:

| Entitlement | Value | Change it? |
|---|---|---|
| `com.apple.developer.associated-domains` | `applinks:your-domain.com`, `applinks:www.your-domain.com` | **Yes**: your share host and website host ([Deep links](/mobile-app/deep-links/)) |
| `aps-environment` | `development` | No: Xcode sets `production` for App Store builds |
| `com.apple.developer.applesignin` | `Default` | No: Sign in with Apple |
| `com.apple.developer.devicecheck.appattest-environment` | `production` | No: App Check with App Attest |

Each needs its **capability** on your App ID. With automatic signing, Xcode adds them when you pick your team ([Signing & certificates](/mobile-app/signing/#automatic-signing-recommended)).

## What this means for the store forms

| Store question | Answer for eDrama |
|---|---|
| Google Play › **Advertising ID** | Yes, the app uses it (AdMob). |
| Google Play › **Data safety** and Apple › **App Privacy** | Collected: email or phone number (sign-in), user ID, purchase history, app interactions (watching, likes, comments), crash logs and diagnostics (Crashlytics), device or other IDs (ads, push). Encrypted in transit. Viewers can delete their account in the app. |
| Apple › **Export compliance** | Standard encryption only (already answered by `ITSAppUsesNonExemptEncryption = false`). |
| Apple › **Tracking** | Yes if you show personalised AdMob ads to iPhone viewers who allow tracking; the app shows Apple's prompt first. |

Check these against what you actually turn on (for example, without phone sign-in you don't collect phone numbers), and against your [privacy policy](/admin-panel/settings/legal-and-security/).
