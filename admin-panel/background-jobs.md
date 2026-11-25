---
sidebar_position: 5
title: Cron and background jobs
description: The one cron job eDrama needs, the queues it runs, and the optional Supervisor setup for a VPS.
---

# Cron and background jobs

**All of it starts from one cron job.** eDrama does a lot of work in the background: releasing episodes at their time, processing videos, sending pushes and emails, counting the Dashboard's numbers and checking store refunds. Two things make that happen:

- **The scheduler** decides *when* each task runs. It is started by one **cron** line that runs every minute.
- **Queue workers** do the jobs that wait in line, such as processing a video or sending 10,000 pushes.

:::danger[Without these, eDrama stops moving]
If the cron line is missing, episodes never release, scheduled pushes never go out and videos never finish processing. Set this up straight after the installer.
:::

<Anchor id="add-the-cron-job-required" />

## The cron line

Every server needs exactly **one** cron entry. The easiest way to get it right is to copy it from the panel:

<Screen
  id="admin-system-setup"
  type="browser"
  wire="system"
  url="/admin/system"
  title="System"
  caption="System’s Server setup card with the SSH / crontab steps and the crontab entry."
  markers={[
    {x: 86, y: 36.2, title: 'Cron status', text: 'Turns into “Cron running” once the scheduler has run in the last few minutes.'},
    {x: 94.1, y: 37.2, title: 'Setup steps', text: 'Show or hide the steps.'},
    {x: 23.4, y: 42.8, title: 'Where you set it up', text: 'Three tabs: SSH / crontab, Hosting panel (command), Hosting panel (PHP script).'},
    {x: 57.9, y: 57, title: 'Crontab entry', text: 'With your server’s own PHP path and project folder.'},
    {x: 94.7, y: 60.7, title: 'Copy', text: 'Copies the line.'},
    {x: 20.9, y: 69.6, title: 'PHP binary and folder', text: 'Used in the line.'},
    {x: 57.9, y: 79.2, title: 'Queue workers', text: 'When supervisor runs the workers, keep this command running.'},
  ]}
/>

<Steps>

1. Sign in and open <Path>System › System</Path>.
2. In **Server setup**, choose **Setup steps**, then the tab that matches your server.
3. Copy the line and add it:
   - **SSH:** run `crontab -e` as the user that owns the site (on a VPS, `crontab -u www-data -e`), paste the line on a new line, save.
   - **Hosting panel:** open **Cron Jobs**, choose "every minute" and paste the command.
4. Wait a minute or two and refresh System. **Cron running** turns green.

</Steps>

