---
sidebar_position: 2
title: Becoming a creator
description: How someone applies or is invited, how your team approves them, and how creators sign in and accept the Creator terms.
---

# Becoming a creator

There are two ways in: someone **applies**, or your team **invites** them. Either way they end with an invite email, and only creators whose status is **Active** can open the portal.

<Anchor id="apply" />

## They apply

Anyone can apply at `https://admin.your-domain.com/creator/apply`, or from **Become a creator** in the app's **Me** tab. Link to it from your website (the **Creators** section has an invitation to become one) or your social pages.

The form asks for:

- **Your name**: the name they publish under.
- **Email**: where the team replies, and the email they'd like to be invited with.
- **Links to your past work**: one per line (YouTube, Instagram, a portfolio or a festival page).
- **Your pitch**: what they'd publish, in a few sentences.

Applications arrive on the **Applications** tab of <AdminPath path="Community › Creators" />. **Accept** makes the creator account and emails an invite; **Decline** sends a polite email (your reason stays with the team).

To stop taking applications, switch off **“Become a creator” applications** in <AdminPath path="System › Settings › App & support" /> › **Features**: the form then says *Applications are closed for now*.

## You invite them

In <AdminPath path="Community › Creators" />, click **Invite creator** and fill in their display name, handle, contact email and revenue share, with an optional personal note. **Resend invite** sends a fresh link to a creator who hasn't signed in yet.

<Anchor id="accept-your-invite" />

## Accepting the invite

The invite email says **Welcome to *your platform*, *their name***, with a **Sign in to accept** button that links to `/creator/invite/…`. It works once, for **7 days**. The invite page shows the name they'll publish as and until when the invite is valid. The creator clicks **Sign in to accept**, signs in with the account they use in the app (or makes one), and their creator account becomes **Active**.

| If the creator sees… | It means |
|---|---|
| *This invite link doesn't work* | A newer invite replaced it, or the link is incomplete. Use the newest email, or resend the invite. |
| *This invite expired* | Send a new one with **Resend invite**. |
| *This invite was already used* | Sign in to the Creator Portal with the account used to accept it. |
| *A guest account can't become a creator account* | Sign in with Google, email or phone instead. |
| *This account already belongs to another creator* | Use a different account. |

:::note The account is the app account
A creator signs in to the portal with the same Google, email or phone account they use in the app, so their profile in the app and their series stay together.
:::

<Anchor id="sign-in" />

## Signing in

<Screen
  id="creator-sign-in"
  type="browser"
  wire="auth"
  url="/creator/login"
  title="Creator sign-in"
  caption="The Creator Portal's sign-in page: the photo stage and tagline on the left, and on the right Continue with Google, the Email and Phone tabs, and Sign in."
  markers={[
    {x: 16.4, y: 69.6, title: 'Tagline', text: '“Your stories, on every phone.” Set in Settings › Sign-in screen.'},
    {x: 72.3, y: 21.8, title: 'Welcome back', text: 'Creators sign in with the same account they use in the eDrama app.'},
    {x: 77.7, y: 33.3, title: 'Continue with Google', text: 'One-tap sign-in with the Google account used in the app.'},
    {x: 76.7, y: 42.7, title: 'Email / Phone', text: 'Email and password, or your phone number and a 6-digit SMS code.'},
    {x: 76.7, y: 51.2, title: 'Email and password', text: 'With Forgot password? beside the password field.'},
    {x: 76.7, y: 65.4, title: 'Sign in', text: 'Takes you to Home, or to the Creator Terms first if you haven’t accepted them.'},
    {x: 79.9, y: 70, title: 'Create an account', text: 'Switches the card to Create account, for someone new to eDrama. It is the same account they use in the app.'},
    {x: 80.2, y: 77.9, title: 'Not a creator yet?', text: 'Opens the creator application form.'},
  ]}
/>

Sign-in methods: **Google**, **email and password**, or **phone** (when the platform allows it). **Sign in with Apple isn't available in the portal.**

Common messages: *That email and password don't match*, *That code isn't right* (check the SMS), *That code expired* (send a new one), *Your browser blocked the Google window* (allow pop-ups for the site).

<Anchor id="accept-the-creator-terms" />

## Accepting the Creator terms

Before they can create a series, creators read and accept the **Creator terms** you publish in [Legal pages](/admin-panel/settings/legal-and-security/#legal-pages): a reading page with an outline of its sections, the version and the date it was updated.

<Steps>

1. Read the terms.
2. Tick **I have read and agree to the Creator Terms (version N)**.
3. Choose **Accept and continue**.

</Steps>

When you publish a new version, every creator is asked to read and accept it again before continuing. Their accepted version and date are on **Your account › Agreement** in the portal.

## Creator status

| Status | What the creator sees |
|---|---|
| **Active** | The full portal |
| Invited | Hasn't opened the invite yet. Signing in shows "This isn't a creator account yet" until they use the invite link |
| Not a creator | "This isn't a creator account yet", with a link to apply |
| Suspended | "Your creator account is suspended", with your [support email](/admin-panel/settings/app-and-support/#support-email). Their live series stay live unless a reviewer unpublishes them |

Your team suspends and reactivates creators with **Suspend** and **Reactivate** on their page in **Creators** ([Creators](/admin-panel/using/community/creators/)).

A creator's own revenue share can be set on their page in **Creators**. Without one, the **Default creator share** from [Payments](/admin-panel/settings/payments/#revenue-share) applies.
