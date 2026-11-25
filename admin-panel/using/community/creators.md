---
sidebar_position: 1
title: "Creators"
sidebar_label: "Creators"
description: "Invite creators, decide applications, set revenue shares and agreements, suspend or reactivate, and record payouts."
---

**Creators** are invited people or studios who publish their own series through the [Creator Portal](/creator-portal/) and earn a share of everything their series make: coins, Series Passes, ads and VIP. This screen is where you invite them, decide applications and manage their agreements.

<Access area="Creators" view="See creators and applications" edit="Invite, accept, decline, suspend, reactivate and change shares" />

<Screen
  id="admin-creators"
  type="browser"
  wire="list"
  url="/admin/creators"
  title="Creators"
  caption="Creators: status cards and the creator list with titles, share, agreement and terms."
  markers={[
    {x: 93.6, y: 14.6, title: 'Invite creator', text: 'Sends an invite email with a link to the Creator Portal.'},
    {x: 83.5, y: 14.6, title: 'Invite from a file', text: 'Invite many creators from a CSV or Excel file.'},
    {x: 29, y: 21.8, title: 'Creators / Applications', text: 'Your creators, and the “Become a creator” applications.'},
    {x: 23.1, y: 29.5, title: 'Status cards', text: 'All creators, Active, Invited and Suspended.'},
    {x: 27.1, y: 54.9, title: 'A creator', text: 'Name, handle and verified tick.'},
    {x: 51.4, y: 55.5, title: 'Share', text: 'Their revenue share of what their series earn.'},
    {x: 59.7, y: 56, title: 'Agreement and terms', text: 'When the agreement was signed and which Creator Terms they accepted.'},
    {x: 93.8, y: 56.1, title: 'Profile', text: 'Opens the creator’s page: titles, notices, agreement, earnings and payouts.'},
  ]}
/>

## Creator statuses

<Flow steps={['Invited', {label: 'Active', tone: 'live'}, {label: 'Suspended', tone: 'warn'}]} caption="A suspended creator can be reactivated at any time." />

| Status | Meaning |
|---|---|
| **Invited** | Hasn't accepted the invite yet. |
| **Active** | Can sign in to the Creator Portal and submit work. |
| **Suspended** | Can't sign in or submit. Their live titles stay live unless a reviewer unpublishes them. |

## Invite a creator

<Steps>

1. Choose **Invite creator**.
2. Fill in:
   - **Display name**: the name they publish under.
   - **Handle**: lower-case letters, numbers, dots and underscores, such as `night.shift`.
   - **Contact email**: where the invite goes.
   - **Revenue share**: their percent of what their series earn. The default comes from <Path>Settings › Payments</Path> (50% out of the box).
   - **Personal note**: optional, added to the invite email.
3. Choose **Send invite**.

</Steps>

The email contains a single-use link to the Creator Portal that works for **7 days**. If it expires, choose **Resend invite** on their row: a new link goes out and the old one stops working.

:::warning
If email delivery isn't set up, the creator is still added but no email goes out; the panel says so. Add your SMTP server in <Path>Settings › Email delivery (SMTP)</Path>, then use **Resend invite**.
:::

## Applications

Anyone can apply at `https://your-domain.com/creator/apply` (the app's **Become a creator** link goes there). The form asks for their name, email, **links to past work** (one per line) and a short **pitch**. Applications arrive on the **Applications** tab, with status cards for Pending, Accepted and Declined.

- **Accept** creates their creator account and emails them the Creator Portal link.
- **Decline** sends a polite email. The reason you type stays with the team; it's never in the email.

You can close applications for a while with the **"Become a creator" applications** switch in <Path>Settings › App & support › Features</Path>. The form then says applications are closed for now.

## The creator's page

Click a creator to open their page:

| Section | What's there |
|---|---|
| **At a glance** | Titles, episodes, followers, share, agreement and Creator Terms. |
| **Titles** | Their series, most recently changed first, with status and episode count. |
| **Notices sent** | What they see in the Creator Portal (review decisions and so on), read or unread. |
| **Profile** | Bio, contact, followers, verified, joined. |
| **Agreement** | Revenue share, agreement signed date, terms version accepted, the agreement file (download) and team notes. |
| **Earnings & payouts** | What they earned in closed months, what was paid, what's still owed ([Creator revenue](/admin-panel/using/money/creator-revenue/)). |

## Actions on a creator

| Action | What it does |
|---|---|
| **Edit profile** | Photo (JPG, PNG or WebP up to 2 MB), bio, and the **Verified** tick shown in the app. |
| **Change share** | A new percent with a **reason**. Applies to **new unlocks only**: unlocks already made keep the share they saved. |
| **Edit agreement** | The date the agreement was signed, the signed **PDF** (up to 10 MB, kept privately; a new file doesn't delete the old one), and team notes only the team sees. |
| **Suspend** | Needs a reason, which the creator is emailed. They can't sign in or submit; live titles stay live. |
| **Reactivate** | They can sign in and send work again. They're emailed. |
| **AI Studio** | Allow or block AI Studio for this creator and set their limits and allowance on the platform's key ([AI Studio settings](/admin-panel/settings/ai-studio/)). |
| **Record payout** | After paying them outside the app: amount, method (bank transfer, UPI, PayPal, Wise or other), reference, date and an internal note. |

Every action is recorded in the audit log.
