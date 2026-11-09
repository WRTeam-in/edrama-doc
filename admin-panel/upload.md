---
sidebar_position: 3
title: Upload the code
description: Put the eDrama backend on your server and point your domain at it.
---

# Upload the code

## Before you start

- A domain or sub-domain for the backend, such as `admin.your-domain.com`, with SSL.
- An empty MySQL 8 database, its user and password (create them in cPanel › **MySQL Databases**, or with your host's tools).
- Your CodeCanyon purchase code.

## Steps

<Steps>
<Step title="Unzip the download">

Unzip the file you downloaded from CodeCanyon. The backend is a Laravel project: it has `app`, `public`, `vendor` folders and an `artisan` file. Everything it needs, including `vendor/`, is already inside. You don't need to run Composer or npm.

</Step>
<Step title="Upload it">

Upload the backend's files to a folder on your server, for example `/home/youruser/edrama`. Upload hidden files too (the `.env` file), and keep the folder structure as it is.

</Step>
<Step title="Point the domain at the public folder">

Set your domain's **document root** to the backend's **`public`** folder, for example `/home/youruser/edrama/public`.

- **cPanel:** Domains › your domain › **Manage** › Document Root.
- **Nginx:** `root /home/youruser/edrama/public;` with requests passed to `index.php`, as in [Laravel's Nginx guide](https://laravel.com/docs/deployment#nginx).

Only the `public` folder should be reachable from the web. The `.env` file and the rest of the code must not be.

</Step>
<Step title="Open your domain">

Open `https://admin.your-domain.com/install` to start the installation wizard.

</Step>
</Steps>

Continue with the [installation wizard](./installation.md).
