---
sidebar_position: 13.7
title: "App signing, keystore and certificates"
sidebar_label: "Signing & certificates"
description: "Create your Android upload keystore, understand Play App Signing and fingerprints, and set up iOS signing, certificates, capabilities and the keys your services need."
---

Every store build is **signed**: the stores use the signature to prove an update comes from you. This page sets up signing once for Android and iOS, and lists every key and certificate eDrama's services need.

:::danger[Keep your keys forever]
Your Android **upload keystore** and its passwords, and Apple's `.p8` keys, can't be downloaded again. Store them in a password manager and keep an off-site backup. Never commit them to Git or send them by email.
:::

## Android

### Two keys: upload key and app signing key

| Key | Who holds it | What it signs |
|---|---|---|
| **Upload key** | You (`upload-keystore.jks`) | Every `.aab` you upload to Play Console |
| **App signing key** | Google (**Play App Signing**, on by default for new apps) | The app Google delivers to phones |

If you lose the upload key, Play Console support can reset it. The app signing key never leaves Google.

### Create the upload keystore

<Steps>

1. Create the keystore once, from the app folder:

   ```bash title="Terminal, in the app folder"
   keytool -genkey -v -keystore android/app/upload-keystore.jks \
     -keyalg RSA -keysize 2048 -validity 10000 -alias upload
   ```

   It asks for a **keystore password**, your name and organisation, and a **key password** (pressing Enter reuses the keystore password).

2. Copy `android/key.properties.example` to `android/key.properties` and fill it in:

   ```properties title="android/key.properties"
   storePassword=your-store-password
   keyPassword=your-key-password
   keyAlias=upload
   storeFile=upload-keystore.jks
   admob.appId=ca-app-pub-1234567890123456~1234567890
   ```

   `storeFile` is read from `android/app/` when it's a plain file name; a full path works too. `admob.appId` is your AdMob app ID ([Ads setup](/mobile-app/ads-and-purchases/)).

3. Build a release ([Release build](/mobile-app/release-build/)). `android/app/build.gradle.kts` reads `key.properties` by itself. **Without it, the release falls back to the debug key**, which Google Play refuses.

</Steps>

The download's `android/.gitignore` already leaves out `key.properties`, `*.jks` and `*.keystore`.

### Certificate fingerprints (SHA-1 and SHA-256)

Firebase and your server identify your app by its signing **fingerprints**. There are three you may need:

| Fingerprint | How to get it | Used by |
|---|---|---|
| **Debug key** | `keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android` | Firebase (Google sign-in in debug builds) |
| **Upload key** | `keytool -list -v -keystore android/app/upload-keystore.jks -alias upload` | Firebase; `EDRAMA_ANDROID_SHA256` (release builds installed outside Play) |
| **App signing key** | Play Console › **Test and release › App integrity › App signing** | Firebase (Google sign-in for Play installs); `EDRAMA_ANDROID_SHA256` (share links) |

Or list the debug and release fingerprints in one go:

```bash title="Terminal, in the app folder"
cd android
./gradlew signingReport     # gradlew.bat signingReport on Windows
```

Where each goes:

- **Firebase** › Project settings › your Android app › **Add fingerprint**: the SHA-1 **and** SHA-256 of all three. Then download `google-services.json` again (or re-run `flutterfire configure`). Without them, **Continue with Google** fails.
- **Server** `.env` › `EDRAMA_ANDROID_SHA256`: the SHA-256 of the app signing key and the upload key, comma-separated, so share links open the app ([Deep links](/mobile-app/deep-links/)).

### Android developer verification

Google now asks developers to **register each package name and its signing key** in Play Console before an app can be installed on certified Android devices, by uploading a signed APK that proves you own the key.

<CommonGuide to="GeneralSettings/deployment/android-developer-verification" title="Android developer verification" text="Register your package name and signing key in Play Console, for a new or an existing package name." />

## iOS

### What you need

- An [Apple Developer Program](https://developer.apple.com/programs/) membership (yearly). Your **Team ID** is shown at the top right of the developer site.
- Xcode signed in with that Apple ID: Xcode › Settings › **Accounts**.

### Automatic signing (recommended)

<Steps>

1. Open `ios/Runner.xcworkspace` › **Runner** target › **Signing & Capabilities**.
2. Tick **Automatically manage signing** and pick your **Team** (for **Debug**, **Profile** and **Release**). The download has none.
3. Set your **Bundle Identifier** ([Name & package name](/mobile-app/package-name/)).

</Steps>

Xcode then registers the **App ID** with the capabilities the project already uses, and creates the **certificates** and **provisioning profiles** for you:

| Capability | Why eDrama needs it |
|---|---|
| **Push Notifications** | Pushes through APNs ([Push notifications](/mobile-app/push-notifications/)) |
| **Background Modes › Remote notifications** | Handling pushes in the background |
| **Sign in with Apple** | "Continue with Apple" |
| **Associated Domains** | Share and website links open the app (`applinks:` entries, [Deep links](/mobile-app/deep-links/)) |
| **App Attest** | Firebase App Check on real iPhones ([Firebase](/mobile-app/firebase/#5-app-check-recommended)) |

### Manual signing (if your team requires it)

In the [Apple Developer portal](https://developer.apple.com/account/resources/): create an **App ID** with your bundle ID and the capabilities above, an **Apple Distribution** certificate (from a certificate signing request made in Keychain Access), and an **App Store** provisioning profile for that App ID. Download the profile, untick **Automatically manage signing** and choose it for the **Release** configuration.

### Keys from Apple your services need

These are **keys** (`.p8` files), not certificates. Each is downloaded once.

| Key | Create it in | Paste it into |
|---|---|---|
| **APNs key** (Apple Push Notifications service) | Developer › **Keys** | Firebase › Cloud Messaging ([Push notifications](/mobile-app/push-notifications/)) |
| **In-App Purchase key** | App Store Connect › Users and Access › **Integrations › In-App Purchase** | Admin Panel › Settings › Payments › App Store ([App Store](/admin-panel/settings/payments/#app-store-keys)) |
| **Sign in with Apple key** (only for "Continue with Apple" on Android) | Developer › **Keys**, with **Sign in with Apple**, plus a **Services ID** | Firebase › Authentication › Apple provider |

:::note[Sign in with Apple outside iPhone]
On iPhone, "Continue with Apple" works with the capability alone. On Android, Firebase signs in through Apple's web flow, which needs a **Services ID**, your Team ID, a Sign in with Apple **key** and its Key ID in Firebase › **Authentication › Sign-in method › Apple**. Add Firebase's handler (`https://<your-project>.firebaseapp.com/__/auth/handler`) as a return URL on the Services ID. Firebase's guide: [Apple sign-in on Android](https://firebase.google.com/docs/auth/android/apple).
:::

## Everything at a glance

| Item | Platform | You'll need it again for |
|---|---|---|
| `upload-keystore.jks` + passwords | Android | **Every** update on Google Play |
| `android/key.properties` | Android | Every release build on this computer |
| SHA-1 / SHA-256 fingerprints | Android | Firebase, `EDRAMA_ANDROID_SHA256`, developer verification |
| Team ID | iOS | `EDRAMA_IOS_APP_ID` (`TEAMID.bundle.id`), Firebase |
| APNs key (`.p8`) | iOS | Push notifications |
| In-App Purchase key (`.p8`) | iOS | Verifying purchases on your server |
| Sign in with Apple key (`.p8`) + Services ID | Android | "Continue with Apple" on Android |
