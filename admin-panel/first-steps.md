---
sidebar_position: 6
title: First steps
description: Signing in for the first time, your account, and the demo data.
---

# First steps

## Sign in

Open `https://admin.your-domain.com/admin` and sign in with the Owner's email and password.

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
| **System** | Settings, Team & roles, Audit log, System, License & updates |

What each page does is on [Features › Admin Panel menus](/features/admin-panel-menus/). Team members only see the pages their role allows.

## Demo data

If you ticked **Import demo data** during installation, the Admin Panel, the app and the website are full of sample dramas, creators, viewers and figures, so you can see how everything works before adding your own.

### Clear it before you launch

<Steps>
<Step title="Open Clear demo data">

As the Owner, open <AdminPath path="System › Clear demo data" />. The page only appears while demo data is imported.

</Step>
<Step title="Confirm">

Type `CLEAR` in capital letters and confirm.

</Step>
</Steps>

**Removed:** the demo series, categories, creators and viewers with all their coin and purchase rows, demo dashboard figures and demo pushes.

**Kept:** your regions, coin packs, VIP plans, ad and reward settings; every setting, language, role, legal page and email template; the licence and the Owner; anything you created yourself; and the audit log. A demo series that real viewers have already paid for is kept, hidden.

### Import it later

You can import the demo data at any time from the server's terminal:

```bash
php artisan edrama:demo-data
```

It adds nothing if the demo data is already there. On a production server it asks you to confirm first; add `--force` to skip the question.
