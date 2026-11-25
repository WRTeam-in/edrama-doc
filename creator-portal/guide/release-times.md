---
sidebar_position: 6
title: "Release times"
sidebar_label: "Release times"
description: "Choose when each approved episode drops, schedule a run of episodes, set your time zone, and hold new episodes for your times."
---

You decide when your approved episodes drop. Times are shown and picked in **your time zone**.

<Screen
  id="creator-release-times"
  type="browser"
  wire="list"
  url="/creator/titles/13/releases"
  title="Release times"
  caption="Release times for one series: Schedule episodes, the time zone, the rule, and the approved episodes with their release time and earliest allowed time."
  markers={[
    {x: 78.8, y: 13.6, title: 'Schedule episodes', text: 'Approved episodes in a range drop one a day at the same time.'},
    {x: 91.5, y: 13.6, title: 'Time zone', text: 'Times you already set stay at the same moment.'},
    {x: 46.9, y: 19.8, title: 'The rule', text: 'The earliest is 2 hours after the review team approves the episode (the platform sets this).'},
    {x: 60.4, y: 38.6, title: 'A release time', text: 'In your time zone. The episode goes out at that moment.'},
    {x: 60.4, y: 44.3, title: 'Not set', text: '“Not set: waiting for your time” until you pick one.'},
    {x: 78.8, y: 44.3, title: 'Earliest allowed', text: 'No release time can be earlier than this.'},
    {x: 90.5, y: 38.6, title: 'Set time / Clear', text: 'Pick a time no earlier than Earliest allowed, or clear it.'},
  ]}
/>

## Set a time

<Steps>

1. Open the series and choose **Release times** (or **Release schedule** in the menu for every series at once).
2. On an approved episode, choose **Set time**.
3. Pick the date and time. The earliest you can pick is shown.
4. Save. It reads *Episode 7 drops 12 Dec, 20:00 (Asia/Kolkata)*.

</Steps>

**Clear** removes a time: the episode stays approved and waits until you set a new one.

## Schedule a run

**Schedule episodes**: approved episodes in the range drop **one a day at the same time**. The first can't be earlier than the delay after approval. Episodes not approved yet are skipped.

## Hold new episodes for your times

When you send new episodes of a live series for review (**Submit new episodes** on the series page), the dialog has a **Hold them for my release times** switch. It is off unless you turn it on, and it decides what happens when the team approves those episodes:

- **On**: each one waits here until you set when it drops.
- **Off**: each one goes out as soon as it's approved.

## Release schedule

**Release schedule** in the menu lists every episode of yours that isn't out yet, across all your series, so you can plan your drops in one place.

:::info
The platform's team can change a release time when needed (for example to avoid two big drops at once). When they do, you get a notice.
:::
