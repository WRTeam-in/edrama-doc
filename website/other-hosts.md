---
sidebar_position: 5
title: Other hosts
description: Run the eDrama website on your own Node.js server instead of Vercel.
---

# Other hosts

The website is a standard Next.js app, so it runs on any server with **Node.js 20.9 or newer**: a VPS, a cloud VM, or a host with Node.js app support.

:::caution It can't be a static export
The website needs a running Node.js process: it rebuilds pages in the background, answers the refresh call and serves `/.well-known` files. Uploading the build folder to plain shared hosting won't work.
:::

## Steps

<Steps>
<Step title="Build it">

```bash
npm ci
npm run build
```

Set the environment variables from [Connect to the Admin Panel](./connect.md) first, in `.env.local` or the server's environment. They are read when the site builds and when it runs, so after changing one, build and restart again.

</Step>
<Step title="Start it">

```bash
npm run start
```

It listens on port 3000. Use `PORT=8080 npm run start` for another port.

</Step>
<Step title="Keep it running">

Use a process manager such as [PM2](https://pm2.keymetrics.io/) or a systemd service so it restarts after a crash or a reboot.

</Step>
<Step title="Put it behind HTTPS">

Point your web server (Nginx, Apache, Caddy) at the Node.js port as a reverse proxy, with an SSL certificate for your domain.

```nginx title="Nginx example"
server {
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

</Step>
</Steps>

Then set the **Website address** in the Admin Panel, as on [Connect to the Admin Panel](./connect.md).
