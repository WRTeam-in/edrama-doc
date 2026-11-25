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

## What you'll need

<Cards
  columns={2}
  items={[
    {icon: 'server', title: 'A server', text: 'A VPS (recommended) or shared hosting with PHP 8.5, MySQL 8 and the ability to run ffmpeg.', to: '/admin-panel/vps-server/'},
    {icon: 'globe', title: 'A domain with HTTPS', text: 'Such as admin.your-domain.com, pointed at the server, with an SSL certificate.', to: '/admin-panel/vps-server/'},
    {icon: 'shield', title: 'Your purchase code', text: 'From your CodeCanyon downloads page. It is registered to your domain.', to: '/admin-panel/license-and-updates/'},
    {icon: 'book', title: 'An empty MySQL database', text: 'A database name, a user that can create and change tables, and its password.', to: '/admin-panel/installation/'},
  ]}
/>

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

Prepare the server ([VPS](/admin-panel/vps-server/) or [shared hosting](/admin-panel/shared-hosting/)), [upload the code](./upload.md), then run the [installation wizard](./installation.md).

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

## What's in the download

Your CodeCanyon download holds one zip per part, each named with its version:

| Zip | What it is | Guide |
|---|---|---|
| `edrama-backend-<version>.zip` | The server: Admin Panel, Creator Portal, API and installer | This section |
| `edrama-app-<version>.zip` | The Flutter app for Android and iOS | [Mobile app setup](/mobile-app/) |
| `edrama-website-<version>.zip` | The public website (Next.js) | [Website](/website/) |

Inside the backend zip:

| Folder or file | What it is |
|---|---|
| `app`, `bootstrap`, `config`, `database`, `lang`, `resources`, `routes` | The application. |
| `vendor` | Every PHP library it uses, already included. |
| `public` | The only folder the internet should see. Your domain points here. |
| `public/build` | The panels' styles and scripts, already built. |
| `storage` | Logs, sessions, uploads (when files stay on this server). |
| `.env` | The settings file. The installer fills it in. Some computers hide files whose names start with a dot: make sure it is uploaded. |
| `.htaccess` | Used only when your domain can't point at `public` (see [Shared hosting](/admin-panel/shared-hosting/)). |
| `docs/deploy/` | A ready-made `supervisor.conf` ([Cron & queues](/admin-panel/background-jobs/)) and `ffmpeg-shared-hosting.md` ([Video processing](/admin-panel/settings/storage-and-video/#ffmpeg)). |
| `artisan` | The command-line tool for the [server commands](/admin-panel/commands/). |

<HelpBanner title="Want WRTeam to install it?" text="Our team can prepare the server, run the installer and set up cron, queues and ffmpeg for you." />
