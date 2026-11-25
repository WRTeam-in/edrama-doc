---
sidebar_position: 13
title: The .env file
description: The settings in the backend's .env file that you may need to change.
---

# The `.env` file

The `.env` file in the project folder holds the settings that change only when you deploy: the database connection, the app's address, and a few switches. Almost everything else (branding, keys for Firebase or the stores, prices, features) is set in the Admin Panel instead, so you rarely need to touch this file.

:::warning
`.env` contains your database password and `APP_KEY`, the key that signs every session and encrypts stored secrets. Never share it, never let it be reachable from the web, and keep a copy of `APP_KEY` with your backups: if it is lost, saved keys in Settings can't be read back.
:::

After editing `.env`, apply the change:

```bash title="Server"
php artisan config:cache
php artisan queue:restart
```

(`php artisan config:clear` also works: it reads `.env` on every request until you cache again.)

Some settings are already in `.env` with a `#` in front: remove the `#` to use one. A setting that isn't in the file at all can be added on its own line, as `NAME=value`.

<Anchor id="written-by-the-installer" />

## Set by the installer

| Setting | Meaning |
|---|---|
| `APP_URL` | Your site's address, such as `https://admin.your-domain.com`. |
| `APP_ENV` | `APP_ENV=production` on a live server. The System page warns you if it isn't. |
| `APP_DEBUG` | `APP_DEBUG=false` on a live server, so error pages never show internals. |
| `DB_*` | The database connection. |
| `EDRAMA_INSTALLER` | `EDRAMA_INSTALLER=false` once installed. The installer only opens while this is `true` and no install marker exists. |
| `EDRAMA_LICENSE_ENFORCED` | `EDRAMA_LICENSE_ENFORCED=true` once installed: the purchase code is checked (see [License & updates](/admin-panel/license-and-updates/)). |
| `SESSION_DRIVER`, `CACHE_STORE`, `QUEUE_CONNECTION` | All `database`: sessions, cache and the job queue live in MySQL, so no Redis is needed. |
| `APP_KEY` | Generated once. It signs sessions and encrypts the keys you save in Settings. |

