---
sidebar_position: 5
title: Email delivery and templates
description: Connect an SMTP server so eDrama can send emails, and change the wording of each email.
---

# Email delivery and templates

eDrama sends team invites, password resets, creator emails and system alerts. Until you add an SMTP server, emails are only written to the server's log and **nobody receives them**.

## Email delivery (SMTP)

<AdminPath path="System › Settings › Email delivery (SMTP)" /> shows how email is sent right now: through the SMTP server set here, through the server's own `.env` mail settings, or not at all (written to the log). Press **Add keys** on the **SMTP server** card and enter your mail provider's details:

| Field | What to enter |
|---|---|
| **SMTP host** | Your provider's SMTP server, such as `smtp.gmail.com` or the host your hosting company gives |
| **Port** | `587` to start. Usually `587` with STARTTLS, or `465` with SSL/TLS: your mail provider says which. |
| **Encryption** | **STARTTLS (port 587)** (default), **SSL/TLS (port 465)**, or **None** (only for a mail server on your own private network) |
| **Username**, **Password** | The mailbox login. Leave them empty only if the server needs no login. For Gmail and Google Workspace, use an [app password](https://support.google.com/accounts/answer/185833), not the account password. |
| **From address** | The address emails come from, such as `no-reply@your-domain.com` |
| **From name** | Optional. The sender name people see. Your app's name when empty. |

Press **Save keys**, then **Send test email**: it sends a short email to your own address at once and shows what the mail server answered. The details are stored encrypted, and they take over from any `MAIL_*` values in `.env`.

:::note Emails go out through the queue
Emails are sent by the [background jobs](../background-jobs.md). If they don't run, emails wait. Saving new SMTP details restarts the workers so they use them.
:::

## Email templates

<AdminPath path="System › Settings › Email templates" /> lists the emails sent to your team and to creators. For each one you can **Preview** it, **Send test** (to your own address; it only sends once SMTP delivers email), **Customize** its wording, and **Reset** it to the default. A saved change is used from the next email sent.

Editable parts: **Subject**, **Greeting**, **Text before the button**, **Button**, **Text after the button** and **Sign-off**. Markdown works (`**bold**`, `*italic*`, `[links](https://…)`), and the placeholders listed on the form are filled in for you. The button always links to the right page.
