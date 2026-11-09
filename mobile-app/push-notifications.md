---
sidebar_position: 13
title: Push notifications
description: Set up Firebase Cloud Messaging for Android and iOS.
---

# Push notifications

Pushes go from your server through **Firebase Cloud Messaging**.

<Steps>
<Step title="Set up FCM and APNs">

Follow **[common guide › Notifications](https://wrteam-in.github.io/common_app_doc/GeneralSettings/notifications)**: `google-services.json` for Android, and for iOS the Push Notifications and Background Modes capabilities and an APNs key (`.p8`) uploaded to Firebase.

</Step>
<Step title="Add the Firebase keys to the Admin Panel">

**Project ID** and **Service account JSON** in Settings › Notifications ([guide](/admin-panel/settings/firebase-and-notifications/)).

</Step>
<Step title="Make sure the background jobs run">

Pushes are sent by the [queue](/admin-panel/background-jobs/).

</Step>
</Steps>

## Android channels

The app sorts notifications into channels, so viewers can mute one kind in Android's settings:

| Channel | Name |
|---|---|
| `drops` | New episodes |
| `account` | Account & purchases |
| `offers` | Offers |
| `quiet` | Quiet hours (silent) |

The small icon and its colour are in [Logo, icons and splash](./logo-and-icons.md#the-notification-icon-android).

## Check it worked

Admin Panel › Audience › **Push**: send a push to every viewer or to one title's followers. It arrives in the app's inbox too.
