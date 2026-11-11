---
sidebar_position: 4
title: Firebase and notifications
description: Connect Firebase for viewer sign-in and push, set push limits, and get alerts when a background job fails.
---

# Firebase and notifications

<AdminPath path="System › Settings › Notifications" />.

eDrama uses **one Firebase project** for the app, the Admin Panel and the Creator Portal: viewers and creators sign in with Firebase Authentication, and pushes go out through Firebase Cloud Messaging.

:::tip Create the Firebase project first
Creating the project, adding the Android and iOS apps and running `flutterfire configure` are covered in the [Mobile App › Firebase](/mobile-app/firebase/) guide. Use the same project here.
:::

## Firebase keys

Click **Add keys** (or **Replace keys**) on the **Firebase** card.

| Field | Where to find it |
|---|---|
| **Project ID** | Firebase console › Project settings › **General** › Project ID |
| **Service account JSON** | Firebase console › Project settings › **Service accounts** › **Generate new private key**. Open the downloaded JSON file and paste its whole contents. |
| **Web API key** | Optional, but needed for the Creator Portal's sign-in. Project settings › General › **Your apps**: add a **Web app** if you have none, and copy its `apiKey` (it starts with `AIza`). |
| **Auth domain** | Optional, but needed for the Creator Portal's sign-in, such as `your-project.firebaseapp.com` (the web app's `authDomain`). |

Press **Save keys**. Secrets are stored encrypted and never shown again; leave one empty to keep its current value. Then press **Test connection**: it checks the key with Firebase Cloud Messaging without sending anything. Keys already set in the server's `.env` show as coming from the server's environment, and saving a value here replaces them.

![Where the Firebase service account key is generated](/images/admin/firebase-service-account.webp)

## Push limits

| Field | What it does |
|---|---|
| **Maximum per viewer per day** | 3 to start, up to 20. Pushes above this wait for the next day. The in-app inbox still gets every message. |
| **Quiet hours start** / **Quiet hours end** | 23:00 to 08:00 to start, in each viewer's own time. Pushes wait until quiet hours end. |

The app reads these at its next start. Pushes need the [background jobs](../background-jobs.md) running.

## Notification messages

What the automatic notifications say, in each app language: **New episodes (drop alerts)**, **Reply to a comment**, **New series from a followed creator**, **VIP renewal reminder** and **Several notifications in one**. Press **Edit** on one to change its lines per language. The `{placeholders}` listed under each line are filled in when it's sent. A line left empty uses the language file's text. **Restore default wording** puts every language back.

## System alerts

Who hears within minutes when a background job or scheduled task fails.

Fill in at least one of the two:

- **Alert emails**: one or more addresses, separated by commas. Members who can edit Settings also get a bell notification in the Admin Panel. Emails need [SMTP](./email.md).
- **Slack webhook URL**: an incoming webhook for your team's alerts channel (Slack › Apps › Incoming Webhooks), starting with `https://hooks.slack.com/services/`.

**Test connection** on this card sends a test alert.
