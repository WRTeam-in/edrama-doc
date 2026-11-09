---
sidebar_position: 7
title: Storage and video
description: Where files and videos live (this server, Amazon S3 or Cloudflare Stream), ffmpeg, and how to switch.
---

# Storage and video

**Where:** <AdminPath path="System › Settings › Storage & video" />

Pick where your images, documents and episode videos live, and who turns uploaded videos into streaming video.

<DomainInput />

## The three options

<Shot src="/images/admin/storage.webp" alt="Settings, Storage and video: the Local storage, Amazon S3 and Cloudflare Stream cards" caption="Each option shows what it needs. Here ffmpeg is found, and S3 and Cloudflare Stream still need keys." />

| Option | Images and documents | Episode videos | You need |
|---|---|---|---|
| **Local storage** (default) | This server's disk | Transcoded here with ffmpeg, streamed through signed links | ffmpeg on the server |
| **Amazon S3** | Your S3 bucket | Transcoded here with ffmpeg, then stored and streamed from S3 through signed links | ffmpeg, and S3 bucket keys |
| **Cloudflare Stream** | Stay where they are | Cloudflare uploads, transcodes and streams them | Cloudflare Stream keys. No ffmpeg. |

Each card shows whether it's **Ready** or **Needs setup**, and what's missing. Videos are made in 1080p, 720p, 480p and 360p, and the app picks the quality for each viewer's connection.

## How switching works

- Moving between this server and Amazon S3 **copies every file first**, in batches, checks each copy, and switches only when all of them are there. The page shows the progress, and you can **Retry failed files**, **Resume** or **Cancel move**.
- **Nothing is ever deleted** from where it was, and links in the app keep working throughout.
- Changing who handles videos applies to **new uploads**. Videos already uploaded keep playing from where they are.
- Leaving Cloudflare Stream? **Move videos off Cloudflare Stream** downloads each video, transcodes it here and stores it with your other files. Viewers keep playing the Stream video until its copy is ready.
- While Amazon S3 holds your files, its bucket, region and endpoint can't change. Keys can be replaced at any time.

## ffmpeg

### On a VPS

```bash
sudo apt install ffmpeg
```

Reload the Storage & video page. It shows **ffmpeg 7.x on this server** (or your version) in green.

### ffmpeg on shared hosting

On cPanel you can't install programs, but you can download a ready-made ffmpeg into your home folder. Run these in cPanel › **Terminal** (or over SSH).

<Steps>
<Step title="Check the server allows it">

```bash
php -v
php -r 'var_dump(function_exists("proc_open"));'
uname -m
```

You need PHP **8.5**, `bool(true)`, and `x86_64`. If `proc_open` is `false`, remove it from `disable_functions` in cPanel › **Select PHP Version › Options** (or **MultiPHP INI Editor**), or ask your host. If `uname -m` prints `aarch64`, use `arm64` instead of `amd64` below.

</Step>
<Step title="Download ffmpeg">

```bash
cd ~
mkdir -p ffmpeg
cd ffmpeg
wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz
tar -xf ffmpeg-release-amd64-static.tar.xz --strip-components=1
chmod +x ffmpeg ffprobe
rm ffmpeg-release-amd64-static.tar.xz
~/ffmpeg/ffmpeg -version
```

No `wget`? Use `curl -LO` with the same address.

</Step>
<Step title="Check the hosting can transcode">

```bash
~/ffmpeg/ffmpeg -y -f lavfi -i testsrc=size=1080x1920:rate=25 -t 2 -c:v libx264 -preset veryfast ~/ffmpeg/test.mp4 && echo "ENCODE OK"
rm -f ~/ffmpeg/test.mp4
```

**ENCODE OK** means it can. "Killed" or "Cannot allocate memory" means the hosting is too small for video: use Cloudflare Stream or a VPS.

</Step>
<Step title="Tell eDrama where ffmpeg is">

In your backend's folder:

```bash
grep -q '^EDRAMA_FFMPEG_PATH=' .env || echo "EDRAMA_FFMPEG_PATH=$HOME/ffmpeg/ffmpeg" >> .env
grep -q '^EDRAMA_FFPROBE_PATH=' .env || echo "EDRAMA_FFPROBE_PATH=$HOME/ffmpeg/ffprobe" >> .env
php artisan config:clear
php artisan optimize
```

</Step>
<Step title="Check it">

Refresh **Storage & video**: the ffmpeg line turns green within a minute. Then upload one short episode in <AdminPath path="Content › Upload & pipeline" />. It should go **Uploading → Processing → Ready** within a few minutes.

</Step>
</Steps>

The backend's `docs/deploy/ffmpeg-shared-hosting.md` has the same steps with more troubleshooting.

## Amazon S3

Create a bucket and an IAM user with access to it in the [AWS console](https://console.aws.amazon.com/s3/), then add its keys under **Connections** › **Amazon S3 bucket**:

| Field | What to enter |
|---|---|
| **Access key ID**, **Secret access key** | The IAM user's access key |
| **Region** | The bucket's region, such as `eu-central-1` |
| **Bucket** | The bucket name |
| **Endpoint** | Only for an S3-compatible service (MinIO, DigitalOcean Spaces, Wasabi). Leave empty for Amazon S3. |
| **Public URL** | Optional. Where media can be read publicly, such as a CloudFront domain, or the bucket URL with a policy allowing `media/*`. Empty: media is served through signed links that last six days. |

Media goes under `media/`, and private files and videos under `files/`. Then choose **Amazon S3** and confirm. If you use the website, add the bucket's host to its `EDRAMA_IMAGE_HOSTS` ([Website › Connect](/website/connect/)).

## Cloudflare Stream

<Steps>
<Step title="Turn on Stream">

In the [Cloudflare dashboard](https://dash.cloudflare.com/), open **Stream** and subscribe. Note your **Account ID** (shown on the account's overview page) and your **Customer subdomain** (`customer-….cloudflarestream.com`, shown on the Stream pages).

</Step>
<Step title="Create an API token">

My Profile › **API Tokens** › **Create Token** › Custom token, with the permission **Account › Stream › Edit** for your account. Copy the token.

</Step>
<Step title="Create a signing key">

Signed playback stops anyone from playing your videos outside the app. Create a key with Cloudflare's API:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/keys" \
  -H "Authorization: Bearer <API_TOKEN>"
```

The answer has an `id` (the **Signing key ID**) and a `pem` (the **Signing key**). Copy both. The `pem` can be pasted as Cloudflare returns it.

</Step>
<Step title="Add the keys">

Under **Connections** › **Cloudflare Stream**, add the **Account ID**, **API token**, **Signing key ID**, **Signing key** and **Customer subdomain**. Press **Test connection**.

</Step>
<Step title="Register the webhook">

Cloudflare tells eDrama when a video is ready through a webhook. From the backend's folder, run:

```bash
php artisan edrama:video-webhook
```

It registers <ServerUrl path="/api/v1/webhooks/video" /> with Cloudflare and saves the **Webhook secret** it returns. Pass a different address as an argument if your Admin Panel's address differs.

</Step>
<Step title="Switch">

Choose **Cloudflare Stream** and confirm. New uploads go to Cloudflare from now on.

</Step>
</Steps>

To check one episode's video from the terminal: `php artisan edrama:video-status <episode-id> --refresh`.
