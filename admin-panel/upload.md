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

Unzip the file you downloaded from CodeCanyon. Inside is the backend's own zip, `edrama-backend-1.0.0.zip` (the number is the version). It holds one folder with the Laravel project: `app`, `public`, `vendor` and `storage` folders, an `artisan` file and a hidden `.env` file. Everything it needs, including `vendor/`, is already inside. You don't need to run Composer or npm.

</Step>
<Step title="Upload it">

Put the backend's files in a folder on your server, for example `/home/youruser/edrama`, and keep the folder structure as it is.

The easiest way is to upload `edrama-backend-1.0.0.zip` itself and unzip it on the server (cPanel › **File Manager** › **Extract**, or `unzip` over SSH). Then move the files out of the `edrama-backend-1.0.0` folder into yours. If you upload the files one by one over FTP, include hidden files, or the `.env` file is left behind.

</Step>
<Step title="Let PHP write to it">

The user PHP runs as must be able to write `storage`, `bootstrap/cache`, the `.env` file and, during installation, the backend folder itself.

- **cPanel:** nothing to do. Your account owns the files and PHP runs as you.
- **VPS:** give the files to the web server's user, for example:

```bash
sudo chown -R www-data:www-data /var/www/edrama
```

</Step>
<Step title="Point the domain at the public folder">

Set your domain's **document root** to the backend's **`public`** folder, for example `/home/youruser/edrama/public`.

- **cPanel:** Domains › your domain › **Manage** › Document Root. If your host doesn't let you change the main domain's root, use a sub-domain such as `admin.your-domain.com`, whose root you can set.
- **Nginx:** `root /home/youruser/edrama/public;` with requests passed to `index.php`, as in [Laravel's Nginx guide](https://laravel.com/docs/deployment#nginx). Add `client_max_body_size 16M;`, or video uploads fail.
- **Apache:** the `public` folder already has its `.htaccess`. Make sure `mod_rewrite` is on and `AllowOverride All` is set.

Only the `public` folder should be reachable from the web. The `.env` file and the rest of the code must not be.

</Step>
<Step title="Open your domain">

Open `https://admin.your-domain.com`. Until the install is done, every page sends you to the installation wizard at `/install`.

</Step>
</Steps>

Continue with the [installation wizard](./installation.md).
