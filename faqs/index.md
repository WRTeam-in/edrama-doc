---
title: FAQs
description: Answers to the questions eDrama buyers ask most, about installation, background work, content, the app, money and creators.
---

# Frequently asked questions

## Installation

<Anchor id="faq-default-login" />

### What are the default login details?
There are none. You choose the **Owner** email and password in the installer's last step. If you lost them, use **Forgot password?** on the sign-in page (email delivery must be set up). Only if no Owner exists at all, run `php artisan edrama:create-owner` on the server ([Server commands](/admin-panel/commands/)).

<Anchor id="faq-composer-npm" />

### Do I need Composer, Node.js or a build step on the server?
No. The package includes `vendor/` and the built `public/build`. Upload it, point the domain at `public`, and run the web installer ([Upload the code](/admin-panel/upload/)).

<Anchor id="faq-install-404" />

### `/install` shows "404"
The installer closes itself once installation finishes. Sign in at `/admin` instead. It also answers 404 while `EDRAMA_INSTALLER` isn't `true` in `.env`. If you need to install again on an empty database, contact [support](/support/).

<Anchor id="faq-install-missing" />

### The installer says something is "Missing"
Your server lacks a PHP extension, runs PHP below 8.5, or a folder isn't writable. Fix the items marked **Missing** (or ask your host), then press **Check again**. See [Server requirements](/admin-panel/requirements/).

<Anchor id="faq-license-domain" />

### The Admin Panel asks for the purchase code again, or says the domain doesn't match
Your CodeCanyon purchase code (from your CodeCanyon downloads page) is registered to one domain. After a move, the panels ask for the code again at `/activate`. If it's refused as registered elsewhere, write to [support](/support/) with your purchase code, the old domain and the new one: the license server releases it (the panel has no button for this). Step by step: [Move to another domain](/admin-panel/license-and-updates/#move-to-another-domain). The app and the website keep working meanwhile: the license never locks the API.

### Can I jump straight to the newest version?
No. Updates go **one version at a time**: install 1.0.0 → 1.1.0, then 1.1.0 → 1.2.0. Back up first. See [License and updates](/admin-panel/license-and-updates/).

