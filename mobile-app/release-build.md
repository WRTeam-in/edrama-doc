---
sidebar_position: 14
title: Release build
description: Sign and build eDrama for Google Play and the App Store.
---

# Release build

This page builds the files you upload to the stores. Signing is set up once on [Signing & certificates](/mobile-app/signing/); uploading and store review are on [Publish to the stores](/mobile-app/publishing/).

## Version numbers

The version lives in **one place**, `pubspec.yaml`:

```yaml title="pubspec.yaml"
version: 1.0.1+2
```

| Part | Here | Android | iOS | Rule |
|---|---|---|---|---|
| Version name | `1.0.1` | `versionName` | `CFBundleShortVersionString` | What viewers see. Also what you enter as **Latest** in the Admin Panel. |
| Build number | `2` | `versionCode` | `CFBundleVersion` | Must be **higher for every upload**, even a re-upload of the same version. |

The build reads both from `pubspec.yaml`: don't edit them in Gradle or Xcode.

## Before you build

- [ ] The app points at your server ([Connect to your server](/mobile-app/app-settings/)).
- [ ] Name, package name, logo, icons and colours are yours.
- [ ] Firebase is connected and the sign-in methods are on ([Firebase](/mobile-app/firebase/)).
- [ ] Your AdMob app IDs (`admob.appId` and `GADApplicationIdentifier`) replace Google's test IDs ([Ads](/mobile-app/ads-and-purchases/)). Without them, the store build shows test ads.
- [ ] Your own `shareHost`, `websiteHost` and `applinks:` domains replace `your-domain.com` ([Deep links](/mobile-app/deep-links/)).
- [ ] `flutter analyze` prints "No issues found!" and `flutter test` passes.
- [ ] The version is raised in `pubspec.yaml`: `version: 1.0.0+1` means version **1.0.0**, build **1**. Every upload to a store needs a higher build number.

<Anchor id="android-signing" />

## Android: create your signing key

Google Play needs every update signed with the **same** key. Create it once and keep it safe: if you lose it, you can't update your app.

