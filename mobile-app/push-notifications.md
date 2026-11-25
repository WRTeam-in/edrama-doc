---
sidebar_position: 13
title: Push notifications
description: Set up Firebase Cloud Messaging for Android and iOS.
---

# Push notifications

Pushes go from **your server** through **Firebase Cloud Messaging (FCM)** to the phone. On iPhone, FCM hands them to Apple's **APNs**. The app's code is already complete: you only connect the accounts.

<CommonGuide to="GeneralSettings/notifications" title="Notifications (FCM)" text="Firebase Cloud Messaging for a WRTeam Flutter app, with screenshots of the Firebase and Xcode screens." />

<Flow
  steps={[
    {label: 'Admin Panel', note: 'Push, drop alerts, replies'},
    {label: 'Your server', note: 'Queue, daily cap, quiet hours'},
    {label: 'Firebase Cloud Messaging'},
    {label: 'APNs', note: 'iPhone only'},
    {label: 'The phone', tone: 'live'},
  ]}
/>

## Before you start

- [Firebase is connected](/mobile-app/firebase/): `flutterfire configure` has made `google-services.json` and `GoogleService-Info.plist`.
- Your server's [queue runs](/admin-panel/background-jobs/): pushes are sent from it.

## Android

Nothing to add in the app: `google-services.json` is enough. What's already set up:

| Already in the project | Where |
|---|---|
| The **notification permission** (`POST_NOTIFICATIONS`). On Android 13 and newer it's asked **once**, when the viewer first shows interest (such as following a series), never at launch. | `AndroidManifest.xml`, `push_service.dart` |
| The **small icon** (white mark on transparent) and its **tint** colour | `drawable-*/ic_stat_edrama.png`, `brand_green` in `values/brand_colors.xml` ([Logo & icons](/mobile-app/logo-and-icons/)) |
| The **default channel** for messages without one: `drops` | `AndroidManifest.xml` |

<Anchor id="android-channels" />

The app sorts notifications into four **channels**, so viewers can mute one kind in Android's settings without missing the rest:

| Channel ID | Name viewers see in Android's settings |
|---|---|
| `drops` | New episodes |
| `account` | Account & purchases |
| `offers` | Offers |
| `quiet` | Quiet hours (low importance, silent) |

## iOS

iPhones only receive pushes through Apple, so Firebase needs an **APNs key** from your Apple Developer account.

<Steps>

1. **Create the APNs key.** [Apple Developer › Certificates, Identifiers & Profiles › Keys](https://developer.apple.com/account/resources/authkeys/list) › **+**: give it a name, tick **Apple Push Notifications service (APNs)**, **Continue**, **Register**, then **Download** the `.p8` file. Apple lets you download it **once**: keep it safe. Note its **Key ID**, and your **Team ID** (top right of the developer site).
2. **Upload it to Firebase.** Firebase console › **Project settings › Cloud Messaging** › **Apple app configuration** › your iOS app › **APNs Authentication Key** › **Upload**: the `.p8` file, its Key ID and your Team ID. One key works for both development and production builds.
3. **Check the capabilities in Xcode.** Open `ios/Runner.xcworkspace` › **Runner** › **Signing & Capabilities**. The project already has **Push Notifications** and **Background Modes › Remote notifications**; with automatic signing, Xcode adds them to your App ID. If either is missing, add it with **+ Capability**.

</Steps>

On iPhone the system asks the viewer for permission the same way: once, when they first show interest, never at launch.

:::info[Development and production]
`aps-environment` in `Runner.entitlements` says `development`. Xcode switches it to `production` by itself when you archive for the App Store or TestFlight, so you don't edit it.
:::

## Connect your server

Your server sends every push, so it needs the same Firebase project's keys:

<Steps>

1. Firebase console › **Project settings › General**: copy the **Project ID**.
2. **Project settings › Service accounts › Generate new private key**: a JSON file downloads.
3. Admin Panel › <Path>Settings › Notifications</Path> › **Firebase** card: enter the **Project ID** and paste the whole **Service account JSON**. **Save**, then **Test connection**: it checks the key with FCM without sending anything.

</Steps>

On the same page you set the **push limits** (at most 3 a day per viewer to start, quiet hours 23:00 to 08:00 in each viewer's own time), the wording of the automatic notifications in each language, and **system alerts** ([Notifications](/admin-panel/settings/firebase-and-notifications/)).

<Anchor id="check-it-worked" />

## Send a test push

<Steps>

1. Install the app on a **real phone** and sign in with the **same email** as your Admin Panel account. Allow notifications when asked (follow a series to be asked).
2. Admin Panel › <Path>Audience › Push</Path> › **New push** › **Test send**. It says *Test sent to N of your devices*.
3. The push arrives on the phone, and in the app's inbox.

</Steps>

## How viewers get pushes

- At start the app registers the phone's FCM token with your server (`POST /api/v1/devices`). A token that changes is sent again by itself.
- **Drop alerts** (new episodes of followed series), **replies** to comments, **new series** from followed creators and **VIP renewal reminders** are sent automatically. You send others from <Path>Audience › Push</Path> ([Push](/admin-panel/using/audience/push/)).
- Each viewer gets at most the daily cap; the rest wait for the next day. Pushes due in quiet hours wait until they end. The in-app **inbox** still gets every message.
- Viewers choose which kinds they get in the app's <Path panel="app">Me › Settings › Notifications</Path>.

## If pushes don't arrive

| Symptom | Check |
|---|---|
| **Test connection** fails | The Project ID and the service account JSON are from the same Firebase project as the app's files. |
| Nothing arrives anywhere | The queue isn't running ([Cron & queues](/admin-panel/background-jobs/)); look for failed jobs on <Path>System › System</Path>. |
| Android works, iPhone doesn't | The APNs key isn't uploaded in Firebase, or **Push Notifications** is missing in Xcode. Test on a real iPhone. |
| "Test sent to 0 of your devices" | The app on your phone isn't signed in with your Admin Panel email, or notifications are off for it. |
| Some viewers get fewer pushes | The daily cap and quiet hours are working as designed ([Notifications](/admin-panel/settings/firebase-and-notifications/)). |
