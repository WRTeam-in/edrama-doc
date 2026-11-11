---
sidebar_position: 1
title: Admin Panel
description: What the eDrama backend and Admin Panel are, and the order to set them up in.
---

# Admin Panel

Thank you for purchasing **eDrama**. This section shows you how to install the backend on your server and configure every part of it from the Admin Panel.

<DocBanner />

## What you are installing

One Laravel application gives you:

- the **Admin Panel** at `/admin`, where your team runs the platform (its sidebar and title call it **Studio**);
- the **Creator Portal** at `/creator`, where approved creators upload their series ([Creator Portal guide](/creator-portal/));
- the **REST API** at `/api/v1`, used by the app and the website;
- **share pages** (`/s/…`, `/c/…`) and your **legal pages** (`/legal/…`).

## Contact

**By:** WRTeam
**Project lead and main support:** Bhavik Pindoriya, [wrteam.bhavik@gmail.com](mailto:wrteam.bhavik@gmail.com)
All contacts are on the [Support](/support/) page.

## Set it up in this order

<Steps>
<Step title="Check your server">

[Server requirements](./requirements.md): PHP 8.5, MySQL 8, HTTPS, a cron job, and ffmpeg or Cloudflare Stream for videos.

</Step>
<Step title="Upload and install">

[Upload the code](./upload.md), then run the [installation wizard](./installation.md).

</Step>
<Step title="Start the background jobs">

[Cron and background jobs](./background-jobs.md). Without them no video is processed and no email or push is sent.

</Step>
<Step title="Fill in the settings">

[Branding](./settings/branding.md), [email](./settings/email.md), [storage and video](./settings/storage-and-video.md), [Firebase](./settings/firebase-and-notifications.md), [payments](./settings/payments.md), [app and support](./settings/app-and-support.md) and the rest under **Settings**.

</Step>
<Step title="Set your prices">

[Monetization](./monetization.md): regions, coin packs, VIP plans, ads and rewards.

</Step>
<Step title="Go live">

Follow the [go-live checklist](./go-live-checklist.md).

</Step>
</Steps>