The line looks like this (your folder and PHP path will differ: on cPanel it's usually `/home/youruser/edrama`):

```bash title="crontab"
* * * * * cd /var/www/edrama && php artisan schedule:run >> /dev/null 2>&1
```

The five stars mean "every minute"; they are part of the line.

- **cPanel:** Advanced › **Cron Jobs** › Common Settings: *Once Per Minute*, and the command above.
- **VPS:** `sudo crontab -u www-data -e`, with the user that owns the files in place of `www-data`.

If `php` on your host isn't PHP 8.5, use its full path, for example `/usr/local/bin/php` or the path your host gives for PHP 8.5. The cron line starts each task as its own process, so PHP's `proc_open` function must be allowed.

<Anchor id="how-the-queues-run" />

## Queue workers

<Tabs>
<TabItem value="shared" label="Shared hosting (no supervisor)">

Nothing else to do. With `EDRAMA_QUEUE_WORKER_SCHEDULED=true` in `.env` (the default), the same cron line also works through the queues every minute, in two pools. Each pool takes its queues in priority order and stops when they're empty or after 55 seconds, so the next minute's run can start. No long-running process is needed, which is why this works on shared hosting.

| Pool | Queues, in priority order | Longest one job may run |
|---|---|---|
| **urgent** | `webhooks` (store and video notifications), `notifications` (pushes), `default` (emails and the rest) | 60 seconds |
| **slow** | `video`, `reports` | 600 seconds |

Two pools, so a ten-minute export never holds up a store notification. The time limit needs the `pcntl` PHP extension.

</TabItem>
<TabItem value="vps" label="VPS with supervisor (recommended)">

<Anchor id="on-a-vps-supervisor-optional" />

On a VPS, long-running workers react instantly instead of once a minute, run by [Supervisor](http://supervisord.org/). eDrama ships a ready-made supervisor file at `docs/deploy/supervisor.conf`.

```bash title="Server"
sudo cp /var/www/edrama/docs/deploy/supervisor.conf /etc/supervisor/conf.d/edrama.conf
sudo sed -i 's#%(ENV_APP_DIR)s#/var/www/edrama#g' /etc/supervisor/conf.d/edrama.conf
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start edrama:*
```

Replace `/var/www/edrama` with your project folder in both lines.

The file runs every program as `user=www-data`. If another user owns your project files, change each `user=` line before you start it. Check the workers with `sudo supervisorctl status`.

It starts four programs: two **urgent** workers (store and video notifications, then pushes), one **default** worker (emails and everything else), one **slow** worker (video processing and large exports) and the **scheduler**.

Because supervisor now runs the scheduler and the workers, turn off the cron's own workers so they aren't doubled. In `.env`:

```ini title=".env"
EDRAMA_QUEUE_WORKER_SCHEDULED=false
```

Then run `php artisan config:cache` (or `php artisan config:clear`). With supervisor running the scheduler (`schedule:work`), you don't need the cron line: **run exactly one of the two**. To keep the cron line instead, remove the `[program:edrama-scheduler]` block and its name from the `programs=` line.

</TabItem>
</Tabs>

:::tip[After every update]
Run `php artisan queue:restart` so workers finish their current job and reload the new code.
:::

<Anchor id="scheduled-tasks" />

<Anchor id="check-it-worked" />

### Check it worked

Open <AdminPath path="System › System" />. It shows the queues, the scheduled tasks and when each last ran, and any **failed jobs**, which you can **Retry**, **Retry all** or **Delete**.

## What runs in the background

All times are UTC.

| Task | When | What it does |
|---|---|---|
| Publish episodes | Every minute | Releases episodes whose publish time has passed. |
| Send scheduled pushes | Every minute | Sends pushes scheduled in the Push composer. |
| Expire bonuses | Every 5 minutes | Removes bonus coins past their expiry date. |
| Release held pushes | Every 5 minutes | Sends pushes held back by quiet hours or the daily limit. |
| AI recovery | Every 5 minutes | Picks up AI Studio calls that were interrupted. |
| Poll stuck videos | Every 10 minutes | Checks uploads that seem stuck and restarts stalled processing. |
| VIP renewal reminders | Every 15 minutes | Reminds subscribers about 24 hours before each charge. |
| Rank top titles | Every 15 minutes | Builds "Top 10 today" per region. |
| Roll up stats | Every 15 minutes | Title stats, Dashboard figures and creators' 28-day stats. |
| Wallet reconcile | Daily 02:30 | Checks every wallet's balance against its ledger. Reports, never changes. |
| Voided purchases | Daily 03:30 | Reads Google Play's list of refunded and charged-back purchases. |
| Clean-up tasks | Daily 04:00–05:10 | Expired exports, old run records, unfinished uploads, cache, webhook events, failed jobs, unused AI files. |
| Creator revenue | Daily 05:00 UTC | Prepares the month's creator revenue on the import day you set. |
| Creator report | 1st of the month, 02:00 UTC | The monthly creator report. |

Every task's last run and result is on <Path>System › System</Path>, with any **failed jobs**, which you can **Retry**, **Retry all** or **Delete** there. A failure alerts the team by email, Slack and the bell (see [System alerts](/admin-panel/settings/firebase-and-notifications/)).
