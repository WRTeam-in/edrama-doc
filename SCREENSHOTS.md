# Screenshots

62 annotated screens: **61 real screenshots** and 1 wireframe. Each file is `static/img/screens/<id>.webp`; see README › Screenshots to replace one.

## How they were captured

- **Admin Panel, Creator Portal and installer**: from the eDrama Admin Panel source, run as an isolated copy (its own SQLite database, never the live project) filled with the built-in demo data, in a 1600 px wide browser, light *Paper* theme. Every numbered marker was placed on the centre of the real on-screen element it describes, then checked by eye. Local paths and IP addresses were replaced with what a production server shows (`/var/www/edrama`, `admin.your-domain.com`, `203.0.113.24`).
- **Creator Portal**: signed in as the demo creator *Amara Okafor*. A few demo records were added in the copy so the screens aren't empty: three approved episodes waiting for release times, three months of creator revenue with one payout.
- **Viewer app**: the eDrama app built from its source and run on an Android emulator (1080 × 2400) as a guest against the WRTeam demo server, with a clean status bar. Markers were placed from the app's accessibility tree. For the player, the copy was built with `AppConfig.protectScreen = false`, because the shipped app blocks screenshots of the player.
- Full-page captures (taller than 16:10) scroll inside their frame on the page.

## Still a wireframe

| id | Page | Why |
|---|---|---|
| `app-vip` | VIP (`docs/viewer-app/vip.mdx`) | The VIP page loads its plans from Google Play Billing, which an emulator without a Play account and a Play-installed build cannot reach. Capture it on a real phone with the app installed from a Play testing track. |

## Every screen

