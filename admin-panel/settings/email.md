---
sidebar_position: 5
title: Email delivery and templates
description: Connect an SMTP server so eDrama can send emails, and change the wording of each email.
---

# Email delivery and templates

eDrama sends team invites, password resets, creator emails and system alerts. Until you add an SMTP server, emails are only written to the server's log and **nobody receives them**.

## Email delivery (SMTP)

<AdminPath path="System › Settings › Email delivery (SMTP)" /> shows how email is sent right now. Add your mail provider's SMTP details on the **SMTP server** card:

| Field | What to enter |
|---|---|
| **SMTP host** | Your provider's SMTP server, such as `smtp.gmail.com` or the host your hosting company gives |
| **Port** | Usually `587` with STARTTLS, or `465` with SSL/TLS |
| **Encryption** | **STARTTLS (port 587)**, **SSL/TLS (port 465)**, or **None** (only for a mail server on your own private network) |
| **Username**, **Password** | The mailbox login. For Gmail and Google Workspace, use an [app password](https://support.google.com/accounts/answer/185833), not the account password. |
| **From address** | The address emails come from, such as `no-reply@your-domain.com` |
| **From name** | Optional. The sender name people see. Your app's name when empty. |

Click **Send test email** to check it. The details are stored encrypted, and they take over from any `MAIL_*` values in `.env`.

:::note Emails go out through the queue
Emails are sent by the [background jobs](../background-jobs.md). If they don't run, emails wait. Saving new SMTP details restarts the workers so they use them.
:::

## Email templates

<AdminPath path="System › Settings › Email templates" /> lists the emails sent to your team and to creators. For each one you can **Preview** it, **Send test**, **Customize** its wording, and **Reset** it to the default.

Editable parts: **Subject**, **Greeting**, **Text before the button**, **Button**, **Text after the button** and **Sign-off**. Markdown works (`**bold**`, `*italic*`, `[links](https://…)`), and the placeholders listed on the form are filled in for you. The button always links to the right page.
