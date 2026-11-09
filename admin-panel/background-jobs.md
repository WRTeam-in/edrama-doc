---
sidebar_position: 5
title: Cron and background jobs
description: The one cron job eDrama needs, the queues it runs, and the optional Supervisor setup for a VPS.
---

# Cron and background jobs

Many things happen in the background: processing uploaded videos, sending emails and pushes, publishing episodes at their release time, handling store notifications, expiring bonus coins and building reports. **All of it starts from one cron job.**

## Add the cron job (required)

Add this line, with your own folder, so it runs **every minute**:

```bash
* * * * * cd /home/youruser/edrama && php artisan schedule:run >> /dev/null 2>&1
```

- **cPanel:** Advanced › **Cron Jobs** › Common Settings: *Once Per Minute*, and the command above.
- **VPS:** `crontab -e` as the user that owns the files (often `www-data`).

If `php` on your host isn't PHP 8.5, use its full path, for example `/usr/local/bin/php` or the path your host gives for PHP 8.5.

## How the queues run

By default the cron job also starts the queue workers every minute (`EDRAMA_QUEUE_WORKER_SCHEDULED=true` in `.env`). Two worker pools run in the background, and each stops when its queues are empty or after 55 seconds:

| Pool | Queues, in priority order | Time per job |
|---|---|---|
| `urgent` | `webhooks` (store and video notifications), `notifications`, `default` (emails and the rest) | 60 seconds |
| `slow` | `video`, `reports` | 600 seconds |

This needs no long-running process, so it works on shared hosting.

## Check it worked

Open <AdminPath path="System › System" />. It shows the queues, the scheduled tasks and when each last ran, and any **failed jobs**, which you can **Retry**, **Retry all** or **Delete**.

## On a VPS: Supervisor (optional)

For faster processing on a VPS, run the workers all the time with [Supervisor](http://supervisord.org/). The backend includes a ready config at `docs/deploy/supervisor.conf` with four programs: two urgent workers, one default worker, one slow worker for video and reports, and the scheduler.

<Steps>
<Step title="Copy the config">

```bash
sudo cp docs/deploy/supervisor.conf /etc/supervisor/conf.d/edrama.conf
```

Edit it: set `APP_DIR` to your backend's folder and `user=` to the user that owns the files.

</Step>
<Step title="Turn off the cron-started workers">

In `.env`, set:

```ini
EDRAMA_QUEUE_WORKER_SCHEDULED=false
```

Then run `php artisan config:clear`.

</Step>
<Step title="Start Supervisor">

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start edrama:*
```

</Step>
</Steps>

The Supervisor config runs the scheduler itself (`schedule:work`), so on that server remove the cron line, or keep the cron line and remove the `edrama-scheduler` program. Run exactly one of the two.

:::tip After every update
Run `php artisan queue:restart` so running workers finish their job and load the new code.
:::

## Scheduled tasks

All times are UTC.

| Runs | Task |
|---|---|
| Every minute | Publish episodes whose release time has passed; send scheduled pushes |
| Every 5 minutes | Expire bonus coins; send pushes held during quiet hours |
| Every 10 minutes | Check videos stuck in processing |
| Every 15 minutes | VIP renewal reminders (24 hours before a charge); Top 10 Today; title, Dashboard and Creator Portal statistics |
| Daily | Wallet check against the ledger (02:30); Google Play voided purchases (03:30); clean old exports, job runs and unfinished uploads (04:00 to 04:30) |
| Monthly, 1st at 02:00 | The monthly creator report ([how creators earn](/features/how-earnings-work/)) |
