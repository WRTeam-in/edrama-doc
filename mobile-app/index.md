---
sidebar_position: 1
title: Mobile App
description: Set up, re-brand and release the eDrama Flutter app for Android and iOS.
---

# Mobile App

Thank you for purchasing **eDrama**. This section shows you how to set up the Flutter app, point it at your server, re-brand it and release it to Google Play and the App Store.

<DocBanner />

## Contact

**By:** WRTeam
**App support:** Aayush Thacker, [wrteam.aayush@gmail.com](mailto:wrteam.aayush@gmail.com)
All contacts are on the [Support](/support/) page.

## What you need

- **Flutter 3.47.7** and its tools (Android Studio or VS Code; Xcode on a Mac for iOS).
- Your [Admin Panel installed](/admin-panel/installation/), because the app gets its catalogue, prices and texts from it.
- A **Firebase** project, a **Google Play** developer account and an **Apple Developer** account.

The app runs on **Android 7.0 and newer** and **iOS 15 and newer**.

## Our guides and the common guides

Steps that are the same for every Flutter app (installing Flutter, creating a Firebase project, AdMob and store accounts, publishing) are in WRTeam's **[common app guide](https://wrteam-in.github.io/common_app_doc/)**. These pages link to it and add what is specific to eDrama.

## Set it up in this order

The download leaves out everything tied to WRTeam's accounts: it has placeholder IDs (`com.example.edrama`, `your-domain.com`), Google's test AdMob IDs and no Firebase files. The app's `FIRST_BUILD.md` lists the same steps in short.

<Steps>
<Step title="Set up Flutter">

[Set up Flutter](./setup-flutter.md).

</Step>
<Step title="Give it your package name">

[Package name](./package-name.md). Do this first: Firebase and the stores are tied to it.

</Step>
<Step title="Connect Firebase and your server, then run it">

[Firebase](./firebase.md) (the app doesn't build without its files) and [App settings](./app-settings.md) (your Admin Panel's API address and share domain), then [run it](./run-the-app.md).

</Step>
<Step title="Make it yours">

[App name](./app-name.md), [logo and icons](./logo-and-icons.md), [colours and fonts](./colours-and-fonts.md), [languages](./languages.md).

</Step>
<Step title="Connect the services">

[Ads and purchases](./ads-and-purchases.md), [VIP subscriptions](./vip-subscriptions.md), [deep links](./deep-links.md) and [push notifications](./push-notifications.md).

</Step>
<Step title="Release it">

[Release build](./release-build.md).

</Step>
</Steps>
