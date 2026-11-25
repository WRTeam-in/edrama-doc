# Verification notes

What couldn't be confirmed from the eDrama source code while writing this documentation, and the assumptions made. Pages that depend on an item carry a **To confirm** note.

Sources reviewed: the Admin Panel (`htdocs/SortDrama`, Laravel 13 / Filament 5, including `lang/en`, enums, services, config, routes, seeders and `docs/`) and the app (`eDrama-app`, Flutter 3.47.7, including `lib/`, `assets/l10n/template.json` and the Android/iOS projects).

## 1. The UI says one thing, the code does another

| Item | Detail | Where documented |
|---|---|---|
| **Failed rewarded ad** | The title editor's *Fair-play locks* card (`lang/en/studio.php`, `titles.monetization.fair_play.rules`) says "A failed rewarded ad still unlocks the episode". `AdSessionService` unlocks **nothing** for a failed ad (only AdMob's verified callback unlocks); it still counts toward the daily limit. The docs describe the code's behaviour and flag the wording. Project notes list this as DECISION-1, awaiting the product owner. | Admin › Title editor; Monetization › Unlock methods |

## 2. Not in the source provided

| Item | Detail |
|---|---|
| **Public website source** | The Admin Panel's *Website* editor connects to a separate website project (`EDRAMA_API_URL`, `REVALIDATE_SECRET`). That project wasn't provided, so hosting and installing the website isn't documented; only the editor is. |
| **App README sections** | `app_config.dart` and `firebase_options.dart` refer to "README › Firebase" and "README › Deep links", which don't exist in the app's README. The Firebase and deep-link pages were written from the code and platform files instead. |
| **Real screenshots** | None were captured. All 60 screens show wireframes; marker positions are approximate and must be checked once screenshots are added (`SCREENSHOTS.md`). |

## 3. Decisions recorded as pending in the project notes

| Item | Current behaviour documented |
|---|---|
| Series Pass and the daily spend limit | The pass isn't held to the limit. |
| Panel refunds and coins | Optional **Take the coins back** switch in the refund dialog (as in the code). |
| Moderator role and team titles | Moderators have no Titles access, so they can't approve the team's own titles. |
| Audit log retention | "Kept for 2 years" isn't enforced; rows are kept indefinitely. |

## 4. Assumptions made in the docs

