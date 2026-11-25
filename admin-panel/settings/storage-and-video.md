---
sidebar_position: 7
title: Storage and video
description: Where files are kept (this server, Amazon S3 or Cloudflare R2), what processes and streams videos (ffmpeg on this server or Cloudflare Stream), and how to switch safely.
---

# Storage and video

**Where:** <AdminPath path="System › Settings › Storage & video" />

Pick where your images, documents and episode videos live, and what turns uploaded videos into streaming video. By default, everything stays on your own server and videos are processed there with ffmpeg. As you grow, you can move files to a **bucket** (cloud storage) and/or let **Cloudflare Stream** process and stream videos.

<DomainInput />

<Anchor id="the-three-options" />

## Two separate choices

The page makes two choices, apart from each other:

| Choice | Options | What it decides |
|---|---|---|
| **Storage (files)** | **This server** (default), **Amazon S3** (or another S3-compatible service), **Cloudflare R2** | Where images, documents, subtitles and the videos this server makes are kept. |
| **Video streaming** | **This server** (default, with ffmpeg), **Cloudflare Stream** | What processes episode videos and streams them to viewers. Cloudflare Stream works with either storage. |

<Screen
  id="admin-settings-storage"
  type="browser"
  wire="form"
  url="/admin/settings?s=storage"
  title="Storage & video"
  caption="Settings › Storage & video: where files are kept and what streams videos."
  markers={[
    {x: 49, y: 29.9, title: 'Storage (files)', text: 'Where images, documents and subtitles are kept: this server, Amazon S3 or Cloudflare R2.'},
    {x: 76.4, y: 29.5, title: 'Video streaming', text: 'What processes and streams videos: this server (ffmpeg) or Cloudflare Stream.'},
    {x: 52.3, y: 53, title: 'In use', text: 'The option in use now.'},
    {x: 65.5, y: 76.4, title: 'Set up', text: 'An option that needs keys says so; set it up, then switch.'},
    {x: 42.7, y: 82.7, title: 'How switching works', text: 'Files are copied and checked first; nothing is deleted.'},
    {x: 62.9, y: 91.8, title: 'Key cards', text: 'Amazon S3, Cloudflare R2 and Cloudflare Stream, each with “Where do I find these?”.'},
  ]}
/>

Each option shows whether it's **Ready** or **Needs setup**, and what's missing. Press **Switch to …** on a ready option, or **Set up …** to see the steps and add its keys.

