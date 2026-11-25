---
sidebar_position: 6
title: App name
description: Change the name under the app icon and inside the app.
---

# App name

There are three places, because the platforms read the name under the icon before the app starts:

| Where | File | Setting |
|---|---|---|
| Inside the app (splash, Home header, share text) until the server sends its own | `lib/app/config/app_config.dart` | `appName` |
| Under the icon on Android | `android/app/src/main/AndroidManifest.xml` | `android:label="eDrama"` |
| Under the icon on iOS | `ios/Runner/Info.plist` | `CFBundleDisplayName` (or **Display Name** in Xcode › Runner › General) |
| iOS permission prompts (photo library, camera, ad tracking) | `ios/Runner/Info.plist` | `NSPhotoLibraryUsageDescription`, `NSCameraUsageDescription` and `NSUserTrackingUsageDescription`: each sentence names "eDrama", so change it to your app's name |

```dart title="lib/app/config/app_config.dart"
static const String appName = 'eDrama';
static const String companyName = 'WRTeam';
```

`companyName` is read out for the company logo at the bottom of the splash screen.

:::tip
Inside the app, the name from <Path>Settings › Branding › App name</Path> wins once the server answers, so keep both the same.
:::

To change the package name (application ID and bundle ID) too, see [Package name](/mobile-app/package-name/).
