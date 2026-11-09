---
sidebar_position: 2
title: Server requirements
description: What your server needs to run eDrama, on a VPS or on shared hosting.
---

# Server requirements

The installation wizard checks these for you and highlights anything missing.

## Required

| Requirement | Details |
|---|---|
| **PHP** | **8.5.0** or newer |
| **PHP extensions** | `bcmath`, `ctype`, `curl`, `fileinfo`, `gd`, `intl`, `json`, `mbstring`, `openssl`, `pdo_mysql`, `sodium`, `tokenizer`, `xml`, `zip` |
| **Writable** | the `storage` and `bootstrap/cache` folders, and the `.env` file |
| **Database** | An empty **MySQL 8** database, with its user and password |
| **HTTPS** | An SSL certificate on your domain. The app and the website only talk to `https://` servers. |
| **Cron** | One cron job that runs every minute ([Background jobs](./background-jobs.md)) |

Recommended: the `pcntl` extension, so a stuck background job is stopped after its time limit.

The backend is built on **Laravel 13** and **Filament 5**.

## Video: pick one

Every uploaded episode is turned into adaptive streaming video (1080p, 720p, 480p and 360p). Something has to do that work:

| Option | What you need | Good for |
|---|---|---|
| **This server** (the default) | **ffmpeg** on the server, and PHP's `proc_open` function allowed | Getting started and small catalogues |
| **Amazon S3** | ffmpeg on the server, plus an S3 bucket (or S3-compatible: MinIO, DigitalOcean Spaces, Wasabi) | Growing catalogues: storage grows without filling your disk |
| **Cloudflare Stream** | A Cloudflare account with Stream. **No ffmpeg needed.** | No video work on your server. Cloudflare bills for minutes stored and watched. |

You choose in [Settings › Storage & video](./settings/storage-and-video.md), and you can switch later.

## VPS or shared hosting?

Both work.

- **VPS** (recommended for video): install ffmpeg with `sudo apt install ffmpeg`. You can run the background workers with Supervisor for the fastest processing ([Background jobs](./background-jobs.md#on-a-vps-supervisor-optional)).
- **Shared hosting (cPanel)**: eDrama runs its background jobs from the single cron job, so no long-running process is needed. For video, either [set up a ready-made ffmpeg](./settings/storage-and-video.md#ffmpeg-on-shared-hosting) in your home folder or use Cloudflare Stream. Choose PHP 8.5 in cPanel's **MultiPHP Manager** (or **Select PHP Version**).

:::caution Shared hosting and long videos
Transcoding needs CPU and memory. If your host stops long jobs ("Killed" or "Cannot allocate memory"), use Cloudflare Stream or move to a VPS.
:::

## Upload size

Episode files upload in 8 MB chunks, so PHP's `upload_max_filesize` and `post_max_size` only need to be above 8 MB. The largest episode file is set in [Settings › Video pipeline](./settings/video-pipeline.md) (up to 200 GB), and the longest episode is 15 minutes.
