---
sidebar_position: 12
title: Deep links
description: Make share links and website links open your app.
---

# Deep links

eDrama's link setup is its own, so follow this page rather than the common guide.

Two kinds of links open the app:

| Links | Domain | Paths |
|---|---|---|
| **Share links**, made by the app | Your backend's domain (`shareBaseUrl`) | `/s/…` (a series), `/c/…` (a creator) |
| **Website links** | Your website's domain | `/series/…`, `/creators/…`, and `/s/…`, `/c/…` |

## In the app

<Steps>
<Step title="The share domain">

`shareBaseUrl` in `lib/app/config/app_config.dart` ([App settings](./app-settings.md)).

</Step>
<Step title="Android">

In `android/app/build.gradle.kts`, set both hosts (no `https://`):

```kotlin title="android/app/build.gradle.kts"
manifestPlaceholders["shareHost"] = "admin.your-domain.com"
manifestPlaceholders["websiteHost"] = "your-domain.com"
```

`AndroidManifest.xml` already uses them, with the paths above.

</Step>
<Step title="iOS">

In `ios/Runner/Runner.entitlements`, list both domains under Associated Domains:

```xml title="ios/Runner/Runner.entitlements"
<string>applinks:admin.your-domain.com</string>
<string>applinks:your-domain.com</string>
```

Turn on **Associated Domains** for your App ID in the Apple Developer portal too.

</Step>
</Steps>

## On the servers

Phones check a file on each domain before they open links in your app:

- **Backend**: set `EDRAMA_ANDROID_PACKAGE`, `EDRAMA_ANDROID_SHA256` and `EDRAMA_IOS_APP_ID` in its `.env`. See [Admin Panel › Share links](/admin-panel/share-links/).
- **Website**: it serves the same files from your backend's app settings by itself.

## Check it worked

1. Open `https://admin.your-domain.com/.well-known/assetlinks.json` and `/.well-known/apple-app-site-association`: they show your app.
2. On Android, after installing a release build: Settings › Apps › your app › **Open by default** lists your domains as verified.
3. Send yourself a share link and tap it: the app opens on that series.
