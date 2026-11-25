---
sidebar_position: 5
title: Package name
description: Give the app your own application ID and bundle ID, and update everything that uses it.
---

# Package name

The app ships with the placeholder `com.example.edrama`. Use your own, such as `com.yourcompany.yourapp`, before you set up Firebase or the stores: those are tied to it.

Your app needs its own **package name** (on iOS, **bundle ID**): a unique identifier such as `com.yourcompany.drama` that the stores use to tell your app apart from every other app. Choose it carefully: **it can't change once the app is published.**

<CommonGuide to="GeneralSettings/packagename" title="Package name" text="Why the package name matters, how to pick one, and changing it in a Flutter project." />

<Anchor id="in-the-app" />

## In the app

<Tabs>
<TabItem value="android" label="Android">

<Steps>

1. Open `android/app/build.gradle.kts` and change **both** `namespace` and `applicationId`:

   ```kotlin title="android/app/build.gradle.kts"
   namespace = "com.yourcompany.drama"
   // …
   applicationId = "com.yourcompany.drama"
   ```

2. Move `MainActivity.kt` to match: in the download it lives in `android/app/src/main/kotlin/com/example/edrama/`. Create the folders `com/yourcompany/drama/`, move the file there, delete the old folders, and change its first line to `package com.yourcompany.drama`.

</Steps>

</TabItem>
<TabItem value="ios" label="iOS">

<Steps>

1. Open `ios/Runner.xcworkspace` in Xcode.
2. Select **Runner** › **Signing & Capabilities** and change **Bundle Identifier** (this sets `PRODUCT_BUNDLE_IDENTIFIER`) for every build configuration.
3. Choose your Apple **Team** for signing. The download has none, so iOS builds fail until you pick one.
4. The **RunnerTests** target uses `com.example.edrama.RunnerTests`: change it to match, such as `com.yourcompany.drama.RunnerTests`.

With automatic signing, Xcode registers the capabilities the app already uses for your new App ID: Push Notifications, Sign in with Apple, Associated Domains and App Attest.

</Steps>

</TabItem>
</Tabs>

Then update the same value in `app_config.dart`. YouTube's embedded player requires it as the referrer:

```dart title="lib/app/config/app_config.dart"
static const String appId = 'com.yourcompany.drama';
```

:::tip[Or rename it automatically]
The `change_app_package_name` tool renames the Android and iOS IDs and moves the Kotlin folder in one go:

```bash title="Terminal, in the app folder"
dart pub add --dev change_app_package_name
dart run change_app_package_name:main com.yourcompany.drama
```

Check the places above afterwards, and set `appId` in `app_config.dart` yourself: the tool doesn't touch it.
:::

<Anchor id="everywhere-else-that-uses-it" />

## Everywhere else that uses it

Everything else that uses the package name:

| Where | What to set |
|---|---|
| **Firebase** | Add apps with the **new** IDs and run `flutterfire configure` again ([Firebase](/mobile-app/firebase/)). Do this step first, Firebase second. |
| **Admin Panel** | In <Path>Settings › Payments</Path>: **Package name** on the Google Play card, and **Bundle ID** on the App Store card ([Google Play](/admin-panel/settings/payments/#google-play-keys), [App Store](/admin-panel/settings/payments/#app-store-keys)). |
| **Server `.env`** | `EDRAMA_ANDROID_PACKAGE` (your application ID) and `EDRAMA_IOS_APP_ID` (your Apple Team ID, a dot, then your bundle ID, such as `ABCDE12345.com.yourcompany.drama`) ([Deep links](/mobile-app/deep-links/)). |