Every episode is turned into **adaptive streams**: copies at 1080p, 720p, 480p and 360p (never above the original's quality), plus a poster image, cut into small pieces so the app can switch quality as each viewer's connection changes.

### Which to choose

| Option | Images and documents | Episode videos | You need | Best for |
|---|---|---|---|---|
| **This server** (files) | This server's disk | Kept on this server | Nothing to set up | Getting started and small catalogues. |
| **Amazon S3** | Your S3 bucket | Kept in S3, streamed through signed links | [S3 bucket keys](#amazon-s3) | When you already run on AWS. Amazon bills for every GB viewers download. Works with DigitalOcean Spaces, Wasabi, Backblaze B2 and MinIO too. |
| **Cloudflare R2** | Your R2 bucket | Kept in R2, streamed through signed links | [R2 bucket keys](#cloudflare-r2) | Streaming at scale: R2 has no download fees, so viewers watching costs nothing extra. |
| **This server** (video) | Wherever Storage (files) keeps them | Transcoded here with ffmpeg | [ffmpeg](#ffmpeg) on the server | Keeping videos with your files, at no extra cost. |
| **Cloudflare Stream** | Stay wherever Storage (files) keeps them | Cloudflare uploads, transcodes and streams them | [Cloudflare Stream keys](#cloudflare-stream). No ffmpeg. | No video work on your server. Cloudflare bills for minutes stored and watched. |

## How switching works

<Steps>

1. If the option says **Needs setup**, choose **Set up** and follow the steps: fill in its key card, **Save keys**, then **Test connection**.
2. Choose **Switch to …** and confirm.
3. Moving between this server and a bucket **copies every file first**, in the background, in batches, and **checks** each copy. The switch happens only once every file is there. The page shows the progress.

</Steps>

- **Nothing is ever deleted** from where it was, and links in the app keep working throughout.
- If some files can't be copied, nothing switches: fix the cause and choose **Retry failed files**. You can also **Resume** a stopped move, or **Cancel move** at any time; files already copied are skipped by the next move.
- Changing what handles videos applies to **new uploads**. Videos already uploaded keep playing from the engine that holds them: nothing is moved or deleted. Images, documents and subtitles stay where **Storage (files)** keeps them.
- Leaving Cloudflare Stream? **Move videos off Cloudflare Stream** downloads each episode's video from Cloudflare as MP4, transcodes it here and stores it with your other files. It needs ffmpeg and the Cloudflare Stream keys. Viewers keep playing the Stream video until its copy is ready, and nothing is deleted from Cloudflare.

:::warning A bucket in use can't change
While a bucket holds your files, its service, region, endpoint and name can't change: move back to this server first. Keys can be replaced at any time.
:::

## ffmpeg

**ffmpeg** is the free video program this server uses to make the streams. It's needed when **Video streaming** is **This server**, and to move videos off Cloudflare Stream. With Cloudflare Stream for every video, you don't need it.

### On a VPS

```bash title="Server"
sudo apt install -y ffmpeg
ffmpeg -version | head -1
```

Reload the Storage & video page. It shows **ffmpeg 7.x on this server** (or your version) in green.

<Anchor id="shared-hosting" />

### ffmpeg on shared hosting

On cPanel you can't install programs, but most hosts let you run a ready-made ffmpeg from your home folder. Run these in cPanel › **Terminal** (or over SSH).

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
~/ffmpeg/ffprobe -version
```

No `wget`? Use `curl -LO` with the same address.

</Step>
<Step title="Check the hosting can transcode">

This makes a 2-second 1080p test clip and deletes it:

```bash
~/ffmpeg/ffmpeg -y -f lavfi -i testsrc=size=1080x1920:rate=25 -t 2 -c:v libx264 -preset veryfast ~/ffmpeg/test.mp4 && echo "ENCODE OK"
rm -f ~/ffmpeg/test.mp4
```

**ENCODE OK** means it can. "Killed" or "Cannot allocate memory" means the hosting is too small for video: use Cloudflare Stream or a VPS.

</Step>
<Step title="Tell eDrama where ffmpeg is">

In your backend's folder (the one with the `artisan` file):

```bash
grep -q '^EDRAMA_FFMPEG_PATH=' .env || echo "EDRAMA_FFMPEG_PATH=$HOME/ffmpeg/ffmpeg" >> .env
grep -q '^EDRAMA_FFPROBE_PATH=' .env || echo "EDRAMA_FFPROBE_PATH=$HOME/ffmpeg/ffprobe" >> .env
php artisan config:clear
php artisan optimize
```

</Step>
<Step title="Check it">

Refresh **Storage & video**: the ffmpeg line turns green within a minute (the check is remembered for 60 seconds). If the terminal works but the page stays red, the website's PHP still blocks `proc_open`: fix it for the website's PHP version.

Then upload one short episode in <AdminPath path="Content › Upload & pipeline" />. It should go **Uploading → Processing → Ready** within a few minutes.

</Step>
</Steps>

The backend's `docs/deploy/ffmpeg-shared-hosting.md` has the same steps with more troubleshooting.

### Tuning (optional)

These lines in the server's [`.env`](../environment.md) change how videos are processed. The defaults suit most servers.

| Setting | Default | Meaning |
|---|---|---|
| `EDRAMA_FFMPEG_PATH`, `EDRAMA_FFPROBE_PATH` | found automatically | Where ffmpeg and ffprobe are, if not on the normal path. |
| `EDRAMA_VIDEO_MAX_DURATION_SECONDS` | `900` | The longest episode accepted, in seconds (15 minutes). |
| `EDRAMA_TRANSCODE_TIMEOUT` | `540` | How long one video may take to process, in seconds. |
| `EDRAMA_TRANSCODE_PRESET` | `veryfast` | Slower presets make smaller files but take longer. |
| `EDRAMA_TRANSCODE_THREADS` | `2` in the example file | CPU threads per video; keep it low on shared hosting. `0` lets ffmpeg decide. |
| `EDRAMA_UPLOAD_CHUNK_MB` | `8` | The size of each upload piece. |
| `EDRAMA_KEEP_VIDEO_SOURCE` | `true` | Keep the original upload after processing. AI Studio's episode editor needs it to merge new clips with an episode. |

Run `php artisan config:cache` after changing `.env`.

### If something goes wrong

| What you see | Fix |
|---|---|
| Upload stays **Processing** forever | The background worker isn't running: check the [cron line](../background-jobs.md). |
| Upload goes **Processing**, then **Failed** | The host stopped the long job. Use Cloudflare Stream, or a VPS. |
| "ffmpeg not found on this server" on the Storage & video page | Check `EDRAMA_FFMPEG_PATH`, then `php artisan config:clear`. |
| "Permission denied" running ffmpeg | The host blocks programs in your folder. Ask support, or use Cloudflare Stream. |

The easiest way out of any of these is [Cloudflare Stream](#cloudflare-stream).

## Amazon S3

<Steps>

1. [AWS console › S3](https://console.aws.amazon.com/s3/) › **Create bucket**. Pick the region nearest your viewers (such as `ap-south-1` for India or `eu-central-1` for Europe) and keep **Block all public access** on.
2. [IAM › Users](https://console.aws.amazon.com/iam/home#/users) › **Create user** (such as `edrama-storage`), without console access.
3. Give the user a policy that allows **listing, reading, writing and deleting in this bucket only**.
4. Open the user › **Security credentials › Create access key** › *Application running outside AWS*. Copy the **access key ID** and **secret access key** (shown once).
5. Press **Add keys** under **Connections** › **Amazon S3 bucket** and fill it in (below).

</Steps>

| Field | What to enter |
|---|---|
| **Service** | Amazon S3, or the S3-compatible service you use |
| **Access key ID**, **Secret access key** | The IAM user's access key |
| **Region** | The bucket's region, such as `eu-central-1` |
| **Bucket** | The bucket name |
| **Endpoint** | Only for an S3-compatible service (below). Leave empty for Amazon S3. |
| **Public URL** | Optional. Where media can be read publicly, such as a CloudFront domain, or the bucket URL with a policy allowing `media/*`. Empty: media is served through signed links that last six days. |

Media goes under `media/`, and private files and videos under `files/`: a bucket policy that makes only `media/*` public is enough for a Public URL. Press **Save keys**, then **Test connection**: it writes a small file, reads it back and deletes it. Then press **Switch to Amazon S3** and confirm.

:::tip Using the website?
Add the bucket's host (or its Public URL's host) to the website's `EDRAMA_IMAGE_HOSTS`, or posters won't show there ([Website › Connect](/website/connect/)).
:::

### Another S3-compatible service

DigitalOcean Spaces, Wasabi, Backblaze B2, MinIO and others work through the same **Amazon S3 bucket** card (choose the **Service**):

- **Endpoint**: the provider's S3 address, such as `https://sgp1.digitaloceanspaces.com`, `https://s3.ap-southeast-1.wasabisys.com` or `https://s3.us-west-004.backblazeb2.com`.
- **Region**: the bucket's region there (`sgp1`, `ap-southeast-1`, `us-west-004`), or `us-east-1` / `auto` when any works.

## Cloudflare R2

R2 has **no download fees**, which suits video streaming at scale.

<Steps>

1. [Cloudflare dashboard](https://dash.cloudflare.com/) › **R2 Object Storage › Create bucket** (location Automatic, unless you need EU or FedRAMP).
2. Copy your **account ID** from the R2 overview's Account details.
3. **Manage API tokens › Create API token**, with **Object Read & Write** for this bucket only. Copy the **Access Key ID** and **Secret Access Key** (shown once).
4. Optional: connect a **custom domain** to the bucket for posters and banners, and put it in **Public URL**.
5. On the **Cloudflare R2 bucket** card: account ID, jurisdiction (Default, EU or FedRAMP), keys and bucket name. **Save keys**, then **Test connection**. Then choose **Cloudflare R2** under **Storage (files)**.

</Steps>

Without a public URL, posters and banners are served through secure links that last six days. If you use the website, add the bucket's public host to its `EDRAMA_IMAGE_HOSTS` too.

## Cloudflare Stream

Cloudflare uploads, transcodes and streams the videos; your server does no video work, so ffmpeg isn't needed.

<Steps>
<Step title="Turn on Stream">

In the [Cloudflare dashboard](https://dash.cloudflare.com/), open **Stream** and subscribe. Note your **Account ID** (shown on the account's overview page, or in the address bar after `dash.cloudflare.com/`) and your **Customer subdomain** (`customer-….cloudflarestream.com`, shown on the Stream pages: open any video, its link starts with it).

</Step>
<Step title="Create an API token">

[My Profile › **API Tokens**](https://dash.cloudflare.com/profile/api-tokens) › **Create Token** › Custom token, with the permission **Account › Stream › Edit** for your account. Copy the token (shown once).

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

Under **Connections** › **Cloudflare Stream**, press **Add keys** and enter the **Account ID**, **API token**, **Signing key ID**, **Signing key** and **Customer subdomain**. Leave **Webhook secret** empty: the next step fills it in.

</Step>
<Step title="Register the webhook">

Cloudflare tells eDrama when a video is ready through a webhook.

<Tabs>
<TabItem value="command" label="With one command (recommended)">

From the backend's folder, run:

```bash title="Server"
php artisan edrama:video-webhook
```

It registers <ServerUrl path="/api/v1/webhooks/video" inline /> (the **Webhook URL** on the card) with Cloudflare and saves the **Webhook secret** it returns, straight into Settings. If your Admin Panel answers on a different address, pass it as an argument: `php artisan edrama:video-webhook https://admin.your-domain.com/api/v1/webhooks/video`.

</TabItem>
<TabItem value="api" label="With Cloudflare's API">

```bash title="Register the webhook"
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/ACCOUNT_ID/stream/webhook" \
  -H "Authorization: Bearer API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"notificationUrl": "WEBHOOK_URL_FROM_THE_CARD"}'
```

The answer's `secret` is the **Webhook secret**: paste it on the card and **Save keys**.

</TabItem>
</Tabs>

Now press **Test connection** on the card. It fails until every key, the webhook secret included, is saved, and checks that the signing key belongs to your account.

</Step>
<Step title="Switch">

Press **Switch to Cloudflare Stream** under **Video streaming** and confirm. New uploads go to Cloudflare from now on.

</Step>
</Steps>

Stream's notifications are signed and checked (at most 5 minutes old) before they're stored. Missed ones are caught by a check every 10 minutes. To check one episode's video from the terminal:

```bash title="Server"
php artisan edrama:video-status <episode-id> --refresh
```

Cloudflare's own guides: [Stream webhooks](https://developers.cloudflare.com/stream/manage-video-library/using-webhooks/) and [signed links](https://developers.cloudflare.com/stream/viewing-videos/securing-your-stream/).

Upload limits (largest file, YouTube episodes, creators' limits) are on [Video pipeline](./video-pipeline.md).
