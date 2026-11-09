---
sidebar_position: 11
title: License and updates
description: Your purchase code, moving to another domain, and installing an update package.
---

# License and updates

<AdminPath path="System › License & updates" /> shows your licence (**Purchase code**, **Domain**, **Buyer**, **Last checked**), the **Installed version** and the **Update history**. Only the Owner can activate, reset or upload updates.

## The licence

Your purchase code is registered to your domain during installation. The Admin Panel and the Creator Portal only open on a domain with an active code. The app, the website and the API keep working whatever the licence check says.

The code is checked again at most every 7 days. If the licence server can't be reached, nothing locks. The panels lock only when the code is clearly invalid or registered to another domain.

### Moving to another domain

<Steps>
<Step title="Free the code">

On the old domain, click **Reset purchase code**. Both panels there lock until it's activated again.

</Step>
<Step title="Activate it on the new domain">

Open the Admin Panel on the new domain and **Activate** with the same purchase code.

</Step>
</Steps>

## Updating eDrama

Updates come as a zip from CodeCanyon, holding `version_info.json` and `source_code.zip`.

<Steps>
<Step title="Back up">

Back up your **database** and your `storage` folder first. Run the update at a quiet time.

</Step>
<Step title="Upload the update">

Click **Upload update** and choose the update zip. Files are replaced and new database migrations run. Every file it replaces is backed up first, in `storage/app/private/updates`.

</Step>
<Step title="Restart the workers">

```bash
php artisan queue:restart
```

</Step>
</Steps>

Updates go **one version at a time**: an update from 1.1.0 to 1.2.0 is refused on 1.0.0, so apply each one in order. An update never touches your `.env` or your uploaded files in `storage`.
