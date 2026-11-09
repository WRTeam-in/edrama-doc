---
sidebar_position: 10
title: Share links
description: Make shared series and creator links open your app instead of the browser.
---

# Share links

When a viewer shares a series or a creator, the app makes a link like `https://admin.your-domain.com/s/12` or `/c/handle`. On a phone with your app installed, that link should open **the app**. For that, Android and iOS check two files on the link's domain, which the backend serves for you once it knows your app:

- `https://admin.your-domain.com/.well-known/assetlinks.json` (Android)
- `https://admin.your-domain.com/.well-known/apple-app-site-association` (iOS)

On phones without the app, the link opens a share page with your store buttons.

## Steps

<Steps>
<Step title="Find your Android signing fingerprints">

You need the **SHA-256** fingerprint of every key that signs your app:

- **Google Play App Signing** (most apps): Play Console › your app › **Test and release › App integrity** › **App signing**: copy the SHA-256 of the **App signing key certificate**.
- Your **upload key** too, if you also install release builds outside Google Play:

```bash
keytool -list -v -keystore your-upload-key.jks -alias your-alias
```

</Step>
<Step title="Find your Apple app ID">

It is your **Team ID** and **bundle ID** joined by a dot, such as `ABCDE12345.com.yourcompany.yourapp`. The Team ID is in [Apple Developer › Membership details](https://developer.apple.com/account).

</Step>
<Step title="Add them to .env">

```ini title=".env"
EDRAMA_ANDROID_PACKAGE=com.yourcompany.yourapp
EDRAMA_ANDROID_SHA256=AA:BB:CC:...,11:22:33:...
EDRAMA_IOS_APP_ID=ABCDE12345.com.yourcompany.yourapp
```

Separate several SHA-256 fingerprints with commas. Then run `php artisan config:clear`.

</Step>
<Step title="Match the app">

The app's share domain must be this domain. See [Mobile App › Deep links](/mobile-app/deep-links/).

</Step>
</Steps>

## Check it worked

Open both `.well-known` addresses above in a browser. Each should show your package name or app ID. Empty values mean the `.env` lines are missing.

The website serves the same files from your app settings, so its `/series/…` and `/creators/…` pages open the app too ([Website › Languages and app links](/website/languages-and-app-links/)).
