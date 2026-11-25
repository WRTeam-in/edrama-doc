---
sidebar_position: 1
title: "Sign-in and your account"
sidebar_label: "Sign-in & your account"
description: "Signing in to the Admin Panel, resetting a password, setting up two-factor authentication, and managing your own account."
---

## Signing in

<Screen
  id="admin-sign-in"
  type="browser"
  wire="auth"
  url="/admin/login"
  title="Sign in"
  caption="The Admin Panel's sign-in page: the cinematic stage on the left (photos, the live titles' poster strip and the tagline) and the sign-in card on the right."
  markers={[
    {x: 20, y: 32, title: 'Sign-in stage', text: 'Your photos cross-fade like a trailer. Choose them, and how much they move, in Settings › Sign-in screen.'},
    {x: 16.4, y: 70.7, title: 'Tagline', text: '“Run the stories. Keep the prices fair.” Change the words in Settings › Sign-in screen.'},
    {x: 44, y: 47, title: 'Poster strip', text: 'The live titles’ posters scrolling past. Settings › Sign-in screen can turn it off.'},
    {x: 78.1, y: 42.3, title: 'Email', text: 'The email you were invited with.'},
    {x: 84, y: 48.2, title: 'Forgot password?', text: 'Emails you a link to set a new password.'},
    {x: 77, y: 52.6, title: 'Password', text: 'The eye shows what you typed. A warning appears if Caps Lock is on.'},
    {x: 75.9, y: 60.9, title: 'Sign in', text: 'If two-factor is on, the code is asked next. Sessions end after 12 hours.'},
    {x: 82.3, y: 72.2, title: 'Creator Portal sign-in', text: 'A link for creators who land here by mistake.'},
  ]}
/>

<Steps>

1. Open `https://your-domain.com/admin`.
2. Enter your email and password and choose **Sign in**.
3. If two-factor is on for you, enter the 6-digit code from your authenticator app (or one of your recovery codes).

</Steps>

**Rules that keep the panel safe:**

- After **5** wrong passwords for one email from one address, sign-in is locked for **15 minutes**. Every failure shows the same message, so nobody can guess which emails have accounts.
- There is no "remember me": a session ends **12 hours** after sign-in.
- If an Owner or admin disables your account, you're signed out at your next click.

### Your first sign-in

If a member added you with a **temporary password**, you're taken to **Choose your password** before anything else. Enter the temporary password, then a new one of at least 12 characters that isn't in a known data breach. If the team requires two-factor, you set it up next.

If you were **invited by email**, the link takes you to a page where you set your own password straight away. The link works once and expires (see [Team & roles](/admin-panel/team-and-roles/)).

### Forgot your password?

Choose **Forgot password?** on the sign-in page and enter your email. If an account exists, a reset link is emailed to you. (The page answers the same either way, for privacy.) Email delivery must be set up for this to work: see [Email](/admin-panel/settings/email/).

## Your account

Open your name at the foot of the sidebar › **Your account**.

| Section | What you can do |
|---|---|
| **Profile** | Change your **name** and **photo** (JPEG, PNG or WebP up to 2 MB). They show to the team in the sidebar, the audit log and approvals. Your email is how you sign in, so it can't be changed here. |
| **Password** | Enter your current password and a new one. Your other devices are signed out; this one stays signed in. |
| **Two-factor authentication** | Turn it on or off, see how many recovery codes are left, and make new ones. |
| **Session** | When you signed in and when your session ends. |
| **Creator profile** | The Owner and members with **Settings** (Edit): how your platform appears as the "creator" of your own and licensed titles in the app: name, handle, bio, photo and the verified tick. |

## Two-factor authentication

Two-factor adds a second lock: after your password, sign-in asks for a 6-digit code from an **authenticator app** on your phone, such as Google Authenticator, Microsoft Authenticator, 1Password or Authy.

<Steps>

1. Open **Your account › Two-factor authentication** and choose **Set up authenticator app**.
2. Scan the QR code with your authenticator app, or type the key it shows.
3. Enter the 6-digit code and your password to confirm.
4. Save the **8 recovery codes** somewhere safe. Each one signs you in once if you lose your phone.

</Steps>

:::tip
The Owner can require two-factor for the whole team in <Path>Settings › Sign-in & security</Path>. Members without it are then held on the setup page at their next click. If someone loses their phone and their recovery codes, the Owner can use **Reset 2FA** on <Path>Team & roles</Path>.
:::
