---
sidebar_position: 4
title: The review queue
description: How your team reviews creator series, episodes and series updates, and resolves viewers' problem reports. Every decision is logged.
---

# The review queue

<AdminPath path="Community › Review queue" /> holds creator submissions (new series, new episodes and updates to live series) and viewers' reports. Nothing a creator submits reaches viewers without a person's decision here. Team members whose role has **Review queue** › Edit work here (the **Moderator** role, for example). The **Queue**, **Decided** and **All** tabs, and filters by type and assignee, help you find an item.

<Access area="Review queue" view="See the queue" edit="Decide items" />

<Screen
  id="admin-review-queue"
  type="browser"
  wire="split"
  url="/admin/review-queue?type=series"
  title="Review queue"
  caption="The Review queue with a creator’s new series selected, and the Decision panel."
  markers={[
    {x: 23.6, y: 22.9, title: 'Queue stats', text: 'Open items, the oldest waiting, the median time to a decision and how many were sent back.'},
    {x: 20.8, y: 38.2, title: 'Queue, Decided, All', text: 'And filters by type: Series, Episodes, Reports, Series updates, and by who it’s assigned to.'},
    {x: 29.8, y: 51.5, title: 'An item', text: 'Its name, who sent it and how long it has waited. Amber after 18 hours, red after 24.'},
    {x: 50, y: 65.7, title: 'Rights declaration', text: 'When and from where the creator declared their rights.'},
    {x: 46.4, y: 77.1, title: 'Details', text: 'Synopsis, age rating, categories, free episodes, coin price and where it’s shown; the episodes are below.'},
    {x: 88.9, y: 54.9, title: 'Approve', text: 'Confirm free episodes, price and regions; it goes live at its release time.'},
    {x: 88.9, y: 59.9, title: 'Request changes', text: 'Sends it back with your reason, which the creator sees.'},
    {x: 88.9, y: 64.9, title: 'Reject', text: 'It won’t go live. Needs a reason.'},
    {x: 88.9, y: 81.9, title: 'Assign to me', text: 'So two reviewers don’t watch the same item.'},
  ]}
/>

## What lands in the queue

| Type | What it is |
|---|---|
| **Series** | A creator's new series, sent with its ready episodes. |
| **Episodes** | New episodes of a creator's live series, each on its own. |
| **Series updates** | Proposed changes to a live series' details. The series stays live as it is until you approve. |
| **Reports** | Problem reports viewers send from the player ("Video won't play", "Subtitles are wrong"…). |

## Working an item

1. **Assign to me** an item, so nobody else works on it at the same time. A colleague can **Take over** if you can't finish it (recorded in the audit log). Keyboard shortcuts are listed at the top: move between items, approve and reject.
2. Watch the episodes and check the artwork, prices and rights.
3. Decide:

| Decision | What happens |
|---|---|
| **Approve** | For a series, you confirm the **free episodes**, the **coin price per episode** (both within the [creator price limits](/admin-panel/settings/payments/#creator-price-limits)) and **where it's shown** first. It goes live at once; episodes go live at their release time, or at once if they have none |
| **Request changes** | The creator sees your reason (up to 1,000 characters) and can fix it and resubmit |
| **Reject** | The creator sees your reason. A rejected series can't be changed or sent again |
| **Unpublish** | Takes a live series or episode down at once, with a reason. Viewers who unlocked it keep their unlocks |
| **Mark resolved** | Closes a viewer's report, with a note only the team sees |
| **Ask the creator to fix it** | Sends a report on a creator's episode to the creator and resolves the report. The episode stays live |

Each decision on a creator's work writes a notice in their portal and sends them an email, and is recorded in the audit log. **Earlier decisions** on the same work are listed under each item. You can't approve a series you own as a creator: another reviewer has to. If you change where a creator's series is shown, the creator gets a notice and an email saying where.

:::tip Check the rights declaration
Every creator submission records a **rights declaration**: when it was made, from which address, and the declaration version. If an item has none, ask the creator to declare their rights before you approve.
:::

### Series updates

For a **series update**, a table compares each changed field, **Now** and **Proposed**: name, subtitle, kicker, schedule line, audio languages, synopsis, categories, age rating, poster, banner, free episodes, coin price and regions. Approving applies them; requesting changes or rejecting leaves the series as it is.

### Problem reports

A report shows the reason, the episode, the moment in the episode, the device and app version, the viewer's message, and other reports on the same episode.

| Action | Use it when |
|---|---|
| **Mark resolved** | You fixed or checked it. Write a resolution note (such as "re-encoded E14 and playback works again"). The note stays with the team. |
| **Ask the creator to fix it** | It's a creator's episode. They get your reason in the portal and by email; the episode stays live. The report is resolved. |
| **Unpublish this episode** | Viewers shouldn't see it meanwhile. |

## Waiting times

Aim for a decision within **24 hours**: items turn **amber after 18 hours** and **red after 24 hours** in the queue, so nothing waits too long.

## Comments and reviews

Comments and series reviews that hit the [comment blocklist](/admin-panel/settings/app-and-support/#comment-blocklist) wait for a person in <AdminPath path="Community › Comments & reviews" /> ([Comments and reviews](/admin-panel/using/community/comments-and-reviews/)).
