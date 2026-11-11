---
sidebar_position: 5
title: Package name
description: Give the app your own application ID and bundle ID, and update everything that uses it.
---

# Package name

The app ships with the placeholder `com.example.edrama`. Use your own, such as `com.yourcompany.yourapp`, before you set up Firebase or the stores: those are tied to it.

Why it matters and how to pick one: **[common guide › Package name](https://wrteam-in.github.io/common_app_doc/GeneralSettings/packagename)**.

## In the app

| Where | What to change |
|---|---|
| `android/app/build.gradle.kts` | `namespace` and `applicationId` |
| `android/app/src/main/kotlin/com/example/edrama/MainActivity.kt` | Move it to folders matching your package (`kotlin/com/yourcompany/yourapp/`) and change its `package` line |
| Xcode (open `ios/Runner.xcworkspace`) › Runner › **Signing & Capabilities** | **Bundle Identifier** (`PRODUCT_BUNDLE_IDENTIFIER`), and your own **Team** (the download has none). The RunnerTests target uses `com.example.edrama.RunnerTests`: change it to match. |
| `lib/app/config/app_config.dart` | `appId` |

The automatic way, from the common guide:

```bash
dart pub add --dev change_app_package_name
dart run change_app_package_name:main com.yourcompany.yourapp
```

Check the places above afterwards, and set `appId` yourself.

With automatic signing, Xcode registers the capabilities the app already uses for your new App ID: Push Notifications, Sign in with Apple, Associated Domains and App Attest.

## Everywhere else that uses it

- **Firebase**: add apps with the new IDs and run `flutterfire configure` again ([Firebase](./firebase.md)).
- **Admin Panel** › Settings › Payments: **Package name** on the Google Play card and **Bundle ID** on the App Store card ([Payments](/admin-panel/settings/payments/)).
- **Backend `.env`**: `EDRAMA_ANDROID_PACKAGE` (your application ID) and `EDRAMA_IOS_APP_ID` (your Apple Team ID, a dot, then your bundle ID, such as `ABCDE12345.com.yourcompany.yourapp`) ([Share links](/admin-panel/share-links/)).
