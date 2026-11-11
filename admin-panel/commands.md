---
sidebar_position: 12
title: Commands
description: The artisan commands you may run on the server, and the ones that run by themselves.
---

# Commands

Run these from the backend's folder, in a terminal or over SSH.

## Ones you may run

| Command | What it does |
|---|---|
| `php artisan edrama:create-owner` | Creates the Owner once, if the installer didn't. Refuses when an Owner already exists. It asks for the name, email and password. When `EDRAMA_OWNER_NAME`, `EDRAMA_OWNER_EMAIL` and `EDRAMA_OWNER_PASSWORD` are set in `.env` (for a deploy script), it reads them instead: remove the password once the Owner exists. |
| `php artisan edrama:demo-data` | Imports the demo data. Adds nothing if it's already there. Asks to confirm on a production server (`--force` skips the question). |
| `php artisan edrama:video-webhook` | Registers the Cloudflare Stream webhook and saves its secret ([Storage and video](./settings/storage-and-video.md#cloudflare-stream)). |
| `php artisan edrama:video-status <episode-id> --refresh` | Shows one episode's video status, asking the video service again with `--refresh`. |
| `php artisan edrama:review-account <email>` | Creates (or resets) an app account that signs in with email and password, for Google Play and App Store reviewers. It asks for the password. Needs Email/Password sign-in turned on in the Firebase console. |
| `php artisan edrama:move-stream-videos` | Moves every episode video off Cloudflare Stream (same as the button on Storage & video). |
| `php artisan edrama:creator-report --month=2026-10` | Builds the monthly creator report for a month again (last month when `--month` is left out). |
| `php artisan queue:restart` | Makes running workers load new code. Run after every update. |
| `php artisan config:clear` | Run after editing `.env`. |

## Ones that run by themselves

These run from the cron job ([Background jobs](./background-jobs.md)). You don't need to run them.

`edrama:publish-episodes`, `edrama:send-scheduled-pushes`, `edrama:expire-bonuses`, `edrama:release-held-pushes`, `edrama:vip-renewal-reminders`, `edrama:rank-top-titles`, `edrama:roll-up-title-stats`, `edrama:roll-up-daily-metrics`, `edrama:roll-up-creator-stats`, `edrama:wallet-reconcile`, `edrama:store-voided-purchases`, `edrama:prune-exports`, `edrama:prune-job-runs`, `edrama:prune-video-uploads`, `edrama:creator-report` and `edrama:work-queues`.

:::caution
`edrama:wallet-reconcile` only **reports** a wallet that doesn't match its coin history. It never changes anything.
:::

Other `edrama:` commands in `php artisan list` (`seed-demo`, `load-test-seed`, `ad-verify`, `video-upload`) are for development and testing. Don't run them on a live server.
