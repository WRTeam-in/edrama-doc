---
sidebar_position: 2.1
title: "Prepare a VPS"
sidebar_label: "VPS server"
description: "Prepare an Ubuntu VPS for eDrama with nginx, PHP 8.5, MySQL 8, ffmpeg and an SSL certificate."
---

A **VPS** (virtual private server) is a server where you have full control, usually reached over **SSH** (a secure command line). This page prepares a fresh Ubuntu 24.04 server. If your provider gives you a control panel such as cPanel instead, follow [Shared hosting](/admin-panel/shared-hosting/).

:::note
The commands below are a standard, tested way to prepare Ubuntu for a PHP application. Package names and versions can differ between providers and over time; if a command fails, the error message usually names the package to install instead. The parts specific to eDrama are marked **eDrama**.
:::

## 1. Connect and update

Connect from your computer's terminal (replace the address with your server's):

```bash title="Your computer"
ssh root@203.0.113.10
```

Then bring the server up to date:

```bash title="Server"
apt update && apt upgrade -y
```

## 2. Install PHP 8.5 and its extensions

```bash title="Server"
apt install -y software-properties-common
add-apt-repository -y ppa:ondrej/php
apt update
apt install -y php8.5-fpm php8.5-cli php8.5-mysql php8.5-bcmath php8.5-curl php8.5-gd \
  php8.5-intl php8.5-mbstring php8.5-xml php8.5-zip php8.5-sodium unzip
php -v
```

`php -v` should print a version starting with **8.5**.

Raise the upload limits (**eDrama**: videos upload in 8 MB pieces; update packages can be up to 300 MB):

```bash title="Server"
sed -i 's/^upload_max_filesize.*/upload_max_filesize = 320M/; s/^post_max_size.*/post_max_size = 320M/' /etc/php/8.5/fpm/php.ini
systemctl restart php8.5-fpm
```

## 3. Install MySQL 8 and create the database

```bash title="Server"
apt install -y mysql-server
mysql_secure_installation
```

Create an empty database and a user for eDrama. Choose your own strong password:

```bash title="Server"
mysql -u root -p
```

```sql title="MySQL"
CREATE DATABASE edrama CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'edrama'@'localhost' IDENTIFIED BY 'choose-a-strong-password';
GRANT ALL PRIVILEGES ON edrama.* TO 'edrama'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Write down the database name, user and password: the installer asks for them.

## 4. Install ffmpeg, nginx and supervisor

```bash title="Server"
apt install -y ffmpeg nginx supervisor
ffmpeg -version | head -1
```

ffmpeg turns each uploaded episode into streams (**eDrama**). Supervisor keeps the queue workers running ([Cron & queues](/admin-panel/background-jobs/)).

## 5. Upload the package

Upload the eDrama server zip to `/var/www/` (with an SFTP program such as FileZilla, or `scp`), then:

```bash title="Server"
cd /var/www
unzip edrama-server.zip -d edrama
chown -R www-data:www-data /var/www/edrama
find /var/www/edrama -type d -exec chmod 755 {} \;
find /var/www/edrama -type f -exec chmod 644 {} \;
chmod -R 775 /var/www/edrama/storage /var/www/edrama/bootstrap/cache
```

Use the zip's real name. Check that the hidden `.env` file arrived: `ls -la /var/www/edrama/.env`.

## 6. Configure nginx

Create the site file:

```bash title="Server"
nano /etc/nginx/sites-available/edrama
```

Paste this, replacing `admin.your-domain.com`:

```nginx title="/etc/nginx/sites-available/edrama"
server {
    listen 80;
    server_name admin.your-domain.com;
    # eDrama: the domain points at public/, never at the project folder.
    root /var/www/edrama/public;
    index index.php;

    # eDrama: videos upload in 8 MB pieces; update packages up to 300 MB.
    client_max_body_size 320M;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.5-fpm.sock;
        fastcgi_read_timeout 300;
    }

    location ~ /\.(?!well-known) {
        deny all;
    }
}
```

Turn it on and reload:

```bash title="Server"
ln -s /etc/nginx/sites-available/edrama /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

## 7. Point your domain and add HTTPS

At your domain provider, add an **A record** for `admin.your-domain.com` with your server's IP address. Once it resolves (usually minutes), add a free Let's Encrypt certificate:

```bash title="Server"
apt install -y certbot python3-certbot-nginx
certbot --nginx -d admin.your-domain.com
```

## 8. Run the installer

Open `https://admin.your-domain.com` in your browser. The installer starts by itself: continue with [Web installer](/admin-panel/installation/).

:::warning[Behind Cloudflare or a load balancer?]
If visitors reach your server through Cloudflare's proxy or another CDN, tell eDrama to trust it, or every visitor will look like the same person (rate limits and sign-in lockouts would count them as one). Add `EDRAMA_TRUSTED_PROXIES=cloudflare` to `.env`. The System page warns you when this is needed. See [Environment file](/admin-panel/environment/).
:::
