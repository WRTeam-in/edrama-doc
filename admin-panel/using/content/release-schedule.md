---
sidebar_position: 7
title: "Release schedule"
sidebar_label: "Release schedule"
description: "Plan when each episode drops, move drops by drag and drop, schedule a run of episodes, and fix held episodes."
---

The **Release schedule** is a calendar of your drops. Every episode goes out at its own **publish time**; a background task checks every minute and releases what's due.

<Access area="Schedule & Home" view="See the calendar" edit="Set, change and clear publish times" />

<Screen
  id="admin-release-schedule"
  type="browser"
  wire="calendar"
  url="/admin/schedule?zone=Asia/Kolkata"
  title="Release schedule"
  caption="The Release schedule for this week in India time, with five drops of Ten Years Later."
  markers={[
    {x: 62.5, y: 23.1, title: 'Schedule episodes', text: 'One episode a day at the same time, for a range of episodes.'},
    {x: 26.7, y: 23.1, title: 'Time zone', text: 'Read and pick times in any region’s time zone.'},
    {x: 75.5, y: 23.1, title: 'Week', text: 'Previous and next week, and back to this week.'},
    {x: 24.4, y: 30.6, title: 'This week', text: 'Episodes dropping, series, followers to remind and held episodes.'},
    {x: 38.3, y: 50.4, title: 'A drop', text: 'Title, episode and time. Drag it to another slot, or select it to change the time.'},
    {x: 37.6, y: 59.3, title: 'Ready to schedule', text: 'Processed episodes with no publish time yet.'},
    {x: 53.1, y: 66.8, title: 'Set time', text: 'Give a ready episode its publish time.'},
    {x: 78.2, y: 59.3, title: 'Reminders', text: 'Drop alerts, the daily push limit, quiet hours and VIP renewal reminders.'},
  ]}
/>

## Set or change a time

- **Drag** a block to another day or time.
- Or **select** it and choose **Change time**: pick the date and time and choose **Save time**. It goes out within a minute of that time.
- Leave the time empty to take the episode **off the schedule**.

Times are stored in universal time and shown in the **time zone** you pick at the top, so a drop at 20:00 in India is still right for a teammate in London. Changing the clocks for daylight saving never moves a drop.

## Schedule a run of episodes

<Steps>

1. Choose **Schedule episodes**.
2. Pick the **Title**, **From episode** and **To episode**.
3. Pick the **First day** and the **Time**.
4. Choose **Schedule**.

</Steps>

One episode drops each day at the same local time. Released episodes keep their time; a new time replaces an old one.

## Held episodes

If an episode's time has passed but it couldn't go out, it's **held**, and a card lists it with the reason:

| Reason | Fix |
|---|---|
| Not processed yet | Wait for processing, or check [Upload & pipeline](/admin-panel/using/content/upload-pipeline/). |
| The upload failed | Upload the file again. |
| Under the length floor | [Allow it with a reason](/admin-panel/using/content/episodes-and-subtitles/#the-45-second-floor), or upload a longer cut. |
| Not approved | A creator's episode must be approved in the [Review queue](/creator-portal/review-queue/). |
| The title isn't live | Publish the title. |

Once fixed, the episode is released within a minute.

## Creators' episodes

Creators set their own release times for approved episodes in the Creator Portal ([Release times](/creator-portal/guide/release-times/)). If a team member changes one of those times here, the team's time wins; the change is recorded in the audit log and the creator gets a notice.

## Reminders

The **Reminders** card summarises what followers receive: one **drop alert** per series per day (later drops the same day update it, such as "E22–E25 of …"), at most the daily push limit per viewer, never during quiet hours, and VIP renewal reminders 24 hours before each charge. Change the limits in <Path>Settings › Notifications</Path>.
