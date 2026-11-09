---
sidebar_position: 14
title: Release build
description: Sign and build eDrama for Google Play and the App Store.
---

# Release build

## Before you build

- [App settings](./app-settings.md) point at your server.
- Your own [package name](./package-name.md), [Firebase files](./firebase.md) and [AdMob app IDs](./ads-and-purchases.md).
- `version:` in `pubspec.yaml` raised for every release, such as `1.0.1+2`. The number after `+` must go up each time.
- In Admin Panel › Settings › App & support, the **Latest** version and the **Store link**.

## Android signing

<Steps>
<Step title="Create an upload key">

```bash
keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

Keep the file and its passwords safe: you need them for every update.

</Step>
<Step title="Create android/key.properties">

```ini title="android/key.properties"
storePassword=your-store-password
keyPassword=your-key-password
keyAlias=upload
storeFile=/full/path/to/upload-keystore.jks
```

`android/app/build.gradle.kts` reads this file. **Without it, release builds are signed with the debug key**, which Google Play refuses.

</Step>
</Steps>

## Build

The project includes a script that builds with obfuscation and keeps the debug symbols in `build/debug-info`:

```bash
tool/build_release.sh appbundle   # Google Play (.aab)
tool/build_release.sh ipa         # App Store
tool/build_release.sh apk         # a release APK
```

Or with plain Flutter: `flutter build appbundle` and `flutter build ipa`.

## Publish

Store listings, screenshots, review and release: **[common guide › Play Store](https://wrteam-in.github.io/common_app_doc/GeneralSettings/deployment/playstore)** and **[App Store](https://wrteam-in.github.io/common_app_doc/GeneralSettings/deployment/appstore)**.

After the first Play release, copy the **App signing key** SHA-256 from Play Console › App integrity into the backend's `EDRAMA_ANDROID_SHA256` ([Share links](/admin-panel/share-links/)) and into Firebase.
