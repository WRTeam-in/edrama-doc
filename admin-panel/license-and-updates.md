---
sidebar_position: 11
title: License and updates
description: Your purchase code, moving to another domain, and installing an update package.
---

# License and updates

<AdminPath path="System › License & updates" /> shows your licence (**Purchase code**, **Domain**, **Buyer**, **Last checked**), the **Installed version** and the **Update history**. Members with Settings access can open the page. Only the Owner can **Activate license**, **Reset purchase code** or **Upload update**.

## The licence

Your purchase code is registered to your domain during installation. The domain is the one in `APP_URL` in `.env`, without `www.`. The Admin Panel and the Creator Portal only open on a domain with an active code. The app, the website and the API keep working whatever the licence check says.

The code is checked again at most every 7 days. If the licence server can't be reached, nothing locks. The panels lock only when the code is clearly invalid or registered to another domain. A locked panel shows **Activate your purchase**: enter the purchase code and click **Activate**.

### Moving to another domain

<Steps>
<Step title="Free the code">

On the old domain, click **Reset purchase code**. Both panels there lock until it's activated again.

</Step>
<Step title="Move the backend">

Copy the backend folder and the database to the new server, or point the new domain at the same folder. In `.env`, set `APP_URL` to the new address, such as `https://admin.new-domain.com`, then run `php artisan config:clear`.

</Step>
<Step title="Activate it on the new domain">

Open the Admin Panel on the new domain. It shows **Activate your purchase**: enter the same purchase code and click **Activate**.

</Step>
</Steps>

## Updating eDrama

Updates come as a zip from CodeCanyon, holding `version_info.json` and `source_code.zip`.

<Steps>
<Step title="Back up">

Back up your **database** and your `storage` folder first. Run the update at a quiet time.

</Step>
<Step title="Upload the update">

Click **Upload update** and choose the update zip. The purchase code is checked with the licence server first, so it must be reachable. Then files are replaced, new database migrations run and the caches are cleared. Every file it replaces is backed up first, in a zip in `storage/app/private/updates`.

The zip goes through PHP's upload, so `upload_max_filesize` and `post_max_size` must be larger than it. If you can't raise them, ask [support](/support/).

</Step>
<Step title="Restart the workers">

```bash
php artisan queue:restart
```

</Step>
</Steps>

Updates go **one version at a time**: an update from 1.1.0 to 1.2.0 is refused on 1.0.0, so apply each one in order. An update never touches your `.env` or your uploaded files in `storage`.