### Does it work on shared hosting?
Yes, if you can choose PHP 8.5 and allow `proc_open`. The single cron job runs the background work (both the schedule and the queues), so you need no long-running process. For video, set up a [ready-made ffmpeg](/admin-panel/settings/storage-and-video/#ffmpeg-on-shared-hosting) or use Cloudflare Stream so your server does no video work. See [Install on shared hosting](/admin-panel/shared-hosting/).

## Background work

### Emails, pushes or video processing don't happen
The cron job isn't running. Add it as on [Cron and background jobs](/admin-panel/background-jobs/), then check <AdminPath path="System › System" /> until it shows **Cron running**. Episodes then also release at their time. For emails, also check [Email delivery (SMTP)](/admin-panel/settings/email/): without it, emails only go to the server's log.

<Anchor id="faq-emails" />

### Emails don't arrive
Until you add an SMTP server in <AdminPath path="System › Settings › Email delivery (SMTP)" />, emails are only written to the server's log and nobody receives them. Emails also go out through the queue, so the cron job must be running. Press **Send test email** to see what your mail server answers ([Email delivery and templates](/admin-panel/settings/email/)).

<Anchor id="faq-processing" />

### An episode stays "Processing"
- With **this server** or **Amazon S3**: ffmpeg isn't found or the host stops long jobs. Check the ffmpeg line on Settings › Storage & video, and that the cron job runs ([ffmpeg](/admin-panel/settings/storage-and-video/#ffmpeg)).
- With **Cloudflare Stream**: the webhook isn't registered. Run `php artisan edrama:video-webhook` ([Cloudflare Stream](/admin-panel/settings/storage-and-video/#cloudflare-stream)).

Videos stuck in processing are also checked every 10 minutes.

## Content

<Anchor id="faq-short-episode" />

### Why won't an episode publish? It says it's under the floor
Paid episodes must be at least 45 seconds long. Upload a longer cut, or open the title's **Episodes** tab and use **Allow short episode** with a reason. Creators can't submit episodes under the floor ([Episodes and subtitles](/admin-panel/using/content/episodes-and-subtitles/#the-45-second-floor)).

<Anchor id="faq-home-not-updating" />

### I changed Home but the app still shows the old one
Changes in the Home builder reach the app only after **Publish layout**. Viewers see it the next time they open Home ([Home builder](/admin-panel/using/content/home-builder/)).

<Anchor id="faq-title-hidden" />

### A live title doesn't appear for some viewers
Check its **Where it's shown** (title editor › Monetization): it may be limited to some regions. Also check it has a price in the default region, and that the viewer's audience matches the Home section it's in.

## The app

<Anchor id="faq-app-cant-reach" />

### The app can't reach my server
Check `apiBaseUrl` in `lib/app/config/app_config.dart`: it must be your server, use `https://` and end in `/api/v1/` ([App settings](/mobile-app/app-settings/)). If you turned on App Check with `EDRAMA_APP_CHECK=enforce`, test with `monitor` first, until your store build passes App Check.

<Anchor id="faq-app-maintenance" />

### The app shows "maintenance" or asks to update
Maintenance mode is on, or the app's version is below **Minimum supported**. Both are in [Settings › App & support](/admin-panel/settings/app-and-support/).

<Anchor id="faq-share-links-browser" />

### Shared links open the browser, not the app
Check the `.well-known` files and the app's link domains: [Share links](/admin-panel/share-links/) and [Deep links](/mobile-app/deep-links/). The share domain must match in `app_config.dart`, `build.gradle.kts` and `Runner.entitlements`, and your server must publish the link files (`EDRAMA_ANDROID_PACKAGE`, `EDRAMA_ANDROID_SHA256`, `EDRAMA_IOS_APP_ID`). On Android, include the **Play App Signing** SHA-256 fingerprint.

<Anchor id="faq-new-language" />

### How do I add a language?
Add it in Settings › Regions & languages, upload its translated JSON file for the mobile app, and turn on **Offered in the app**. The app downloads it at its next start, with no new release. See [Languages](/mobile-app/languages/).

<Anchor id="faq-app-name-change" />

### I changed the app name in Settings, but the name under the icon didn't change
The name under the icon is part of the app build: change it in `AndroidManifest.xml` and `Info.plist` and publish a new version. See [App name](/mobile-app/app-name/).

<Anchor id="faq-apple-sign-in" />

### "Continue with Apple" fails
Enable the **Apple** provider in Firebase Authentication with your Apple Developer account, and check that **Sign in with Apple** is on in Xcode's capabilities ([Firebase](/mobile-app/firebase/)).

<Anchor id="faq-store-review" />

### What login do I give Google Play and App Store reviewers?
Create an email-and-password account for them on the server with `php artisan edrama:review-account review@your-domain.com`, and put it in each store's review notes ([Server commands](/admin-panel/commands/#store-reviewer-account), [Publishing](/mobile-app/publishing/)).

## Money

<Anchor id="faq-coins-not-delivered" />

### A purchase didn't add coins
Check the Google Play or App Store keys and press **Test connection** in [Settings › Payments](/admin-panel/settings/payments/), and that the product IDs in Monetization match the store. Then search the order ID in <AdminPath path="Money › Transactions" /> and open the purchase: the verification steps show where it stopped. Purchases waiting on the store finish by themselves; the viewer can also choose **Restore purchases** in the app. If needed, use a [balance adjustment](/admin-panel/using/audience/balance-adjustments/) with a reason.

<Anchor id="faq-refund-app-store" />

### Why can't I refund an App Store purchase from the panel?
Apple decides App Store refunds. Send the viewer to Apple's refund request page (linked in the purchase drawer); Apple's notification updates the purchase when it's done ([Refunds and chargebacks](/features/refunds-and-chargebacks/)).

<Anchor id="faq-ads-no-reward" />

### Ads don't unlock episodes
Check that the app has your own AdMob app IDs (not Google's test IDs), that the region has ad unit IDs in Monetization › Ads, that the series has **Ads can unlock** on, and that **server-side verification** is on in AdMob with your callback URL on every rewarded ad unit. An ad pays only once AdMob confirms it ([Monetization › Ads](/admin-panel/monetization/#ads)).

<Anchor id="faq-region-moved" />

### A viewer moved country and sees the wrong prices
If they never paid, the app moves them to the right region by itself at its next start. If they have paid, open their page in <AdminPath path="Audience › Users" /> and use **Change region** with a reason. See [how a viewer's region is decided](/admin-panel/monetization/#how-a-viewers-region-is-decided).

<Anchor id="faq-some-countries" />

### Can I show a series in some countries only?
Yes. In the series' **Monetization** tab, set **Where it's shown** to **Only these regions**. See [Series in some regions only](/admin-panel/monetization/#series-in-some-regions-only).

### Can I charge different prices in different countries?
Yes. Create a region for those countries in [Monetization › Regions](/admin-panel/monetization/#regions), with its own currency, coin value, packs, VIP plans and title prices ([Regions and currencies](/features/regions-and-currencies/)).

<Anchor id="faq-price-change" />

### Why can't I raise a series' price for people already watching it?
**Price lock** is a fair-play rule: once a viewer starts a series, their per-episode price can't rise. A new price applies to viewers who haven't started it, and a price drop applies to everyone ([Coins and unlocks](/features/coins-and-unlocks/#price-lock)).

<Anchor id="faq-vip-trial" />

### Can I offer a free trial for VIP?
No. It's a locked fair-play rule: VIP never starts with a free trial that turns into a charge. The server refuses a subscription that started with one ([VIP subscriptions](/features/vip-subscriptions/)).

<Anchor id="faq-dashboard-currency" />

### The Dashboard says some revenue is left out
A currency has no exchange rate into your reporting currency for some days. Add the rate in [Settings › Regions & languages](/admin-panel/settings/regions-and-languages/).

<Anchor id="faq-creators-paid" />

### How are creators paid?
eDrama works out each creator's share in the monthly creator report and writes a monthly **statement** for each creator. Your team pays them outside eDrama (bank transfer, UPI, PayPal, Wise and so on) and records each payment with **Record payout** on the creator's page, so nobody is paid twice. Creators see their statements and payouts on **Earnings** in the Creator Portal. See [How earnings work](/features/how-earnings-work/#statements-and-payouts).

## Creators

<Anchor id="faq-creator-invite-not-received" />

### A creator didn't get their invite email
Email delivery may not be set up: add your SMTP server in [Email delivery (SMTP)](/admin-panel/settings/email/), send a test, then use **Resend invite** on the creator. Invites expire after 7 days.

<Anchor id="faq-creator-cannot-sign-in" />

### A creator can't sign in to the Creator Portal
Check that the Firebase **Web API key** and **Auth domain** are in Settings › Notifications, and that your domain is in Firebase's **Authorized domains** ([Turn it on](/creator-portal/#turn-it-on)). Creators sign in with Google, email or phone; Sign in with Apple isn't available in the portal, and a guest account can't become a creator.

<Anchor id="faq-creator-terms" />

### Creators can't create a series
The **Creator terms** must be published in [Legal pages](/admin-panel/settings/legal-and-security/#legal-pages), and each creator must accept the version in force.

## Compatibility

| Part | Built with |
|---|---|
| Backend and Admin Panel | PHP 8.5, Laravel 13, Filament 5, MySQL 8 |
| App | Flutter 3.47.7, Android 7.0+, iOS 15+ |
| Website | Next.js 16, Node.js 20.9+ |

<HelpBanner title="Didn't find your answer?" text="Check Troubleshooting for step-by-step fixes, or contact WRTeam support with your purchase code." to="/troubleshooting/" cta="Open Troubleshooting" />