```bash title="Terminal"
keytool -genkey -v -keystore android/app/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

Copy `android/key.properties.example` to `android/key.properties` and fill it in (never share it or commit it to version control; the download's `android/.gitignore` already leaves out `key.properties` and `*.jks`):

```properties title="android/key.properties"
storeFile=upload-keystore.jks
storePassword=your-store-password
keyAlias=upload
keyPassword=your-key-password
admob.appId=ca-app-pub-1234567890123456~1234567890
```

`storeFile` is read from the `android/app/` folder when it's a plain file name; a full path works too. `android/app/build.gradle.kts` reads this file automatically. **Without it, release builds are signed with the debug key**, which Google Play refuses. All the details, fingerprints included: [Signing & certificates](/mobile-app/signing/).

<Anchor id="ios-signing" />

## iOS: choose your team

Open `ios/Runner.xcworkspace` in Xcode, select **Runner › Signing & Capabilities** and pick your **Team** for the **Release** configuration. The download has none, so `flutter build ipa` fails until you do.

## Build

```bash title="Terminal, in the app folder"
tool/build_release.sh appbundle   # Google Play (.aab)
tool/build_release.sh ipa         # App Store
tool/build_release.sh apk         # a release APK
```

Or with plain Flutter: `flutter build appbundle` and `flutter build ipa` (add `--obfuscate --split-debug-info=build/debug-info` to match the script). Each target in detail:

The project includes `tool/build_release.sh`, which runs `flutter build <target> --release --obfuscate --split-debug-info=build/debug-info`: obfuscated Dart code, with the debug symbols kept separately in `build/debug-info` for crash reports. Clean once before a store build:

```bash title="Terminal, in the app folder"
flutter clean && flutter pub get
```

<Tabs>
<TabItem value="aab" label="Google Play (.aab)">

```bash title="Terminal"
tool/build_release.sh appbundle
```

Upload `build/app/outputs/bundle/release/app-release.aab` in Play Console ([Publish to the stores](/mobile-app/publishing/#publish-steps)). Google Play only accepts **app bundles** (`.aab`), signed with your upload key ([Signing](/mobile-app/signing/#create-the-upload-keystore)). R8 also shrinks and obfuscates the Android code; Crashlytics uploads its mapping file by itself.

</TabItem>
<TabItem value="ipa" label="App Store (.ipa)">

Two ways, both on a Mac, with your **Team** chosen in Xcode ([Signing](/mobile-app/signing/#automatic-signing-recommended)):

**From the terminal**

```bash title="Terminal"
cd ios && pod install && cd ..
tool/build_release.sh ipa
```

The file is `build/ios/ipa/*.ipa`. Upload it with Apple's [Transporter](https://apps.apple.com/app/transporter/id1450874784) app (sign in, drag the `.ipa` in, **Deliver**).

**From Xcode**

1. `flutter build ios --release --obfuscate --split-debug-info=build/debug-info`
2. Open `ios/Runner.xcworkspace`, choose **Any iOS Device (arm64)** as the destination.
3. **Product › Archive**. When the Organizer opens: **Distribute App › App Store Connect › Upload**.

Make sure Xcode shows **Push Notifications**, **Background Modes**, **Sign in with Apple**, **Associated Domains** and **App Attest** under Signing & Capabilities.

</TabItem>
<TabItem value="apk" label="APK (direct download)">

```bash title="Terminal"
tool/build_release.sh apk
```

The file is `build/app/outputs/flutter-apk/app-release.apk`. Useful for testing, or for the website's direct-download button.

</TabItem>
</Tabs>

### Test the release build first

Run it on a real phone before uploading: release builds behave differently from debug ones (no debug banner, real App Check, real ads once your IDs are set).

```bash title="Terminal"
flutter run --release
```

Check sign-in, an episode playing, a purchase with a test account, a push, and a shared link.

### If a release build fails

| Error | Fix |
|---|---|
| `Keystore file not found` / `keystore password was incorrect` | Check `storeFile` and the passwords in `android/key.properties` ([Signing](/mobile-app/signing/)). |
| Play Console: *You uploaded an APK or Android App Bundle that was signed in debug mode* | `android/key.properties` is missing, so the debug key was used. |
| Play Console: *Version code 1 has already been used* | Raise the number after `+` in `pubspec.yaml`. |
| `WARNING: this release build uses Google's TEST AdMob app ID` | Set `admob.appId` ([Ads setup](/mobile-app/ads-and-purchases/)). |
| `No profiles for '…' were found` / *Signing requires a development team* | Pick your Team in Xcode › Signing & Capabilities. |
| `pod install` errors | `cd ios && pod repo update && pod install`. On Apple silicon, update CocoaPods first. |
| `File google-services.json is missing` | Run `flutterfire configure` ([Firebase](/mobile-app/firebase/)). |

### Keep the debug symbols

Keep `build/debug-info` for every release you ship: stack traces from an obfuscated build can only be read with it. To see readable Dart stack traces in Crashlytics, upload it with the Firebase CLI:

```bash title="Terminal"
firebase crashlytics:symbols:upload --app=<your Firebase app ID> build/debug-info
```

<Anchor id="publish" />

## After the first Google Play release

Uploading, store listings and review are on [Publish to the stores](/mobile-app/publishing/), with WRTeam's common guides for the [Play Store](https://wrteam-in.github.io/common_app_doc/GeneralSettings/deployment/playstore) and the [App Store](https://wrteam-in.github.io/common_app_doc/GeneralSettings/deployment/appstore). Then:

Google Play signs the app it delivers with its own **app signing key**. Copy that key's **SHA-256** from Play Console › **Test and release › App integrity › App signing**, then:

- add it to `EDRAMA_ANDROID_SHA256` in the server's `.env`, after your upload key's and separated by a comma, so share links keep opening the app ([Deep links](/mobile-app/deep-links/#2-on-your-server));
- add it (and its SHA-1) to your Android app in Firebase, so **Continue with Google** works for Play installs ([Firebase](/mobile-app/firebase/)).

## After publishing: tell the server

Open <Path>Settings › App & support › App versions</Path> and, for each platform, fill in:

| Field | Meaning |
|---|---|
| **Latest** | The version you just published. Viewers on older builds are offered the update. |
| **Minimum supported** | Builds below this **must** update before they can use the app. Raise it only when an old build breaks something. |
| **Store link** | Your app's Google Play or App Store page. Used by the update screens, share pages and the website's store buttons. |

The **On latest** column shows how many devices seen in the last 30 days run the latest version.

## Store listing reminders

- Google Play's **Data safety** form and Apple's **App Privacy** answers must cover sign-in (email, phone), purchases, ads (AdMob) and crash reports (Crashlytics).
- Link your privacy policy: `https://admin.your-domain.com/legal/privacy` (published from <Path>Settings › Legal pages</Path>).
- If you use YouTube episodes, your privacy policy must say the app uses YouTube API Services and link to Google's privacy policy ([YouTube](/admin-panel/settings/ai-studio/)).
- Store reviewers need to sign in. Create an email-and-password account for them on the server with `php artisan edrama:review-account` ([Server commands](/admin-panel/commands/#store-reviewer-account)) and put it in Play Console (**App content › App access**) and App Store Connect (**App Review Information**).
- Apple reviewers can buy with their sandbox account; nothing needs switching on the server.
- WRTeam's common guide walks through the store listings: [Play Store](https://wrteam-in.github.io/common_app_doc/GeneralSettings/deployment/playstore) and [App Store](https://wrteam-in.github.io/common_app_doc/GeneralSettings/deployment/appstore).
