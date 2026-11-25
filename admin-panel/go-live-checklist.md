---
sidebar_position: 14
title: Go-live checklist
description: Everything to do before you launch eDrama, in order, with a link to each guide.
---

# Go-live checklist

Use this page as your map. Each line links to the page with the full instructions. Tick them off in order: later steps depend on earlier ones. **Your ticks are saved in this browser**, so you can come back to it as you work.

<Checklist id="launch">

<ChecklistGroup title="1. Server">

<ChecklistItem id="server-rent">Rent a server that meets the [requirements](/admin-panel/requirements/) (PHP 8.5, MySQL 8, HTTPS, ffmpeg or Cloudflare Stream) and point your domain at it.</ChecklistItem>

<ChecklistItem id="server-prepare">Prepare it: [VPS](/admin-panel/vps-server/) or [shared hosting](/admin-panel/shared-hosting/). The domain points at the package's `public` folder only.</ChecklistItem>

<ChecklistItem id="server-install">Run the [web installer](/admin-panel/installation/): requirements, purchase code, database, Owner account.</ChecklistItem>

<ChecklistItem id="server-cron">Add the [cron line and queue workers](/admin-panel/background-jobs/), then check <Path>System › System</Path> shows "Cron running".</ChecklistItem>

<ChecklistItem id="server-video">Make sure [ffmpeg works](/admin-panel/settings/storage-and-video/#ffmpeg) (or choose Cloudflare Stream) and a test episode reaches **Ready**.</ChecklistItem>

</ChecklistGroup>

<ChecklistGroup title="2. Admin Panel basics">

<ChecklistItem id="admin-2fa">Sign in as the Owner and [turn on two-factor](/admin-panel/using/sign-in-and-account/).</ChecklistItem>

<ChecklistItem id="admin-branding">Set your [branding](/admin-panel/settings/branding/): app name, logos, favicon, theme colour.</ChecklistItem>

<ChecklistItem id="admin-smtp">Add your [SMTP email server](/admin-panel/settings/email/) and send a test email.</ChecklistItem>

<ChecklistItem id="admin-firebase">Add the [Firebase keys](/admin-panel/settings/firebase-and-notifications/) and press **Test connection**.</ChecklistItem>

<ChecklistItem id="admin-support">Set your [support email](/admin-panel/settings/app-and-support/). Until you do, the app shows `support@example.com`.</ChecklistItem>

<ChecklistItem id="admin-storage">Choose [where files and videos live](/admin-panel/settings/storage-and-video/).</ChecklistItem>

<ChecklistItem id="admin-legal">Publish your [legal pages](/admin-panel/settings/legal-and-security/), including the Creator Terms.</ChecklistItem>

<ChecklistItem id="admin-languages">Upload the app file for every [language](/admin-panel/settings/regions-and-languages/) you offer, or turn Hindi off (a fresh install lists it as offered).</ChecklistItem>

<ChecklistItem id="admin-team">Invite your [team](/admin-panel/team-and-roles/) with the right roles, and require two-factor for everyone.</ChecklistItem>

</ChecklistGroup>

<ChecklistGroup title="3. Money">

<ChecklistItem id="money-regions">Review your [regions](/admin-panel/monetization/#regions): currency, coin value and countries.</ChecklistItem>

<ChecklistItem id="money-rates">Add [exchange rates](/admin-panel/settings/regions-and-languages/) for every currency you sell in.</ChecklistItem>

<ChecklistItem id="money-packs">Set your [coin packs and VIP plans](/admin-panel/monetization/#coin-packs) per region.</ChecklistItem>

<ChecklistItem id="money-stores">Create the same products in [Google Play](/admin-panel/settings/payments/#google-play-keys) and the [App Store](/admin-panel/settings/payments/#app-store-keys), paste the store keys in <Path>Settings › Payments</Path>, and set up both stores' server notifications.</ChecklistItem>

<ChecklistItem id="money-admob">If you use ads, set up [AdMob](/admin-panel/monetization/#ads) with server-side verification on every ad unit.</ChecklistItem>

<ChecklistItem id="money-share">Set the [creator share and store fees](/admin-panel/settings/payments/).</ChecklistItem>

</ChecklistGroup>

<ChecklistGroup title="4. Content">

<ChecklistItem id="content-categories">Review the [categories](/admin-panel/using/content/categories/).</ChecklistItem>

<ChecklistItem id="content-titles">Create your first [titles](/admin-panel/using/content/titles/), upload episodes and set prices.</ChecklistItem>

<ChecklistItem id="content-schedule">[Schedule](/admin-panel/using/content/release-schedule/) the episodes.</ChecklistItem>

<ChecklistItem id="content-home">Build the app's [Home](/admin-panel/using/content/home-builder/) and publish it.</ChecklistItem>

<ChecklistItem id="content-demo">Remove the sample content with [Clear demo data](/admin-panel/first-steps/#demo-data) if you imported it.</ChecklistItem>

</ChecklistGroup>

<ChecklistGroup title="5. Mobile app">

<ChecklistItem id="app-computer">[Set up Flutter](/mobile-app/setup-flutter/) and the Android and iOS tools, and read [what's in the download](/mobile-app/).</ChecklistItem>

<ChecklistItem id="app-package">Change the [package name](/mobile-app/package-name/) first: Firebase and the stores are tied to it.</ChecklistItem>

<ChecklistItem id="app-firebase">Connect [Firebase](/mobile-app/firebase/) (the build stops without its files), fill in the iOS URL schemes and turn on the sign-in methods you offer.</ChecklistItem>

<ChecklistItem id="app-server">[Connect the app](/mobile-app/app-settings/) to your server, then [run it](/mobile-app/run-the-app/).</ChecklistItem>

<ChecklistItem id="app-brand">Change the [name](/mobile-app/package-name/), [logo and icons](/mobile-app/logo-and-icons/) and [colours](/mobile-app/colours-and-fonts/).</ChecklistItem>

<ChecklistItem id="app-push">Upload your APNs key to Firebase and send yourself a [test push](/mobile-app/push-notifications/).</ChecklistItem>

<ChecklistItem id="app-ads">Replace Google's test IDs with your [AdMob app IDs](/mobile-app/ads-and-purchases/).</ChecklistItem>

<ChecklistItem id="app-links">Set up [share links](/mobile-app/deep-links/), and check both `.well-known` files on your server show your app.</ChecklistItem>

<ChecklistItem id="app-signing">Create and back up your [upload keystore](/mobile-app/signing/), and add every SHA fingerprint to Firebase.</ChecklistItem>

<ChecklistItem id="app-release">[Build the release](/mobile-app/release-build/), create a [store reviewer account](/admin-panel/commands/#store-reviewer-account) and [publish it to the stores](/mobile-app/publishing/).</ChecklistItem>

<ChecklistItem id="app-versions">Enter the store links and versions in <Path>Settings › App & support</Path>.</ChecklistItem>

<ChecklistItem id="app-check">Once the store build works, turn on [App Check](/admin-panel/settings/firebase-and-notifications/#app-check): `monitor` first, then `enforce`.</ChecklistItem>

</ChecklistGroup>

<ChecklistGroup title="6. Website">

<ChecklistItem id="web-deploy">[Deploy the website](/website/deploy-vercel/) to Vercel or your own Node.js server.</ChecklistItem>

<ChecklistItem id="web-connect">[Connect it](/website/connect/): set the **Website address** and the refresh secret, then publish a change and see it appear within a minute.</ChecklistItem>

</ChecklistGroup>

<ChecklistGroup title="7. Before you announce it">

<ChecklistItem id="final-purchase">Buy a coin pack with a test account and check it on [Transactions](/admin-panel/using/money/transactions/).</ChecklistItem>

<ChecklistItem id="final-push">Send a [test push](/admin-panel/using/audience/push/) to your own phone.</ChecklistItem>

<ChecklistItem id="final-share">Share a series from the app and tap the link on another phone: the app opens on that series.</ChecklistItem>

<ChecklistItem id="final-jobs">Check <Path>System › System</Path> shows no failed jobs.</ChecklistItem>

</ChecklistGroup>

</Checklist>

:::tip
Steps 1 and 5 can run in parallel if two people are working: the app only needs the server's address, which you know before the server is finished.
:::

<HelpBanner title="Prefer to hand it over?" />
