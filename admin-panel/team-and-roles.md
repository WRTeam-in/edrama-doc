---
sidebar_position: 7
title: Team and roles
description: Add team members, give them roles, and protect sign-in with two-factor authentication.
---

# Team and roles

Your team signs in to the Admin Panel. Each member has one **role**, and each role allows **None**, **View** or **Edit** in each area. Manage both in <AdminPath path="System › Team & roles" />.

**Team & roles** manages who can use the Studio and what they can do. Everyone gets the least access their job needs, and every change is in the audit log.

<Access area="Team & roles" view="See members, invites and roles" edit="Add, invite, change roles, disable and enable" owner="Create, edit and delete roles; reset two-factor" />

<Screen
  id="admin-team"
  type="browser"
  wire="list"
  url="/admin/team"
  title="Team & roles"
  caption="Team & roles: overview cards, the members table and the permissions matrix."
  markers={[
    {x: 95.2, y: 14.6, title: 'Invite', text: 'Emails a link to set their own password.'},
    {x: 87.4, y: 14.6, title: 'Add member', text: 'Adds them with a temporary password you share.'},
    {x: 43.8, y: 22.9, title: 'The team at a glance', text: 'Members, two-factor coverage, open invites and roles.'},
    {x: 85.8, y: 38.1, title: 'Members', text: 'Search by name or email.'},
    {x: 24.7, y: 48.4, title: 'A member', text: 'Role, last sign-in, two-factor and status; change role, disable, reset 2FA.'},
    {x: 54.5, y: 63.4, title: 'Permissions', text: 'What each role can do in each area: Edit, View or None.'},
    {x: 93.8, y: 63.9, title: 'New role', text: 'Owner only: start blank or from a copy.'},
  ]}
/>

## Add a member

You have two ways: **Invite** them by email, or **Add member** with a temporary password. Every change is recorded in the audit log.

<Tabs>
<TabItem value="invite" label="Invite by email (recommended)">

<Steps>

1. Choose **Invite**, enter their **Email** and pick a **Role**.
2. Choose **Send invite**.

</Steps>

They get an email link to set their own password. It works **once** and for **7 days**, and needs [email delivery](./settings/email.md) set up. Open invites show under **Pending invites**, with who invited them and when the link expires: **Resend** sends a new link (the old one stops working), **Revoke** cancels it.

</TabItem>
<TabItem value="add" label="Add with a temporary password">

<Steps>

1. Choose **Add member**: **Name**, **Email**, **Role** and a **Temporary password** of at least 12 characters (or **Generate a password**).
2. Choose **Add member**.
3. Share the password with them in person or over a secure channel. It's never shown again.

</Steps>

At their first sign-in they must choose their own password before anything else.

</TabItem>
</Tabs>

## Manage members

| Action | What happens |
|---|---|
| **Change role** | Applies from their next click. |
| **Disable** | They're signed out at their next click and can't sign in. Their history stays; you can **Enable** them again with the role they had. |
| **Reset 2FA** | Owner only. Their authenticator and recovery codes stop working; they set it up again (at once, if the team requires it). |

Protections: nobody can change the **Owner**. A member can't change their own role or status, and can't give anyone more access than they have.

## The roles

The **Owner** can do everything and is the only one who manages the team and edits roles. Four ready-made roles are created at installation, and you can create your own with **New role**.

| Role | What it can do | Refund limit |
|---|---|---|
| **Admin** | Everything except team access (Team & roles is None); the audit log is view only. | 100.00 in your reporting currency |
| **Content Manager** | Titles, categories, uploads, the release schedule and Home, and the website; can look at the review queue and comments. | No refunds |
| **Moderator** | The review queue, comments and reviews, and creators. | No refunds |
| **Finance & Support** | Users, support tickets, balance adjustments and refunds; can look at transactions and prices. Give it Transactions › Edit if it should receive the monthly creator report. | 20.00 in your reporting currency |

The **refund limit** is the largest single refund a member with that role may make. A role without one can't refund. The Owner can refund any amount.

### Permission areas

