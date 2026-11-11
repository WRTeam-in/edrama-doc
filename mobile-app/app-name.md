---
sidebar_position: 6
title: App name
description: Change the name under the app icon and inside the app.
---

# App name

| Where it shows | Change it in |
|---|---|
| Under the icon on Android | `android:label` in `android/app/src/main/AndroidManifest.xml` |
| Under the icon on iOS | `CFBundleDisplayName` in `ios/Runner/Info.plist`, or **Display Name** in Xcode › Runner › General |
| iOS permission prompts (photo library, camera, ad tracking) | `NSPhotoLibraryUsageDescription`, `NSCameraUsageDescription` and `NSUserTrackingUsageDescription` in `ios/Runner/Info.plist`: each names "eDrama" |
| Splash, Home header and share text | **App name** in Admin Panel › Settings › Branding. `appName` in `lib/app/config/app_config.dart` is used until the app first reaches the server. |
