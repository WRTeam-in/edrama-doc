---
sidebar_position: 10.5
title: "Integrations"
description: "Every outside service eDrama connects to, what it's used for, where its keys go, and links to each service's console and documentation."
sidebar_label: "Integrations & callback URLs"
---

eDrama connects to a handful of outside services. Each one's keys go in a card in <Path>Settings</Path> with a **Where do I find these?** guide, **Save** and **Test connection**.

| Service | Used for | Needed? | Keys go in | Guide |
|---|---|---|---|---|
| **Firebase** | Viewer sign-in, push, App Check, Creator Portal sign-in | Yes | Settings › Notifications | [Firebase](/admin-panel/settings/firebase-and-notifications/) |
| **Google Play** | Coin packs and VIP on Android; refunds and renewals | For Android | Settings › Payments | [Google Play](/admin-panel/settings/payments/#google-play-keys) |
| **App Store** | Coin packs and VIP on iOS; refunds and renewals | For iOS | Settings › Payments | [App Store](/admin-panel/settings/payments/#app-store-keys) |
| **AdMob** | Rewarded ads; earnings for creator revenue | If you use ads | Monetization › Ads; Settings › Creator revenue | [AdMob](/admin-panel/monetization/#ads) |
| **Amazon S3 / S3-compatible** | Storing files and videos | Optional | Settings › Storage & video | [Storage & streaming](/admin-panel/settings/storage-and-video/) |
| **Cloudflare R2** | Storing files and videos, no download fees | Optional | Settings › Storage & video | [Storage & streaming](/admin-panel/settings/storage-and-video/) |
| **Cloudflare Stream** | Processing and streaming videos | Optional | Settings › Storage & video | [Storage & streaming](/admin-panel/settings/storage-and-video/) |
| **ffmpeg** | Processing videos on your server | Unless you use Stream | Server | [Video processing](/admin-panel/settings/storage-and-video/#ffmpeg) |
| **SMTP email** | Invites, resets, creator emails, alerts | Strongly recommended | Settings › Email delivery | [Email & alerts](/admin-panel/settings/email/) |
| **Slack** | System alerts | Optional | Settings › Notifications | [Email & alerts](/admin-panel/settings/email/) |
| **Google Gemini** | AI Studio | Optional | Settings › AI Studio; creators' accounts | [Gemini & YouTube](/admin-panel/settings/ai-studio/) |
| **YouTube** | Free episodes from YouTube | Optional | Settings › Video pipeline (switch) | [Gemini & YouTube](/admin-panel/settings/ai-studio/) |
| **WRTeam license server** | Purchase code checks | Yes | Installer; System › License & updates | [License & updates](/admin-panel/license-and-updates/) |

## Useful links

| Resource | Link |
|---|---|
| Firebase console | [console.firebase.google.com](https://console.firebase.google.com/) |
| Google Play Console | [play.google.com/console](https://play.google.com/console) |
| Google Cloud service accounts | [console.cloud.google.com/iam-admin/serviceaccounts](https://console.cloud.google.com/iam-admin/serviceaccounts) |
| Google Cloud credentials (OAuth) | [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials) |
| App Store Connect | [appstoreconnect.apple.com](https://appstoreconnect.apple.com/) |
| Apple Developer keys (APNs) | [developer.apple.com/account/resources/authkeys](https://developer.apple.com/account/resources/authkeys/list) |
| AdMob | [apps.admob.com](https://apps.admob.com/) |
| AdMob API (enable) | [console.cloud.google.com/apis/library/admob.googleapis.com](https://console.cloud.google.com/apis/library/admob.googleapis.com) |
| Amazon S3 | [console.aws.amazon.com/s3](https://console.aws.amazon.com/s3/home) |
| AWS IAM users | [console.aws.amazon.com/iam](https://console.aws.amazon.com/iam/home#/users) |
| Cloudflare dashboard | [dash.cloudflare.com](https://dash.cloudflare.com/) |
| Cloudflare API tokens | [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) |
| Cloudflare Stream webhooks | [developers.cloudflare.com/stream](https://developers.cloudflare.com/stream/manage-video-library/using-webhooks/) |
| Cloudflare Stream signed links | [developers.cloudflare.com/stream](https://developers.cloudflare.com/stream/viewing-videos/securing-your-stream/) |
| Google app passwords (Gmail SMTP) | [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) |
| Slack apps (incoming webhooks) | [api.slack.com/apps](https://api.slack.com/apps) |
| Google AI Studio (Gemini keys) | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| YouTube API Services Terms | [developers.google.com/youtube/terms](https://developers.google.com/youtube/terms/api-services-terms-of-service) |
| YouTube Terms of Service | [youtube.com/t/terms](https://www.youtube.com/t/terms) |
| Google Privacy Policy | [policies.google.com/privacy](https://policies.google.com/privacy) |
| Flutter install | [docs.flutter.dev/get-started/install](https://docs.flutter.dev/get-started/install) |
| FVM (Flutter version manager) | [fvm.app](https://fvm.app/) |
| FlutterFire CLI | [firebase.google.com/docs/flutter/setup](https://firebase.google.com/docs/flutter/setup) |
| Envato: find your purchase code | [help.market.envato.com](https://help.market.envato.com/hc/en-us/articles/202822600-Where-Is-My-Purchase-Code-) |

## Callback addresses

Several services call your server back. Each card in Settings shows its exact address with a **Copy** button. They're all listed here too: type your Admin Panel's domain once and every address fills in.

<DomainInput />

| Service | Address |
|---|---|
| **Google Play real-time notifications**<br />The Pub/Sub push subscription's endpoint and its audience ([Google Play](/admin-panel/settings/payments/#google-play-keys)) | <ServerUrl path="/api/v1/webhooks/google-play" /> |
| **App Store Server Notifications**<br />App Store Connect › your app › App Information, **Version 2**, for production and sandbox ([App Store](/admin-panel/settings/payments/#app-store-keys)) | <ServerUrl path="/api/v1/webhooks/app-store" /> |
| **AdMob server-side verification**<br />AdMob › each rewarded ad unit › Server-side verification ([AdMob](/admin-panel/monetization/#ads)) | <ServerUrl path="/api/v1/webhooks/admob-ssv" /> |
| **Cloudflare Stream webhook**<br />Registered for you by `php artisan edrama:video-webhook` ([Cloudflare Stream](/admin-panel/settings/storage-and-video/#cloudflare-stream)) | <ServerUrl path="/api/v1/webhooks/video" /> |
| **AdMob OAuth redirect**<br />Google Cloud › your OAuth client › Authorised redirect URIs, for **Connect AdMob** ([AdMob](/admin-panel/monetization/#ads)) | <ServerUrl path="/admin/admob/callback" /> |
| **Android app links**<br />Nothing to paste: open it to check it lists your app ([Deep links](/mobile-app/deep-links/)) | <ServerUrl path="/.well-known/assetlinks.json" /> |
| **iOS universal links**<br />Nothing to paste: open it to check it lists your app | <ServerUrl path="/.well-known/apple-app-site-association" /> |

:::tip
If you move to another domain, every one of these changes with it. Update each service, or notifications stop reaching your server.
:::