| Item | Assumption | Please check |
|---|---|---|
| VPS commands | Generic Ubuntu 24.04 steps (Ondřej's PHP PPA for PHP 8.5, nginx, MySQL 8, certbot). Not from the eDrama source. | Your provider's PHP 8.5 packages. |
| Support contacts and hours | Copied from WRTeam's eSchool documentation (support@wrteam.in, Mon–Fri 9–6 IST, wrteam.in). | That they apply to eDrama. |
| Installation service | The help banner offers WRTeam's installation service, as on the eSchool docs. | That it's offered for eDrama. |
| Player "More" button | Placed at the top right of the player wireframe. The code confirms the side buttons (like, comments, episodes, share) and gestures, not the More button's position. | On a device. |
| App notification switch defaults | Drop alerts, replies and offers assumed on for new accounts; set by the server. | In the app. |
| Me tab rows | Order and presence inferred from `me_screen.dart` string keys. | In the app. |
| Creator Portal menu | Order inferred from each page's `navigationSort`. | In the portal. |
| Panel URLs in screenshot frames | Most come from page slugs; record IDs (such as `/admin/titles/12/edit`) are illustrative. | — |
| Store product IDs | The seeded defaults (`coins_300_first`, `com.edrama.app.coins.*`, `vip` with base plans) are documented as examples; buyers use their own. | — |
| AI Studio models and prices | Code defaults (`gemini-nano-banana-2.1`, `gemini-3-pro-image`, `gemini-omni-1.2-flash` and their prices). Google changes these often. | Google's current model IDs and pricing. |
| Changelog | Version 1.0.0 has no release date (none in the source). | Add the date. |
| India pricing | Seeded INR prices and coin value are placeholders (flagged on the pages). | Finance's real figures. |

## 5. About the screenshots

The screenshots were taken from the real software (see `SCREENSHOTS.md`), with these choices worth knowing:

- **Demo data.** Names, titles, numbers and dates (November 2026) come from the Admin Panel's built-in demo data in an isolated copy, plus a few records added there so screens aren't empty (approved episodes waiting for release times; three months of creator revenue and one payout). Nothing was written to your real Admin Panel database.
- **Production view.** On a developer machine the Admin sign-in shows a *Local* badge and the installer skips its hidden-files (`.env`) check. The screenshots show what a production server shows instead: no badge, and the check passing. Local paths and IPs were replaced with `/var/www/edrama`, `admin.your-domain.com` and `203.0.113.24`.
- **Viewer app.** Captured on an Android emulator as a guest against the WRTeam demo server (`edrama.thewrteam.in`). Your build will show your own content, logo and prices. The player was captured from a local build with `AppConfig.protectScreen = false`; the shipped setting (`true`) blocks screenshots of the player, as intended.
- **Not captured: the VIP page** (`app-vip`). It needs Google Play Billing, which isn't available on an emulator. It keeps its wireframe until you add a screenshot from a real phone.
- **Corrections the screenshots led to.** On the sign-in sheet the phone's own provider is first and marked *Recommended* (Google on Android, Apple on iPhone), not Email. The creator's *Hold them for my release times* switch is in the **Submit new episodes** dialog, not on Release times. The Creator Portal menu lists AI Studio before Release schedule. Creator Earnings shows *Earned* under **Paid to you** rather than as its own card.

## 6. Merged from the other developer's setup document

The setup guide in `Ayush-eDrama-doc` was compared page by page with these docs. Everything relevant that was missing here was added, after checking it against the current Admin Panel and app source:

- **New pages:** [Server commands](docs/installation/commands.mdx) (with the store reviewer account), and a whole **Website setup** section: overview and local setup, connecting to the Admin Panel, deploying (Vercel or your own Node.js server), pages, languages and app links.
- **Added to existing pages:** what's in each download zip; the queue pools and their time limits; Supervisor's `user=` lines; the full `.env` reference (20 more keys); installer troubleshooting; moving to another domain; the Pub/Sub publisher grant for Google Play; the one-command Cloudflare Stream webhook; S3 bucket prefixes and the website's `EDRAMA_IMAGE_HOSTS`; the app download's placeholders and `FIRST_BUILD.md`; the iOS URL schemes for Google and phone sign-in; App Check debug tokens; the Blaze plan for phone sign-in; Android notification channels; splash images per platform; the step-by-step VIP subscription setup in both stores with test renewal speeds; Crashlytics symbols; the Play App Signing fingerprint after the first release; the "turn the portal on" steps; the earnings formula with a worked example and a calculator; named support contacts; ten FAQs.
- **Corrected here** (these docs were wrong, the code agreed with the other document): `EDRAMA_SUPPORT_EMAIL` defaults to `support@example.com`, not empty; the Pub/Sub push service account is **required**, not optional; the App Store card's **Environment** only affects **Test connection** (purchases are checked with production, then the sandbox); creator coin earnings deduct the **store fee** and use the **paid coin value**; the app can't run "as it comes" (the download has placeholders and no Firebase files), so the roadmap now starts with the package name and Firebase; `MainActivity.kt` is in `kotlin/com/example/edrama/` in the download.
- **Not taken from the other document** (the current code disagrees): there is no **Reset purchase code** button (moving domains goes through WRTeam support); the installer accepts an Owner password of **8** characters (12, with a leak check, applies to later changes inside the panel); the download's `android/.gitignore` **does** leave out `key.properties` and `*.jks`.
- **Couldn't be verified:** the website's own source wasn't available. Its settings (`EDRAMA_API_URL`, `REVALIDATE_SECRET`, `EDRAMA_IMAGE_HOSTS` and the rest), Node.js 20.9+, Next.js 16, `scripts/deploy.sh` and `edrama-website-<version>.zip` come from the other document. The server side of the connection was checked in code (the signed `POST /api/revalidate`, public addresses only, sent from the queue). The support contacts, Teams links and WRTeam's common app guide links also come from that document.

### Mobile app setup, second pass

Mobile App Setup was compared again against the other document and checked against the app project itself (`pubspec.yaml`, `build.gradle.kts`, `settings.gradle.kts`, the Gradle wrapper, `Podfile`, `AndroidManifest.xml` and the merged manifest of a real build, `Info.plist`, `Runner.entitlements`, `tool/build_release.sh`, `tool/package_buyer.sh`). Added:

- **New pages:** [Set up Flutter](docs/app-setup/flutter-setup.mdx), [Push notifications](docs/app-setup/push-notifications.mdx), [Permissions & platform settings](docs/app-setup/permissions.mdx), [Signing & certificates](docs/app-setup/signing.mdx) and [Publish to the stores](docs/app-setup/publishing.mdx).
- **Extended:** version numbers, both iOS upload routes, testing a release build and release errors ([Release build](docs/app-setup/release-build.mdx)); the full `app_config.dart` reference ([Connect to your server](docs/app-setup/connect-to-server.mdx)); a topic map to WRTeam's common app guide ([Overview](docs/app-setup/overview.mdx)), and a common-guide card on every matching page.
- **Sidebar:** grouped as First build, Make it yours, Connect services and Release, in the order the steps must be done. No page was removed.
- **From outside the code:** store rules (Play's closed-testing requirement for new personal accounts, App Store screenshot sizes, review times, fees) are Google's and Apple's current published rules and can change. Firebase's Apple-on-Android setup follows Firebase's own guide. The common-guide links were checked to load.

## 7. Before publishing these docs

- Optionally replace the screenshots with your own branding and content, and add the VIP page from a real phone (`SCREENSHOTS.md`).
- Confirm the items in sections 1, 3 and 4.
- Set `DOCS_URL` / `DOCS_BASE_URL` for where the site will live.
