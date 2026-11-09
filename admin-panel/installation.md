---
sidebar_position: 4
title: Installation wizard
description: The four steps of the eDrama web installer, and what happens when you press Install.
---

# Installation wizard

Open `https://admin.your-domain.com/install`. The wizard has four steps: **Requirements**, **Purchase code**, **Database** and **Owner account**.

<Steps>
<Step title="Requirements">

The wizard checks the PHP version, every PHP extension, and that `storage`, `bootstrap/cache` and `.env` are writable. Anything **Missing** is marked. Fix it (or ask your host to), then press **Check again**.

</Step>
<Step title="Purchase code">

Enter your **Purchase code**. Find it on your CodeCanyon downloads page: [Where is my purchase code?](https://help.market.envato.com/hc/en-us/articles/202822600-Where-Is-My-Purchase-Code-)

The code is registered to this domain. One purchase code is for one domain.

</Step>
<Step title="Database">

Enter the **Site address** (your backend's full address, such as `https://admin.your-domain.com`), and the MySQL **Host**, **Port**, **Database name**, **Username** and **Password**. The database must be empty.

The wizard tests the connection before it moves on, then writes these settings to `.env`.

</Step>
<Step title="Owner account">

Create the **Owner**: the Super Admin who can do everything, including managing the team. Enter a **Name**, a **Work email** and a **Password** of 12 characters or more.

Tick **Import demo data so you can look around first** if you want sample dramas, creators, viewers and figures to explore. You can remove all of it later (see [First steps](./first-steps.md#demo-data)).

Press **Install**. Setting up the database can take a minute.

</Step>
</Steps>

## What Install does

1. Creates every database table and the reference data: regions, coin packs, VIP plans, ad and reward settings, role templates and default settings.
2. Activates your purchase code.
3. Creates the Owner account.
4. Switches `.env` to production: `APP_ENV=production`, `APP_DEBUG=false`, database sessions, cache and queue.
5. Links the public storage folder (`php artisan storage:link`).
6. Closes the installer. From now on `/install` answers **404**.
7. Imports the demo data, if you ticked it.

When it's done, **Your studio is ready** appears. Click **Go to sign-in** and sign in at `/admin` with the Owner account.

## Troubleshooting

- **"Could not connect to the database"**: check the host (often `localhost` on shared hosting), port (`3306`), database name, username and password, and that the user has all privileges on the database.
- **"The install could not finish"**: the message says why. Fix it and press **Install** again. What was already set up is kept.
- **"The demo data could not be imported"**: the install itself finished. The reason is in `storage/logs`. Import it later with `php artisan edrama:demo-data`.
- **The purchase code is refused**: check you copied the whole code. If it's registered to another domain, contact [support](/support/).

Next: [start the background jobs](./background-jobs.md).
