---
sidebar_position: 2
title: Server requirements
description: What your server needs to run eDrama, on a VPS or on shared hosting.
---

# Server requirements

The installation wizard checks the PHP version, the extensions and the writable folders for you, and marks anything missing. Check the rest with your host.

## Required

The web installer checks all of these and marks anything missing in red.

| Requirement | Details |
|---|---|
| **PHP** | 8.5.0 or newer |
| **PHP extensions** | bcmath, ctype, curl, fileinfo, gd, intl, json, mbstring, openssl, pdo_mysql, sodium, tokenizer, xml, zip |
| **PHP function** | `proc_open` must be allowed (not in `disable_functions`): the cron line starts each task through it, and ffmpeg runs through it |
| **Framework** | Nothing to install: the backend is built on **Laravel 13** and **Filament 5**, and ships with everything it needs. |
| **Writable during installation** | The backend folder itself, so the installer can rewrite `.env` there safely. |
| **Recommended** | The `pcntl` extension, so a background job that hangs is stopped at its time limit |
| **Database** | MySQL 8 (an empty database) |
| **Writable by the web server** | `storage`, `storage/app`, `storage/framework/cache`, `storage/framework/sessions`, `storage/framework/views`, `storage/logs`, `bootstrap/cache`, and the `.env` file |
| **Video processing** | ffmpeg and ffprobe, unless you use Cloudflare Stream ([details](/admin-panel/settings/storage-and-video/#ffmpeg)) |
| **Background work** | One cron entry every minute; supervisor is recommended on a VPS ([details](/admin-panel/background-jobs/)) |
| **Web server** | Apache or nginx, with the domain pointing at the package's `public` folder |
| **Upload size** | At least 16 MB for `upload_max_filesize` and `post_max_size` (videos upload in 8 MB pieces), and the same for the web server's body limit (nginx `client_max_body_size` is only 1 MB by default). Higher if you'll install update packages or import AI Studio clips from the browser (up to 300 MB). |
| **Outgoing HTTPS** | The server must reach WRTeam's license server (to check your purchase code), Firebase, the stores and your video service. |
| **HTTPS** | An SSL certificate on your domain: the app and the website only talk to `https://` servers. |

:::tip[Which server?]
A small VPS (2 CPU cores, 4 GB of memory) handles a launch comfortably. Video processing is the heaviest job: every upload is turned into four qualities on your server. If your hosting is small, choose **Cloudflare Stream** in <Path>Settings › Storage & video</Path> and your server does no video work at all.
:::

## Video: pick one

Every uploaded episode is turned into adaptive streaming video (1080p, 720p, 480p and 360p). Something has to do that work:

| Option | What you need | Good for |
|---|---|---|
| **This server** (the default) | **ffmpeg** on the server | Getting started and small catalogues |
| **Amazon S3** | ffmpeg on the server, plus an S3 bucket (or S3-compatible: MinIO, DigitalOcean Spaces, Wasabi) | Growing catalogues: storage grows without filling your disk |
| **Cloudflare Stream** | A Cloudflare account with Stream. **No ffmpeg needed.** | No video work on your server. Cloudflare bills for minutes stored and watched. |

You choose in [Settings › Storage & video](./settings/storage-and-video.md), and you can switch later.

## A typical domain layout

| Address | What runs there |
|---|---|
| `admin.your-domain.com` | This package: the Admin Panel (`/admin`), the Creator Portal (`/creator`), the API (`/api/v1`), share pages (`/s/…`, `/c/…`) and legal pages (`/legal/…`) |
| `your-domain.com` or `www.your-domain.com` | The public [website](/website/), hosted separately |

## VPS or shared hosting?

Both work.

- **VPS** (recommended for video): install ffmpeg with `sudo apt install ffmpeg`. You can run the background workers with Supervisor for the fastest processing ([Background jobs](./background-jobs.md#on-a-vps-supervisor-optional)).
- **Shared hosting (cPanel)**: eDrama runs its background jobs from the single cron job, so no long-running process is needed. For video, either [set up a ready-made ffmpeg](./settings/storage-and-video.md#ffmpeg-on-shared-hosting) in your home folder or use Cloudflare Stream. Choose PHP 8.5 in cPanel's **MultiPHP Manager** (or **Select PHP Version**).

:::caution Shared hosting and long videos
Transcoding needs CPU and memory. If your host stops long jobs ("Killed" or "Cannot allocate memory"), use Cloudflare Stream or move to a VPS.
:::

Step by step: [Prepare a VPS](/admin-panel/vps-server/) or [Shared hosting (cPanel)](/admin-panel/shared-hosting/).

## Upload size

Episode files upload in 8 MB pieces, and images and documents in the panels go up to 10 MB. Set PHP's `upload_max_filesize` and `post_max_size`, and your web server's body limit (Nginx `client_max_body_size`, 1 MB by default), to at least **16 MB**. To install an update from the Admin Panel, they must also be larger than the update zip ([License and updates](./license-and-updates.md)).

The largest episode file is set in [Settings › Video pipeline](./settings/video-pipeline.md) (20 GB by default, up to 200 GB), and the longest episode is 15 minutes.
