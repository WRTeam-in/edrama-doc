---
sidebar_position: 3
title: Connect to the Admin Panel
description: The website's settings, the Website address and the refresh secret.
---

# Connect to the Admin Panel

The website and the Admin Panel need to know about each other:

- the **website** needs your server's address, to read its content;
- the **Admin Panel** needs the website's address, to show previews and to tell it about changes. The two share a **refresh secret**, so only your Admin Panel can ask the website to refresh.

## The website's settings

They go in `.env.local` on your computer, or in your host's environment variables (on Vercel: **Settings › Environment Variables**).

| Variable | Needed | What it is |
|---|---|---|
| `EDRAMA_API_URL` | **Yes** | Your backend's address **without** `/api`, such as `https://admin.your-domain.com`. Must be `https://` (plain `http://` only works for `localhost`, `127.0.0.1` and `*.test`). |
| `REVALIDATE_SECRET` | Recommended | The refresh secret from the Admin Panel (below). Without it, a publish shows on the website within 5 minutes instead of at once. It must be at least 32 characters, which the Admin Panel's secret always is. |
| `NEXT_PUBLIC_SITE_URL` | No | The website's own address, used only while the Admin Panel has none set. |
| `EDRAMA_IMAGE_HOSTS` | No | Extra hosts images may come from, comma-separated, when your files live on a CDN or an S3 bucket, for example `my-bucket.s3.amazonaws.com,cdn.your-domain.com`. Your backend's host is always allowed. |
| `EDRAMA_SCRIPT_HOSTS` | No | Extra `https://` origins allowed to serve analytics scripts, for self-hosted Plausible or Umami. Plausible, Umami Cloud and Google Analytics are allowed already. |
| `EDRAMA_FRAME_ORIGINS` | No | Other addresses your Admin Panel opens at, comma-separated, that may show the website's live preview. Your backend's own address always may. |
| `APP_ADS_TXT` | No | The lines of `/app-ads.txt`, which AdMob checks on the developer website listed in your store pages. Copy them from AdMob › **Apps** › **app-ads.txt**, one per line (or separated by `\n`). Without it, `/app-ads.txt` is not found. |

`EDRAMA_API_URL`, `EDRAMA_IMAGE_HOSTS`, `EDRAMA_SCRIPT_HOSTS` and `EDRAMA_FRAME_ORIGINS` are also built into the site's security headers and image settings, so after changing any of them, build and deploy the website again.

:::tip Using S3 for files?
If you moved files to Amazon S3 or another S3-compatible bucket in <AdminPath path="System › Settings › Storage & video" />, add the bucket's host (or its **Public URL** host) to `EDRAMA_IMAGE_HOSTS`, or posters won't show on the website.
:::

## In the Admin Panel

<Steps>
<Step title="Open the Connection tab">

Go to <AdminPath path="Content › Website" /> and open the **Connection & history** tab. It shows **This server's address for the website (EDRAMA_API_URL)**: that is the value for `EDRAMA_API_URL`.

</Step>
<Step title="Set the Website address">

In **Website address**, enter where visitors open the website, such as `https://www.your-domain.com`, and click **Save address**. Changing it, and making a secret, needs a role with **Settings** › Edit. It is used for previews, canonical links, the sitemap and share pictures, and to tell the website about changes.

</Step>
<Step title="Make the refresh secret">

Click **Make a secret** (once a secret exists, the button reads **Make a new secret**, and the old one stops working). The secret is **shown once**: copy it and paste it into the website's `REVALIDATE_SECRET`. Then redeploy (or restart) the website so it reads the new value.

</Step>
</Steps>

## Check it worked

1. Change a heading on the **Sections** tab and click **Publish**.
2. Open the website. The new heading shows within a minute.

If it only shows after about 5 minutes:

- the secret doesn't match: make a new one, paste it again and redeploy;
- or the backend's queue isn't running: the refresh call is sent as a background job (see [Background jobs](/admin-panel/background-jobs/)).

## How the refresh works

Each time you publish, or switch the website on or off, the backend sends `POST <Website address>/api/revalidate` with a small JSON body, signed with the refresh secret (`X-Edrama-Signature` header). The website refuses calls that aren't signed with its `REVALIDATE_SECRET` or are more than 5 minutes old. If the call fails, nothing breaks: pages rebuild by themselves every 5 minutes.

The call is only sent to a public address, never to `localhost` or a private network address, so a website running on your computer simply refreshes every 5 minutes.
