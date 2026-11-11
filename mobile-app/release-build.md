---
sidebar_position: 14
title: Release build
description: Sign and build eDrama for Google Play and the App Store.
---

# Release build

## Before you build

- [App settings](./app-settings.md) point at your server.
- Your own [package name](./package-name.md), [Firebase files](./firebase.md) and [AdMob app IDs](./ads-and-purchases.md#admob-rewarded-ads) (`admob.appId` and `GADApplicationIdentifier`). Without them, the store build shows Google's test ads.
- Your own `shareHost`, `websiteHost` and `applinks:` domains ([Deep links](./deep-links.md)).
- `version:` in `pubspec.yaml` raised for every release, such as `1.0.1+2`. The number after `+` must go up each time.
- In Admin Panel › Settings › App & support, the **Latest** version and the **Store link**.

## Android signing

<Steps>
<Step title="Create an upload key">

From the project folder:

```bash
keytool -genkey -v -keystore android/app/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

Keep the file and its passwords safe, with a backup: you need them for every update.

</Step>
<Step title="Create android/key.properties">

Copy `android/key.properties.example` to `android/key.properties` and fill it in:

```ini title="android/key.properties"
storePassword=your-store-password
keyPassword=your-key-password
keyAlias=upload
storeFile=upload-keystore.jks
admob.appId=ca-app-pub-1234567890123456~1234567890
```

`storeFile` is read from the `android/app/` folder; a full path works too. `android/app/build.gradle.kts` reads this file. **Without it, release builds are signed with the debug key**, which Google Play refuses.

</Step>
</Steps>

:::caution Keep the key out of Git
The download's `.gitignore` files don't exclude `android/key.properties` or `*.jks`. If you keep the code in Git, add both to `android/.gitignore` before your first commit.
:::

## iOS signing

Open `ios/Runner.xcworkspace` in Xcode, select **Runner** › **Signing & Capabilities** and pick your **Team** for the Release configuration. The download has none, so `flutter build ipa` fails until you do.

## Build

The project includes a script that builds with obfuscation and keeps the debug symbols in `build/debug-info`:

```bash
tool/build_release.sh appbundle   # Google Play (.aab)
tool/build_release.sh ipa         # App Store
tool/build_release.sh apk         # a release APK
```

Or with plain Flutter: `flutter build appbundle` and `flutter build ipa`.

Keep `build/debug-info` for each release you ship: Dart stack traces from an obfuscated build are only readable with it. To see them in Crashlytics, upload it with the Firebase CLI:

```bash
firebase crashlytics:symbols:upload --app=<your Firebase app ID> build/debug-info
```

## Publish

Store listings, screenshots, review and release: **[common guide › Play Store](https://wrteam-in.github.io/common_app_doc/GeneralSettings/deployment/playstore)** and **[App Store](https://wrteam-in.github.io/common_app_doc/GeneralSettings/deployment/appstore)**.

After the first Play release, copy the **App signing key** SHA-256 from Play Console › App integrity into the backend's `EDRAMA_ANDROID_SHA256`, after your upload key's and separated by a comma ([Share links](/admin-panel/share-links/)), and add it to your Android app in Firebase.