| id | Type | Source | Size (px) | Markers | Page |
|---|---|---|---|---|---|
| `admin-ai-studio` | browser | Admin Panel | 1600 × 1000 | 8 | AI Studio (team) (`docs/admin/content/ai-studio.mdx`) |
| `admin-ai-usage` | browser | Admin Panel | 1600 × 1000 | 4 | AI usage (`docs/admin/community/ai-usage.mdx`) |
| `admin-audit-log` | browser | Admin Panel | 1600 × 1000 | 6 | Audit log (`docs/admin/system/audit-log.mdx`) |
| `admin-balance-adjustments` | browser | Admin Panel | 1600 × 1000 | 6 | Balance adjustments (`docs/admin/audience/balance-adjustments.mdx`) |
| `admin-categories` | browser | Admin Panel | 1600 × 1000 | 7 | Categories (`docs/admin/content/categories.mdx`) |
| `admin-coin-packs` | browser | Admin Panel | 1600 × 1000 | 7 | Monetization › Coin packs and VIP plans (`docs/admin/money/coin-packs-and-vip.mdx`) |
| `admin-community` | browser | Admin Panel | 1600 × 1000 | 8 | Comments and reviews (`docs/admin/community/comments-and-reviews.mdx`) |
| `admin-creator-revenue` | browser | Admin Panel | 1600 × 1000 | 7 | Creator revenue (`docs/admin/money/creator-revenue.mdx`) |
| `admin-creators` | browser | Admin Panel | 1600 × 1000 | 8 | Creators (`docs/admin/community/creators.mdx`) |
| `admin-dashboard` | browser | Admin Panel | 1600 × 1000 | 9 | Dashboard (`docs/admin/dashboard.mdx`) |
| `admin-home-builder` | browser | Admin Panel | 1600 × 1000 | 8 | Home builder (`docs/admin/content/home-builder.mdx`) |
| `admin-license-updates` | browser | Admin Panel | 1600 × 1000 | 6 | License and updates (`docs/installation/license-and-updates.mdx`) |
| `admin-monetization-regions` | browser | Admin Panel | 1600 × 1000 | 8 | Monetization › Regions (`docs/admin/money/regions.mdx`) |
| `admin-overview` | browser | Admin Panel | 1600 × 1000 | 9 | The Admin Panel (`docs/admin/overview.mdx`) |
| `admin-push` | browser | Admin Panel | 1600 × 1000 | 9 | Push notifications (`docs/admin/audience/push.mdx`) |
| `admin-release-schedule` | browser | Admin Panel | 1600 × 1000 | 8 | Release schedule (`docs/admin/content/release-schedule.mdx`) |
| `admin-review-queue` | browser | Admin Panel | 1600 × 1000 | 9 | Review queue (`docs/admin/community/review-queue.mdx`) |
| `admin-rewards` | browser | Admin Panel | 1600 × 1000 | 8 | Monetization › Ads, Rewards and Fair-play rules (`docs/admin/money/ads-and-rewards.mdx`) |
| `admin-settings` | browser | Admin Panel | 1600 × 1000 | 4 | Settings (`docs/admin/settings/overview.mdx`) |
| `admin-settings-branding` | browser | Admin Panel | 1600 × 1000 | 7 | Branding and sign-in screen (`docs/admin/settings/branding.mdx`) |
| `admin-settings-storage` | browser | Admin Panel | 1600 × 1000 | 6 | Storage, video and the video pipeline (`docs/admin/settings/storage-and-video.mdx`) |
| `admin-sign-in` | browser | Admin Panel | 1600 × 1000 | 8 | Sign-in and your account (`docs/admin/sign-in-and-account.mdx`) |
| `admin-support-tickets` | browser | Admin Panel | 1600 × 1000 | 5 | Support tickets (`docs/admin/audience/support-tickets.mdx`) |
| `admin-system` | browser | Admin Panel | 1600 × 1000 | 7 | System (`docs/admin/system/system-health.mdx`) |
| `admin-system-setup` | browser | Admin Panel | 1600 × 1000 | 7 | Cron and queues (`docs/installation/cron-and-queues.mdx`) |
| `admin-team` | browser | Admin Panel | 1600 × 1000 | 7 | Team and roles (`docs/admin/system/team-and-roles.mdx`) |
| `admin-title-editor` | browser | Admin Panel | 1600 × 1000 | 9 | The title editor (`docs/admin/content/title-editor.mdx`) |
| `admin-title-episodes` | browser | Admin Panel | 1600 × 1000 | 10 | Episodes and subtitles (`docs/admin/content/episodes-and-subtitles.mdx`) |
| `admin-titles` | browser | Admin Panel | 1600 × 1000 | 10 | Titles (`docs/admin/content/titles.mdx`) |
| `admin-transactions` | browser | Admin Panel | 1600 × 1000 | 8 | Transactions (`docs/admin/money/transactions.mdx`) |
| `admin-upload` | browser | Admin Panel | 1600 × 1000 | 10 | Upload & pipeline (`docs/admin/content/upload-pipeline.mdx`) |
| `admin-users` | browser | Admin Panel | 1600 × 1000 | 8 | Users (`docs/admin/audience/users.mdx`) |
| `admin-website` | browser | Admin Panel | 1600 × 1000 | 9 | Website (`docs/admin/content/website.mdx`) |
| `app-help` | phone | Android app | 720 × 1600 | 7 | Me, settings and help (`docs/viewer-app/settings-and-help.mdx`) |
| `app-home` | phone | Android app | 720 × 1600 | 10 | The viewer app (`docs/viewer-app/overview.mdx`) |
| `app-library` | phone | Android app | 720 × 1600 | 6 | Library and notifications (`docs/viewer-app/library-and-notifications.mdx`) |
| `app-me` | phone | Android app | 720 × 1600 | 7 | Accounts and sign-in (`docs/viewer-app/accounts.mdx`) |
| `app-onboarding` | phone | Android app | 720 × 1600 | 5 | First launch and onboarding (`docs/viewer-app/first-launch.mdx`) |
| `app-onboarding-language` | phone | Android app | 720 × 1600 | 5 | First launch and onboarding (`docs/viewer-app/first-launch.mdx`) |
| `app-player` | phone | Android app | 720 × 1600 | 10 | The player (`docs/viewer-app/player.mdx`) |
| `app-rewards` | phone | Android app | 720 × 1600 | 8 | Rewards (`docs/viewer-app/rewards.mdx`) |
| `app-search` | phone | Android app | 720 × 1600 | 6 | Home, search and browsing (`docs/viewer-app/home-and-discovery.mdx`) |
| `app-series` | phone | Android app | 720 × 1600 | 9 | The series page (`docs/viewer-app/series-page.mdx`) |
| `app-settings` | phone | Android app | 720 × 1600 | 7 | Me, settings and help (`docs/viewer-app/settings-and-help.mdx`) |
| `app-sign-in` | phone | Android app | 720 × 1600 | 7 | Accounts and sign-in (`docs/viewer-app/accounts.mdx`) |
| `app-splash` | phone | Android app | 720 × 1600 | 4 | Logo, icons and splash (`docs/app-setup/logo-and-icons.mdx`) |
| `app-unlock-sheet` | phone | Android app | 720 × 1600 | 9 | Unlocking episodes (`docs/viewer-app/unlocking-episodes.mdx`) |
| `app-vip` | phone | **Wireframe** | — | 4 | VIP (`docs/viewer-app/vip.mdx`) |
| `app-wallet` | phone | Android app | 720 × 1600 | 9 | Coins, the store and the wallet (`docs/viewer-app/coins-and-wallet.mdx`) |
| `creator-community` | browser | Creator Portal | 1600 × 1000 | 8 | Comments and reviews (`docs/creator/comments-and-reviews.mdx`) |
| `creator-dashboard` | browser | Creator Portal | 1600 × 1590 | 8 | Home (`docs/creator/home.mdx`) |
| `creator-earnings` | browser | Creator Portal | 1600 × 1000 | 7 | Earnings (`docs/creator/earnings.mdx`) |
| `creator-episode-editor` | browser | Creator Portal | 1600 × 1422 | 10 | AI episode editor (`docs/creator/ai-episode-editor.mdx`) |
| `creator-home` | browser | Creator Portal | 1600 × 1000 | 8 | The Creator Portal (`docs/creator/overview.mdx`) |
| `creator-my-series` | browser | Creator Portal | 1600 × 1000 | 6 | My series (`docs/creator/series.mdx`) |
| `creator-new-series` | browser | Creator Portal | 1600 × 3088 | 8 | Create and edit a series (`docs/creator/create-series.mdx`) |
| `creator-release-times` | browser | Creator Portal | 1600 × 1000 | 7 | Release times (`docs/creator/release-times.mdx`) |
| `creator-series-page` | browser | Creator Portal | 1600 × 1260 | 8 | My series (`docs/creator/series.mdx`) |
| `creator-sign-in` | browser | Creator Portal | 1600 × 1000 | 8 | Becoming a creator (`docs/creator/becoming-a-creator.mdx`) |
| `creator-stats` | browser | Creator Portal | 1600 × 1000 | 6 | Stats (`docs/creator/stats.mdx`) |
| `creator-upload` | browser | Creator Portal | 1600 × 1000 | 9 | Upload episodes (`docs/creator/upload-episodes.mdx`) |
| `installer-requirements` | browser | Web installer | 1600 × 1228 | 8 | Web installer (`docs/installation/web-installer.mdx`) |
