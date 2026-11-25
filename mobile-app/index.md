---
sidebar_position: 1
title: Mobile App
description: Set up, re-brand and release the eDrama Flutter app for Android and iOS.
---

# Mobile App

Thank you for purchasing **eDrama**. This section shows you how to set up the Flutter app, point it at your server, re-brand it and release it to Google Play and the App Store.

<DocBanner />

The viewer app is a **Flutter** project: one codebase that builds both the Android and the iOS app. You set it up on your own computer, point it at your server, give it your name and look, and build the release files you upload to Google Play and the App Store.

## Contact

**By:** WRTeam
**App support:** Aayush Thacker, [wrteam.aayush@gmail.com](mailto:wrteam.aayush@gmail.com)
All contacts are on the [Support](/support/) page.

## What you need

- **Flutter 3.47.7** and its tools (Android Studio or VS Code; Xcode on a Mac for iOS).
- Your [Admin Panel installed](/admin-panel/installation/), because the app gets its catalogue, prices and texts from it.
- A **Firebase** project, a **Google Play** developer account and an **Apple Developer** account.

The app runs on **Android 7.0 and newer** and **iOS 15 and newer**.

### On your computer

| Tool | Version | Why |
|---|---|---|
| **Flutter** | **3.47.7** exactly (the project pins it in `.fvmrc`) | Builds the app. |
| **Dart** | 3.13 or newer (comes with Flutter) | Flutter's language. |
| **Android Studio** | A recent version | Android SDK, emulator and signing tools. |
| **Java (JDK)** | 17 or newer | Needed by Android's build tools. |
| **Xcode** | A recent version, on a Mac | Only for the iOS app. |
| **CocoaPods** | A recent version, on a Mac | Installs iOS libraries. |
| **Firebase CLI** and **FlutterFire CLI** | Latest | Connect the app to your Firebase project ([Firebase](/mobile-app/firebase/)). |

The app runs on **Android 7.0 and newer** and **iOS 15 and newer**, on phones and tablets. Installing and checking these tools step by step: [Set up Flutter](/mobile-app/setup-flutter/).

