---
sidebar_position: 5
title: Email delivery and templates
description: Connect an SMTP server so eDrama can send emails, and change the wording of each email.
---

# Email delivery and templates

eDrama sends team invites, password resets, every creator email (invites, review decisions, suspensions…) and system alerts. **SMTP** is the standard way a server sends email through your email provider. Until you add an SMTP server, emails are only written to the server's log and **nobody receives them**.

## Email delivery (SMTP)

<AdminPath path="System › Settings › Email delivery (SMTP)" /> shows how email is sent right now:

| Status | Meaning |
|---|---|
| **Through the SMTP server below** | Every email the Studio and the Creator Portal send uses it. |
| **Not sent: emails are written to the server's log** | Nobody receives emails. Add an SMTP server. |
| **Through the server's own settings** | From the `MAIL_*` values in `.env`. An SMTP server added here takes over. |

Press **Add keys** on the **SMTP server** card and enter your mail provider's details:

| Field | What to enter |
|---|---|
| **SMTP host** | Your provider's SMTP server, such as `smtp.gmail.com` (without `https://`) or the host your hosting company gives |
| **Port** | `587` to start. Usually `587` with STARTTLS, or `465` with SSL/TLS: your mail provider says which. |
| **Encryption** | **STARTTLS (port 587)** (default), **SSL/TLS (port 465)**, or **None** (only for a mail server on your own private network) |
| **Username**, **Password** | The mailbox login. Leave them empty only if the server needs no login. For Gmail and Google Workspace, use an [app password](https://support.google.com/accounts/answer/185833), not the account password. |
| **From address** | The address emails come from, such as `no-reply@your-domain.com`. It must be one your provider lets you send from (a verified sender or domain). |
| **From name** | Optional. The sender name people see. Your app's name when empty. |

Press **Save keys**, then **Send test email**: it sends a short email to your own address at once and shows what the mail server answered. The details are stored encrypted, and they take over from any `MAIL_*` values in `.env`.

:::note Emails go out through the queue
Emails are sent by the [background jobs](../background-jobs.md). If they don't run, emails wait (System health shows the queues). Saving new SMTP details restarts the workers so they use them.
:::

### Common providers

| Provider | Host | Port / encryption | Username |
|---|---|---|---|
| **Gmail / Google Workspace** | `smtp.gmail.com` | 587 STARTTLS | Your address; password = an [app password](https://myaccount.google.com/apppasswords) |
| **Amazon SES** | `email-smtp.<region>.amazonaws.com` | 587 STARTTLS | SES SMTP credentials |
| **SendGrid** | `smtp.sendgrid.net` | 587 STARTTLS | `apikey` (password = your API key) |
| **Any other** | Your provider's SMTP host | 587 STARTTLS or 465 SSL/TLS | Your SMTP login |

:::tip Land in the inbox, not spam
Set up **SPF**, **DKIM** and **DMARC** records for your sending domain, as your provider describes. It's the single biggest factor in deliverability.
:::

## Email templates

<AdminPath path="System › Settings › Email templates" /> lets you change the **wording** of every email sent to your team and to creators. The button's link, and how long it works, stay as the system sets them.

| Group | Email | Sent when |
|---|---|---|
| **Team** | Team invite | Someone is invited from Team & roles. |
| | Password reset | A member asks for a reset link. |
| | System alert | A background job or task fails (to the alert emails). |
| **Creators** | Creator invite | A creator is invited, an application accepted, or an invite resent. |
| | Application declined | An application is declined (the team's reason is never included). |
| | Creator suspended / reactivated | With the reason, for a suspension. |
| | Work received | A creator sends a series or new episodes for review. |
| | Work approved / Changes requested / Work rejected | A reviewer decides (with the reason). |
| | Work unpublished | A live series or episode is unpublished. |
| | Price changed | The team changes a creator series' prices. |
| | Regions changed | The team shows a creator's series in other regions than they chose. |
| | AI Studio budget | A creator's AI Studio spend reaches 80% and 100% of their budget. |

Each template shows **Default** or **Customized** (by whom and when). For each one you can:

- **Preview** it with example values.
- **Send test** to your own address (it only sends once SMTP delivers email).
- **Customize** its wording.
- **Reset** it to the default wording.

Editable parts: **Subject**, **Greeting**, **Text before the button**, **Button**, **Text after the button** and **Sign-off**. Markdown works (`**bold**`, `*italic*`, `[links](https://…)`), and the placeholders listed on the form are filled in when it's sent. The button always links to the right page. A saved change is used from the next email sent, and every change is in the audit log.

Team and creator emails are sent in English.
