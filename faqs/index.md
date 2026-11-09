---
title: FAQs
description: Answers to the questions eDrama buyers ask most.
---

# Frequently asked questions

## Installation

### `/install` shows "404"
The installer closes itself once installation finishes. Sign in at `/admin` instead. If you need to install again on an empty database, contact [support](/support/).

### The installer says something is "Missing"
Your server lacks a PHP extension, runs PHP below 8.5, or a folder isn't writable. Fix the items marked **Missing** (or ask your host), then press **Check again**. See [Server requirements](/admin-panel/requirements/).

### The Admin Panel asks for the purchase code again, or says the domain doesn't match
Your purchase code is registered to one domain. If you moved, free it on the old domain with **Reset purchase code**, then activate it on the new one. See [License and updates](/admin-panel/license-and-updates/). The app and the website keep working meanwhile.

### Does it work on shared hosting?
Yes. The single cron job runs the background work, so you need no long-running process. For video, set up a [ready-made ffmpeg](/admin-panel/settings/storage-and-video/#ffmpeg-on-shared-hosting) or use Cloudflare Stream.

## Background work

### Emails, pushes or video processing don't happen
The cron job isn't running. Add it as on [Cron and background jobs](/admin-panel/background-jobs/), then check <AdminPath path="System › System" />. For emails, also check [Email delivery (SMTP)](/admin-panel/settings/email/): without it, emails only go to the server's log.

### An episode stays "Processing"
- With **this server** or **Amazon S3**: ffmpeg isn't found or the host stops long jobs. Check the ffmpeg line on Settings › Storage & video.
- With **Cloudflare Stream**: the webhook isn't registered. Run `php artisan edrama:video-webhook`.

Videos stuck in processing are also checked every 10 minutes.

## The app

### The app can't reach my server
Check `apiBaseUrl` in `lib/app/config/app_config.dart`: it must be `https://` and end in `/api/v1/`. If you turned on App Check with `EDRAMA_APP_CHECK=enforce`, test with `monitor` first.

### The app shows "maintenance" or asks to update
Maintenance mode is on, or the app's version is below **Minimum supported**. Both are in [Settings › App & support](/admin-panel/settings/app-and-support/).

### Shared links open the browser, not the app
Check the `.well-known` files and the app's link domains: [Share links](/admin-panel/share-links/) and [Deep links](/mobile-app/deep-links/). On Android, include the **Play App Signing** SHA-256 fingerprint.

### How do I add a language?
Upload its JSON file in Settings › Regions & languages. The app downloads it at its next start, with no new release. See [Languages](/mobile-app/languages/).

## Money

### A purchase didn't add coins
Check the Google Play or App Store keys and press **Test connection** in [Settings › Payments](/admin-panel/settings/payments/), and that the product IDs in Monetization match the store. The purchase shows in <AdminPath path="Money › Transactions" />.

### Ads don't unlock episodes
Check that the app has your own AdMob app IDs (not Google's test IDs), that the region has ad unit IDs in Monetization › Ads, and that **server-side verification** is on in AdMob with your callback URL. An ad pays only once AdMob confirms it.

### A viewer moved country and sees the wrong prices
If they never paid, the app moves them to the right region by itself at its next start. If they have paid, open their page in <AdminPath path="Audience › Users" /> and use **Change region** with a reason. See [how a viewer's region is decided](/admin-panel/monetization/#how-a-viewers-region-is-decided).

### Can I charge different prices in different countries?
Yes. Create a region for those countries in [Monetization › Regions](/admin-panel/monetization/#regions), with its own currency, coin value, packs, VIP plans and title prices.

### Why can't I raise a series' price for people already watching it?
**Price lock** is a fair-play rule: once a viewer starts a series, their per-episode price can't rise. A new price applies to viewers who haven't started it, and a price drop applies to everyone.

### How are creators paid?
eDrama works out each creator's share in the monthly creator report, and your team pays them from it. See [How earnings work](/features/how-earnings-work/).

## Compatibility

| Part | Built with |
|---|---|
| Backend and Admin Panel | PHP 8.5, Laravel 13, Filament 5, MySQL 8 |
| App | Flutter 3.47.7, Android 7.0+, iOS 15+ |
| Website | Next.js 16, Node.js 20+ |