If you move to another domain, change `APP_URL` too: the purchase code is registered to its domain ([License & updates](/admin-panel/license-and-updates/#move-to-another-domain)).

<Anchor id="ones-you-may-change" />

## Settings you might change

| Setting | Default | When to change it |
|---|---|---|
| `EDRAMA_TRUSTED_PROXIES` | empty | Behind Cloudflare's proxy set `cloudflare`; behind your host's CDN or a load balancer set `*` (only when the app can't be reached around it), or list addresses. The System page tells you when it's needed. |
| `EDRAMA_TRUST_APP_COUNTRY` | `true` | Set `false` behind a CDN that always sends the country header, so a viewer's region can only come from the CDN. |
| `EDRAMA_COUNTRY_HEADER` | `CF-IPCountry` | The header holding the viewer's country. |
| `EDRAMA_QUEUE_WORKER_SCHEDULED` | `true` | Set `false` when supervisor runs the queue workers ([Cron & queues](/admin-panel/background-jobs/)). |
| `EDRAMA_CREATOR_PANEL_URL` | empty | Only if the Creator Portal is on a different domain. |
| `EDRAMA_SUPPORT_EMAIL` | `support@example.com` | The support address used until <Path>Settings › App & support</Path> › **Support email** has one. **Set one of the two**, or the app's Help screen and creator emails show the example address. |
| `EDRAMA_DEFAULT_REGION` | `GLOBAL` | The region code used when no region is marked default. |
| `EDRAMA_BONUS_EXPIRY_DAYS` | `7` | A fallback for bonus-coin expiry. The real setting is per region: Monetization › Rewards › **Bonus coins expire after**. |
| `MAIL_*` | `MAIL_MAILER=log` | The server's own email settings, used until <Path>Settings › Email delivery (SMTP)</Path> is saved. With `log`, emails are only written to the log: nobody receives them. |
| `EDRAMA_CORS_ORIGINS` | empty | Extra browser addresses allowed to call the API. |
| `EDRAMA_APP_CHECK` | `off` | Firebase App Check on the viewer API: `off`, `monitor` (log only) or `enforce`. See [Firebase](/admin-panel/settings/firebase-and-notifications/). |
| `EDRAMA_APP_CHECK_APP_IDS` | empty | Limit App Check to these Firebase app IDs. |
| `EDRAMA_FIREBASE_CLOCK_LEEWAY` | `60` | Seconds of clock difference allowed when checking Firebase tokens. Keep the server's clock synced too. |
| `EDRAMA_ANDROID_PACKAGE` | empty | Your Android app ID, so share links open the app ([Deep links](/mobile-app/deep-links/)). |
| `EDRAMA_ANDROID_SHA256` | empty | Your app's signing fingerprints (comma-separated), for the same. |
| `EDRAMA_IOS_APP_ID` | empty | `TEAMID.bundle.id`, for iOS share links. |
| `EDRAMA_PLAYBACK_URL_TTL_SECONDS` | `600` | How long a signed playback link works. |
| `EDRAMA_UPDATE_MAX_MB` | `300` | The largest update package accepted. |
| `EDRAMA_AI_CLIP_MAX_MB`, `EDRAMA_AI_CLIP_MAX_SECONDS`, `EDRAMA_AI_CLIPS_PER_SERIES` | `300`, `1800`, `200` | Limits for videos imported into AI Studio. |
| `EDRAMA_SUPPORT_REPLY_HOURS` | `24` | The reply time the app's Help screen promises. |
| `EDRAMA_SLOW_QUERY_MS` | `500` | Log database queries slower than this. |
| `EDRAMA_API_RATE_LIMIT_PER_MINUTE` | `300` | The overall request limit per viewer per minute. |
| `EDRAMA_ALERT_EMAILS`, `EDRAMA_ALERT_SLACK_WEBHOOK_URL` | empty | Fallbacks for system alerts when Settings has none. |
| `FIREBASE_CREDENTIALS` | empty | Path to a Firebase service-account file, when Settings has none. |
| `EDRAMA_OWNER_NAME`, `EDRAMA_OWNER_EMAIL`, `EDRAMA_OWNER_PASSWORD` | empty | Read by `php artisan edrama:create-owner` in a deploy script ([Server commands](/admin-panel/commands/)). Remove the password once the Owner exists. |
| `EDRAMA_FFMPEG_PATH`, `EDRAMA_FFPROBE_PATH` | empty | See [Video processing](/admin-panel/settings/storage-and-video/#ffmpeg). |

<details>
<summary>Advanced: video encoding, rate limits and housekeeping</summary>

You rarely need these. Change one only when a page or WRTeam support tells you to.

| Setting | Default | What it does |
|---|---|---|
| `EDRAMA_VIDEO_MAX_DURATION_SECONDS` | `900` | The longest episode accepted, in seconds (15 minutes). |
| `EDRAMA_TRANSCODE_TIMEOUT` | `540` | How long one ffmpeg run may take, in seconds. Raising it also needs the slow workers' `--timeout` and `DB_QUEUE_RETRY_AFTER` raised. |
| `EDRAMA_TRANSCODE_PRESET` | `veryfast` | The x264 preset: faster presets use less CPU, slower ones make smaller files. |
| `EDRAMA_TRANSCODE_THREADS` | `2` | Encoder threads per ffmpeg run. `0` lets ffmpeg decide; keep it low on shared hosting ("Error while opening encoder"). |
| `EDRAMA_UPLOAD_CHUNK_MB` | `8` | The size of the pieces browsers upload videos in. Must stay below your web server's body limit. |
| `EDRAMA_KEEP_VIDEO_SOURCE` | `true` | Keeps the uploaded original, for re-encoding and storage moves. |
| `EDRAMA_SUBTITLE_DISK` | `files` | The storage subtitle files live on. |
| `EDRAMA_API_ANONYMOUS_IP_PER_MINUTE` | `1200` | Requests per minute from one IP address before sign-in (many phones can share one carrier address). |
| `EDRAMA_API_SESSION_IP_PER_MINUTE` | `300` | Requests per minute per IP address for signed-in sessions. |
| `EDRAMA_MEDIA_PER_MINUTE` | `3000` | Requests per minute per IP address to signed media links (video playlists and segments). |
| `EDRAMA_TABLE_EXPORT_MAX_ROWS` | `50000` | The most rows one table download holds. Filter for more. |
| `EDRAMA_IMPORT_MAX_ROWS` | `1000` | The most rows one bulk-import file holds. |
| `EDRAMA_FAILED_JOB_DAYS` | `30` | Failed jobs older than this are deleted daily. |
| `EDRAMA_WEBHOOK_EVENT_DAYS` | `90` | Processed store and video notifications older than this are deleted daily (at least 7). |
| `EDRAMA_AD_LIMIT_MODE` | `per_ad_unit` | The starting value for whether unlock ads and Rewards ads share one daily limit (`shared`). Change it per region in Monetization › Ads instead. |
| `EDRAMA_IDEMPOTENCY_TTL_HOURS`, `EDRAMA_IDEMPOTENCY_LOCK_SECONDS` | `24`, `60` | How long a purchase or unlock request is remembered, so a retried request never charges twice. |

</details>

<Anchor id="leave-these-off" />

## Leave these alone

| Setting | Why |
|---|---|
| `EDRAMA_DEMO_MODE`, `EDRAMA_DEMO_*` | Only for WRTeam's public demo server: makes both panels read-only. Keep them off. |
| `EDRAMA_FAKE_FIREBASE_TOKENS` | Developer testing only. Never `true` in production. |
| `APP_KEY` | Changing it makes saved secrets unreadable. If you must replace it, put the old key in `APP_PREVIOUS_KEYS`. |
| `APP_DEBUG` | `true` shows error details, including secrets, to everyone. Keep it `false`. |
| `EDRAMA_LICENSE_VALIDATOR_URL`, `EDRAMA_LICENSE_ITEM_ID` | Where and how your purchase code is checked. Changing them stops the license check working. |
| `EDRAMA_APP_LANGUAGES`, `EDRAMA_VIDEO_PROVIDER` | Starting values the installer uses. Change languages and the video provider in Settings instead. |