The Admin Panel is divided into **18 permission areas**. For each area a role gets **None** (the screen is hidden), **View** (they can look) or **Edit** (they can change things; Edit includes View). The server checks the permission on every screen, button and action, so hiding a menu item is never the only protection.

| Permission area | Covers |
|---|---|
| Titles & episodes | The Titles list and title editor |
| Categories | Categories (the genres on titles and in onboarding) |
| Uploads | Upload & pipeline |
| Schedule & Home | Release schedule and Home builder |
| Website | The public website editor |
| Review queue | Approving creators' work and viewer problem reports |
| Comments & reviews | Moderating what viewers post |
| Creators | Inviting and managing creators |
| Users | Viewers and their accounts |
| Support tickets | Help requests from the app |
| Balance adjustments | Adding or removing coins |
| Refunds | Refunding store purchases |
| Transactions | Purchases, exports, creator reports and Creator revenue |
| Prices & coin packs | Monetization: regions, coin packs, VIP plans, ads, rewards |
| Push | Sending push notifications |
| Settings | Settings and System |
| Team & roles | Members, invites and roles |
| Audit log | The history of every change |

<Anchor id="team-roles-and-permissions" />

### Roles and the permission matrix

The **Permissions** matrix shows what each role can do in each of the 18 areas. The Owner always has everything; that row can't be edited.

**Only the Owner** creates, edits and deletes roles:

- **New role**: give it a name and **Start from** a blank role or a copy of an existing one, then set each area.
- **Edit**: change the levels and the **refund limit**: the most one refund may be, in a currency you choose. Empty means no refunds.
- **Delete**: only a role nobody uses.

The four templates (Admin, Content Manager, Moderator, Finance & Support) keep their names; copy one to make a role with another name.

:::tip Least access
Give each person the smallest role their job needs. Every role change, sign-in and decision is recorded in the [Audit log](/admin-panel/using/system/audit-log/).
:::

## Two-factor authentication

Each member can turn on two-factor sign-in in **Your account**, with an authenticator app (Google Authenticator, Microsoft Authenticator, 1Password and the like). They get 8 recovery codes.

To make it **required** for everyone, the Owner turns it on in <AdminPath path="System › Settings › Sign-in & security" />. **Team & roles** shows who has it on. If a member loses their phone, the Owner can **Reset 2FA** for them on **Team & roles**, and they set it up again.

## Audit log

<AdminPath path="System › Audit log" /> records every action the team takes: who did what, and when. Rows can't be edited or deleted.

## Everyone who signs in

eDrama has four kinds of people, and each one signs in a different way and sees a different part of the system.

| Person | Signs in with | Uses |
|---|---|---|
| **Owner** (the Super Admin) | Email and password, optional two-factor | Everything, including the team and its roles. There is exactly one Owner. |
| **Team member** | Email and password, optional two-factor | The Admin Panel, limited by their role. |
| **Creator** | Google, email or phone, through Firebase | The Creator Portal, and only their own series. |
| **Viewer** | Google, Apple, phone, email, or as a guest | The mobile app. |

### The Owner

The Owner is created during installation (by the web installer, or with the `php artisan edrama:create-owner` command). Nobody can delete, disable or change the Owner or the Owner's role, not even another member with full access. Only the Owner can:

- create, edit and delete roles,
- require two-factor sign-in for the whole team,
- activate the license and install updates,
- change AI Studio's keys and billing,
- clear the demo data.

### Team sign-in rules

- Five wrong passwords for one email from one address lock that sign-in for 15 minutes.
- A session ends 12 hours after sign-in, and at the next click when a member is disabled.
- Passwords need at least 12 characters and must not appear in a known data breach.
- A member added with a temporary password must choose their own before anything else.

### Creators

A creator is **Invited** until they accept their invite, then **Active**. A **Suspended** creator can't sign in to the portal or send new work, but their live series stay live unless a reviewer unpublishes them. See [Becoming a creator](/creator-portal/becoming-a-creator/).

### Viewers

A viewer who opens the app for the first time becomes a **guest** automatically, with a welcome bonus. Signing in turns the guest into an account and carries over their coins and unlocks. Buying coins or VIP requires a signed-in account. A banned viewer is refused on their next request. See [Accounts](/features/viewer-app/accounts/).