:::tip[Use FVM to get the exact Flutter version]
[FVM](https://fvm.app/) (Flutter Version Management) reads `.fvmrc` and installs the matching Flutter for this project only: `fvm install` then use `fvm flutter` instead of `flutter`. Using a different Flutter version is the most common cause of build errors.
:::

:::info
Setting up Flutter, Android Studio and Xcode on your computer is done once and follows the official guides: [Flutter install](https://docs.flutter.dev/get-started/install), [Android Studio](https://developer.android.com/studio), [Xcode](https://developer.apple.com/xcode/).
:::

## What's in the download

The app comes as `edrama-app-<version>.zip`. It leaves out everything tied to WRTeam's own accounts, so a few things must be filled in **before the first build**. The project's own `FIRST_BUILD.md` lists the same steps in short.

| In the download | What it means | Fix it in |
|---|---|---|
| Package name `com.example.edrama` | A placeholder application ID and bundle ID | [Name & package name](/mobile-app/package-name/) |
| No Firebase files | The Android build stops and the app won't start until you generate them | [Firebase](/mobile-app/firebase/) |
| `YOUR_…` URL schemes in `Info.plist` | Google and phone sign-in on iPhone can't return to the app | [Firebase](/mobile-app/firebase/#fill-in-the-ios-url-schemes) |
| Server `https://your-domain.com/api/v1/` | A placeholder: the app loads nothing until it's your server | [Connect to your server](/mobile-app/app-settings/) |
| Link hosts `your-domain.com` and `www.your-domain.com` | Share and website links can't open the app | [Deep links](/mobile-app/deep-links/) |
| Google's **test** AdMob app IDs | Every build shows test ads and earns nothing | [Ads setup](/mobile-app/ads-and-purchases/) |
| `android/key.properties.example`, no keystore and no Apple team | Release builds can't be signed for the stores yet | [Release build](/mobile-app/release-build/) |


## Our guides and the common guides

Steps that are the same for every Flutter app (installing Flutter, creating a Firebase project, AdMob and store accounts, publishing) are in WRTeam's **[common app guide](https://wrteam-in.github.io/common_app_doc/)**. These pages link to it and add what is specific to eDrama.

<CommonGuide title="Common app guide" text="Steps that are the same for every WRTeam Flutter app (installing Flutter, Firebase, AdMob, in-app purchases, store accounts and publishing), with screenshots. These pages add everything specific to eDrama, and link to the matching common-guide page on each topic." />

## Set it up in this order

<Steps>

1. **[Set up Flutter](/mobile-app/setup-flutter/)** and the Android and iOS tools on your computer.
2. **[Give it your package name](/mobile-app/package-name/)** first: Firebase and the stores are tied to it.
3. **[Connect Firebase](/mobile-app/firebase/)**: the app doesn't build or start without its files.
4. **[Connect it to your server](/mobile-app/app-settings/)** by changing two addresses, then **[run it](/mobile-app/run-the-app/)** on an emulator or your phone.
5. **Make it yours:** [name](/mobile-app/package-name/), [logo and icons](/mobile-app/logo-and-icons/), [colours and fonts](/mobile-app/colours-and-fonts/), [defaults](/mobile-app/defaults-and-limits/) and [languages](/mobile-app/languages/).
6. **Connect services:** [push notifications](/mobile-app/push-notifications/), [ads](/mobile-app/ads-and-purchases/), [in-app purchases](/mobile-app/ads-and-purchases/#in-app-purchases) and [share links](/mobile-app/deep-links/).
7. **Get ready to release:** check the [permissions and platform settings](/mobile-app/permissions/), set up [signing and certificates](/mobile-app/signing/), and [build the release](/mobile-app/release-build/).
8. **[Publish to the stores](/mobile-app/publishing/)**, then tell your server about the new version.

</Steps>

## Each topic, here and in the common guide

| Topic | eDrama guide | WRTeam common app guide |
|---|---|---|
| Flutter, Java and IDE | [Set up Flutter](/mobile-app/setup-flutter/) | [Flutter and Java JDK setup](https://wrteam-in.github.io/common_app_doc/GeneralSettings/basicsetup) |
| Package name | [Name & package name](/mobile-app/package-name/) | [Package name](https://wrteam-in.github.io/common_app_doc/GeneralSettings/packagename) |
| Firebase | [Firebase](/mobile-app/firebase/) | [Firebase setup](https://wrteam-in.github.io/common_app_doc/GeneralSettings/firebase), [Firebase billing](https://wrteam-in.github.io/common_app_doc/GeneralSettings/firebase-billing) |
| App icon | [Logo & icons](/mobile-app/logo-and-icons/) | [App icon](https://wrteam-in.github.io/common_app_doc/GeneralSettings/appicon) |
| Push notifications | [Push notifications](/mobile-app/push-notifications/) | [Notifications](https://wrteam-in.github.io/common_app_doc/GeneralSettings/notifications) |
| AdMob | [Ads setup](/mobile-app/ads-and-purchases/) | [Google AdMob](https://wrteam-in.github.io/common_app_doc/GeneralSettings/advertisement/google-admob) |
| In-app purchases | [In-app purchases](/mobile-app/ads-and-purchases/#in-app-purchases) | [In-app purchases](https://wrteam-in.github.io/common_app_doc/GeneralSettings/iap) |
| Share links | [Deep links](/mobile-app/deep-links/) | Use eDrama's page: its link setup is its own. |
| Signing | [Signing & certificates](/mobile-app/signing/) | [Android developer verification](https://wrteam-in.github.io/common_app_doc/GeneralSettings/deployment/android-developer-verification) |
| Publishing | [Publish to the stores](/mobile-app/publishing/) | [Play Store](https://wrteam-in.github.io/common_app_doc/GeneralSettings/deployment/playstore), [App Store](https://wrteam-in.github.io/common_app_doc/GeneralSettings/deployment/appstore) |

## Every file you'll change

The project keeps everything a rebrand touches in a handful of files, each marked **Reskin here** at the top. You don't need to edit any screen code.

| To change | Edit |
|---|---|
| App name, server address, share domain, default theme and accent, sign-in methods, screen protection | `lib/app/config/app_config.dart` |
| Firebase keys | `lib/app/config/firebase_options.dart` (generated), `android/app/google-services.json`, `ios/Runner/GoogleService-Info.plist` |
| Colours | `lib/core/theme/theme_colors.dart` |
| Fonts | `AppFonts` in `lib/core/theme/app_typography.dart`, and `fonts:` in `pubspec.yaml` |
| Defaults and limits | `lib/core/constants/constant.dart` |
| Logo, coin, VIP badge, company logo | The files in `assets/branding/` (keep the same names) |
| App icon | The files in `assets/branding/launcher/`, then `dart run flutter_launcher_icons` |
| Icons | `lib/core/constants/app_icons.dart` |
| API paths | `lib/core/network/api_endpoints.dart` (only if your server's differ) |
| English text | `assets/l10n/template.json` |
| Name under the icon | `android/app/src/main/AndroidManifest.xml`, `ios/Runner/Info.plist` |
| Package name / bundle ID | `android/app/build.gradle.kts`, the `MainActivity.kt` folder, Xcode |
| Share and website link domains | `android/app/build.gradle.kts`, `ios/Runner/Runner.entitlements` |
| AdMob app IDs | `android/local.properties` or `android/key.properties`, `ios/Runner/Info.plist` |

Prices, coin amounts, ad limits, VIP plans, feature switches and every language except English are **not** in the app: they come from your Admin Panel, so you change them without releasing a new version.
