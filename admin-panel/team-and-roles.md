---
sidebar_position: 7
title: Team and roles
description: Add team members, give them roles, and protect sign-in with two-factor authentication.
---

# Team and roles

Your team signs in to the Admin Panel. Each member has one **role**, and each role allows **None**, **View** or **Edit** in each area. Manage both in <AdminPath path="System › Team & roles" />.

## Add a member

You have two ways:

- **Invite**: enter their email and role. They get an email link to set their own password. The link works once and for 7 days. Needs [email delivery](./settings/email.md).
- **Add member**: set a **Temporary password** (at least 12 characters) and share it with them securely. They must choose their own password at their first sign-in.

You can later **Change role**, **Disable** (they are signed out on their next click) and **Enable** a member. Every change is recorded in the audit log.

## The roles

The **Owner** can do everything and is the only one who manages the team and edits roles. Four ready-made roles come with eDrama, and you can create your own with **New role**.

| Role | What it can do |
|---|---|
| **Admin** | Everything except team access; the audit log is view only. Refunds up to 100.00 in your reporting currency. |
| **Content Manager** | Titles, uploads and the release schedule; can look at the review queue. |
| **Moderator** | The review queue and creators. |
| **Finance & Support** | Users, balance adjustments and refunds; can look at transactions and prices. Refunds up to 20.00. Give it Transactions › Edit if it should receive the monthly creator report. |

The areas a role can be given are: Titles & episodes, Uploads, Schedule & Home, Review queue, Creators, Users, Balance adjustments, Refunds, Transactions, Prices & coin packs, Push, Settings, Team & roles, and Audit log.

## Two-factor authentication

Each member can turn on two-factor sign-in in **Your account**, with an authenticator app (Google Authenticator, Microsoft Authenticator, 1Password and the like). They get 8 recovery codes.

To make it **required** for everyone, the Owner turns it on in <AdminPath path="System › Settings › Sign-in & security" />. **Team & roles** shows who has it on.

## Audit log

<AdminPath path="System › Audit log" /> records every action the team takes: who did what, and when. Rows can't be edited or deleted.
