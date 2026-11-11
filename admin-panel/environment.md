---
sidebar_position: 13
title: The .env file
description: The settings in the backend's .env file that you may need to change.
---

# The `.env` file

Most settings live in the Admin Panel. A few, which change only when you deploy, are in the backend's `.env` file. The installer fills in the essential ones.

Some keys below are in `.env` with a `#` in front: remove the `#` to use them. A key that isn't there at all can be added on its own line.

After you edit `.env`, run:

```bash
php artisan config:clear
```

:::danger Keep it private
`.env` holds your database password and the app key. It must never be reachable from the web: your domain must point at the `public` folder only ([Upload the code](./upload.md)).
:::

## Written by the installer

`APP_URL`, `APP_KEY`, `APP_ENV=production`, `APP_DEBUG=false`, the `DB_*` database settings, `SESSION_DRIVER`, `CACHE_STORE` and `QUEUE_CONNECTION` (all `database`), `EDRAMA_INSTALLER=false` and `EDRAMA_LICENSE_ENFORCED=true`. Leave these as they are unless your server changes. If you move to another domain, change `APP_URL` too: the purchase code is registered to its domain ([License and updates](./license-and-updates.md#moving-to-another-domain)).

## Ones you may change

| Key | Default | What it does |
|---|---|---|
| `EDRAMA_ANDROID_PACKAGE`, `EDRAMA_ANDROID_SHA256`, `EDRAMA_IOS_APP_ID` | empty | Make share links open your app ([Share links](./share-links.md)) |
| `EDRAMA_QUEUE_WORKER_SCHEDULED` | `true` | The cron job starts the queue workers. Set `false` when Supervisor runs them ([Background jobs](./background-jobs.md)). |
| `EDRAMA_FFMPEG_PATH`, `EDRAMA_FFPROBE_PATH` | not set | Where ffmpeg is, when it isn't on the server's path ([Storage and video](./settings/storage-and-video.md#ffmpeg-on-shared-hosting)) |
| `EDRAMA_APP_CHECK` | `off` | Firebase App Check on the app's API: `off`, `monitor` (log only) or `enforce` ([Mobile App › Firebase](/mobile-app/firebase/#app-check)) |
| `EDRAMA_APP_CHECK_APP_IDS` | empty | Limit App Check to these Firebase app IDs, comma-separated. Empty allows every app of the project. |
| `EDRAMA_DEFAULT_REGION` | `GLOBAL` | The region code used when none is set as default |
| `EDRAMA_COUNTRY_HEADER` | `CF-IPCountry` | The request header that holds the viewer's country |
| `EDRAMA_BONUS_EXPIRY_DAYS` | `7` | A fallback for bonus coin expiry. Set it per region in Monetization › Rewards › **Bonus coins expire after**. |
| `EDRAMA_API_RATE_LIMIT_PER_MINUTE` | `300` | API requests per minute for each viewer |
| `EDRAMA_UPDATE_MAX_MB` | `300` | The largest update zip the Admin Panel accepts, in MB |
| `EDRAMA_CORS_ORIGINS` | empty | Extra web origins allowed to call the API from a browser, comma-separated |
| `EDRAMA_SUPPORT_EMAIL` | `support@example.com` | Used until Settings › App & support › **Support email** is saved. Set one of the two, or the app shows the example address. |
| `EDRAMA_ALERT_EMAILS`, `EDRAMA_ALERT_SLACK_WEBHOOK_URL` | empty | Used until Settings › Notifications › **System alerts** is saved |
| `MAIL_*` | `log` | Server email settings, used until Settings › **Email delivery (SMTP)** is saved |

## Leave these off

| Key | Why |
|---|---|
| `EDRAMA_DEMO_MODE` | Turns both panels read-only with "Sign in as" buttons. Only for a public demo. |
| `EDRAMA_FAKE_FIREBASE_TOKENS` | For local development only. Never on a live server. |
| `APP_DEBUG` | `true` shows error details to everyone. Keep it `false`. |
