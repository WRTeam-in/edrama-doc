---
sidebar_position: 6
title: First steps
description: Signing in for the first time, your account, and the demo data.
---

# First steps

The installer gives you a working Admin Panel. These steps make it ready for real viewers. Do them in this order.

<Anchor id="sign-in" />

## 1. Sign in

Open `https://admin.your-domain.com/admin` (the domain's root address also takes you there) and sign in with the Owner email and password you chose in the installer.

<Shot src="/images/admin/dashboard.webp" alt="The Admin Panel dashboard with revenue, viewers and unlocks for the last 30 days" caption="The Dashboard, shown here with the demo data." />

- After **5** failed sign-ins in a row, sign-in is locked for **15 minutes**.
- A team session ends **12 hours** after sign-in, however active you are.
- Forgot the password? Use the reset link on the sign-in page. It needs [email delivery](./settings/email.md) set up.

Open **Your account** from the sidebar footer to change your name, photo and password, and to set up two-factor authentication. The Owner also edits the **Creator profile** there: how your platform shows up as the creator of your own and licensed series in the app.


## The sidebar

| Group | Pages |
|---|---|
| **Overview** | Dashboard |
| **Content** | Titles, Categories, Upload & pipeline, Release schedule, Home builder, Website |
| **Community** | Creators, Review queue, Comments & reviews |
| **Audience** | Users, Balance adjustments, Support tickets, Push |
| **Money** | Monetization, Transactions |
| **System** | Settings, Team & roles, Audit log, System, License & updates, and Clear demo data while demo data is imported |

What each page does is on [Features › Admin Panel menus](/features/admin-panel-menus/). Team members only see the pages their role allows.

## 2. Check the server's health

Open <Path>System › System</Path>. Look for:

- **Cron running** in green. If not, add the [cron line](/admin-panel/background-jobs/).
- No red warning cards. The page warns you if:
  - the `.env` file can be opened from the web,
  - the server isn't set up as a live server (`APP_ENV` or `APP_DEBUG`),
  - visitors reach the app through a proxy it doesn't trust.

Each warning names the exact line to change.

## 3. Protect the Owner account

Open your name at the foot of the sidebar › **Your account** and set up **two-factor authentication**. See [Sign-in & your account](/admin-panel/using/sign-in-and-account/).

## 4. Connect email

Without email, team invites, password resets and creator emails can't be sent. Open <Path>Settings › Email delivery (SMTP)</Path>, enter your provider's details and choose **Send test email**. See [Email](/admin-panel/settings/email/).

## 5. Connect Firebase

Viewer sign-in, the Creator Portal's sign-in and push notifications all need Firebase. Open <Path>Settings › Notifications</Path>, fill in the Firebase card and choose **Test connection**. See [Firebase](/admin-panel/settings/firebase-and-notifications/).

## 6. Make it yours

- <Path>Settings › Branding</Path>: app name, logos, theme colour.
- <Path>Settings › App & support</Path>: support email, store links.
- <Path>Settings › Legal pages</Path>: terms, privacy policy, refund policy and Creator Terms.

## 7. Check video

Open <Path>Settings › Storage & video</Path>. The **This server** option should show ffmpeg in green, or set up another option. Upload one short test episode and watch it reach **Ready**.

## 8. Remove the demo data

If you imported demo data, look around first, then remove it before launch with <Path>System › Clear demo data</Path>. See [Clear demo data](/admin-panel/first-steps/#demo-data).

Continue with the [Launch checklist](/admin-panel/go-live-checklist/) for money, content and the app.

## Demo data

If you ticked **Import demo data** during installation, the Admin Panel, the app and the website are full of sample dramas, creators, viewers and figures, with artwork drawn for you, so you can see how everything works before adding your own. **Only the Owner** can clear it, and the page appears only while demo data is present.

### Clear it before you launch

<Steps>
<Step title="Open Clear demo data">

As the Owner, open <AdminPath path="System › Clear demo data" />.

</Step>
<Step title="Confirm">

Read both lists, click **Clear demo data**, type `CLEAR` in capital letters and confirm. This can't be undone.

</Step>
</Steps>

The result says how many titles, viewers and creators were removed. Home goes back to its starting layout and the sign-in screens to the built-in photos; if no categories would be left, the starting categories are restored. A demo series that real viewers have already paid for is **kept, hidden**, so their purchases stay intact.

### What's removed and what's kept

| Removed | Kept |
|---|---|
| The demo series, with their episodes, translations, statistics, artwork and videos | Your regions, coin packs, VIP plans, ad and reward settings |
| The demo categories and their pictures | Every setting, language and language pack, role, legal page and email template |
| The demo creators, with their submissions and review items | The licence, the Owner account and the platform's own creator profile |
| The demo viewers, with their wallets, ledgers (coin rows), purchases, unlocks, VIP, reviews, comments, follows, reports and tickets | Anything you created yourself, and the audit log |
| The demo team accounts | |
| The demo Dashboard figures, searches and pushes | |

### Import it later

You can import the demo data at any time from the server's terminal:

```bash
php artisan edrama:demo-data
```

It adds nothing if the demo data is already there. On a production server it asks you to confirm first; add `--force` to skip the question. Import it on a test server rather than on your live one after launch.

## Useful commands

You'll rarely need these, but they're good to know. Run them in the project folder. Every command, including the store reviewer account and Cloudflare Stream's webhook, is on [Server commands](/admin-panel/commands/).

| Command | What it does |
|---|---|
| `php artisan edrama:create-owner` | Creates the Owner if the installer didn't (reads `EDRAMA_OWNER_*` from `.env` when run without a terminal). |
| `php artisan edrama:demo-data` | Imports the demo data. |
| `php artisan config:cache` | Applies changes to `.env`. |
| `php artisan queue:restart` | Makes the workers reload after a change or update. |
| `php artisan optimize` | Speeds up the app after an update. |
| `php artisan edrama:repair-encryption` | Clears saved secrets that can no longer be read because `APP_KEY` was lost, so you can enter them again. |
