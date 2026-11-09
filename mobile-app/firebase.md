---
sidebar_position: 10
title: Firebase
description: Connect the app to your Firebase project for sign-in, push, analytics, crash reports and App Check.
---

# Firebase

The app uses Firebase for **sign-in** (Authentication), **push notifications** (Cloud Messaging), **Analytics**, **Crashlytics** and **App Check**. Use **one Firebase project** for the app, the Admin Panel and the Creator Portal.

## Create the project and connect the app

Follow the common guide to create the project, install the Firebase CLI and run `flutterfire configure`:

👉 **[Common guide › Firebase setup](https://wrteam-in.github.io/common_app_doc/GeneralSettings/firebase)**

In eDrama, `flutterfire configure` writes three files. Replace the ones that ship with the app:

| File | Platform |
|---|---|
| `lib/app/config/firebase_options.dart` | Both |
| `android/app/google-services.json` | Android |
| `ios/Runner/GoogleService-Info.plist` | iOS |

Run it from the project folder after you [change the package name](./package-name.md).

## Turn on the sign-in methods

Firebase console › **Authentication** › **Sign-in method**:

| Provider | Used for |
|---|---|
| **Anonymous** | Guest mode: viewers watch before signing in. **Required.** |
| **Google** | Sign in with Google |
| **Apple** | Sign in with Apple (needed on iOS when Google is offered) |
| **Phone** | Phone sign-in. Needs the Blaze plan: [common guide › Firebase billing](https://wrteam-in.github.io/common_app_doc/GeneralSettings/firebase-billing). |
| **Email/Password** | Email sign-in, with a verified address |

Turn off any method you don't use in `app_config.dart` (`signInWithGoogle`, `signInWithApple`, `signInWithPhone`, `signInWithEmail`). Phone sign-in also follows the **Phone sign-in** switch in Admin Panel › Settings › App & support.

For Google sign-in on Android, add your app's **SHA-1** and **SHA-256** fingerprints (debug, upload and Play App Signing keys) in Firebase › Project settings › your Android app, then download `google-services.json` again.

## Connect the Admin Panel

Add the **Project ID**, **Service account JSON**, **Web API key** and **Auth domain** in Admin Panel › Settings › Notifications: [Firebase and notifications](/admin-panel/settings/firebase-and-notifications/).

## App Check

App Check proves requests come from your real app. The app uses **Play Integrity** on Android and **App Attest** (with DeviceCheck as a fallback) on iOS in release builds, and the debug providers in debug builds.

<Steps>
<Step title="Register the apps">

Firebase console › **App Check** › **Apps**: register the Android app with **Play Integrity** and the iOS app with **App Attest**.

</Step>
<Step title="Add debug tokens for testing">

A debug build prints a debug token in its log on first run. Add it in App Check › your app › **Manage debug tokens**.

</Step>
<Step title="Turn it on in the backend">

In the backend's `.env`, start with `EDRAMA_APP_CHECK=monitor` (requests without a valid token are only logged). When your released app works, switch to `enforce`, then run `php artisan config:clear`.

</Step>
</Steps>

:::caution
Don't use `enforce` until the release build from the store passes App Check, or older builds and test devices will be refused.
:::
