---
sidebar_position: 2
title: "My series"
sidebar_label: "My series"
description: "Your series list by status, and the series page with its episodes, details and history."
---

**My series** lists every series you've made, with where it stands.

<Screen
  id="creator-my-series"
  type="browser"
  wire="list"
  url="/creator/titles"
  title="My series"
  caption="My series: the status cards (All series, Drafts, In review, Changes requested, Live) and the list of series with status, episodes and last update."
  markers={[
    {x: 94.1, y: 14.6, title: 'New series', text: 'Start a new series.'},
    {x: 22.7, y: 22.9, title: 'Status cards', text: 'All series, Drafts, In review, Changes requested, Live. Click one to filter.'},
    {x: 82.4, y: 37.6, title: 'Search, filter, download', text: 'Find a series by name, filter the list or download it.'},
    {x: 48.8, y: 48.2, title: 'A series', text: 'Click to open its page. “Update in review” shows under the name while a change waits.'},
    {x: 78.2, y: 49.4, title: 'Status', text: 'Draft, In review, Changes requested, Approved, Live, Rejected or Unpublished.'},
    {x: 95.6, y: 49.4, title: 'Edit', text: 'Opens the series form.'},
  ]}
/>

## Series statuses

<Flow
  steps={['Draft', 'In review', {label: 'Approved', tone: 'accent'}, {label: 'Live', tone: 'live'}]}
  caption="From In review, a series can also come back as Changes requested, or be Rejected. A live series can be Unpublished by the team."
/>

| Status | What you can do |
|---|---|
| **Draft** | Edit everything, upload episodes, send for review, delete. |
| **In review** | Wait. The series can't be changed or take new episodes meanwhile. |
| **Changes requested** | Read the reason in History, fix it, send again. |
| **Approved** | Wait for its release time. Can't be changed now. |
| **Live** | Upload and send new episodes; propose changes as an update. |
| **Rejected** | Can't be changed. See why in History. |
| **Unpublished** | Contact the team to change it. |

## The series page

<Screen
  id="creator-series-page"
  type="browser"
  wire="editor"
  url="/creator/titles/13"
  title="Series page"
  caption="A live series page: the hero with status and the at-a-glance strip, the actions, the episode list with each episode’s status, About and History."
  markers={[
    {x: 45, y: 9.9, title: 'Series and status', text: 'Poster, name and status, with what changed and when.'},
    {x: 29.3, y: 16, title: 'At a glance', text: 'Episodes out, free episodes, price per episode, and views, unlocks and followers over the last 28 days.'},
    {x: 42.5, y: 23.3, title: 'Actions', text: 'Stats, Comments & reviews, Release times, AI Studio, Upload episodes and Edit series. A draft shows Submit for review and Delete series too.'},
    {x: 77.6, y: 23.3, title: 'Complete', text: 'Marks the series complete (no more episodes coming). Clear undoes it.'},
    {x: 45.8, y: 30.4, title: 'Episodes', text: 'Each episode’s status and what it needs before you can send it. Rename or delete unreleased ones.'},
    {x: 62.5, y: 48.5, title: 'An approved episode', text: 'Approved and waiting for its release time. Set it on Release times.'},
    {x: 86.7, y: 30.4, title: 'About', text: 'Synopsis, categories, subtitle, schedule line, age rating, regions, VIP, ads and Complete.'},
    {x: 86.7, y: 80, title: 'History', text: 'Every status change and review decision, newest first, with the reviewer’s reason.'},
  ]}
/>

| Part | What's there |
|---|---|
| **At a glance** | Episodes out; **views**, **unlocks** and **followers** over the last 28 days. |
| **Episodes** | Each episode's status. Before it can be sent: *Ready to submit? Yes*, or why not (still processing, the upload failed, or shorter than 45 seconds). **Rename** an episode (leave the name empty to show its number) or **Delete** one that isn't released and nobody paid for. |
| **About** | Where it's shown, categories, age rating, subtitle, new-episode schedule, whether it's included with VIP, whether ads can unlock episodes, and Complete. |
| **History** | Every status change and decision, by **You**, the **Review team** or **Automatic**, with reasons. |

### Mark as complete

When every episode is out, choose **Mark as complete**: viewers then see "Complete" instead of the next drop. A new episode clears it; **Clear Complete** removes it yourself.

### Delete a draft

**Delete series** removes a draft for good. You can only delete a draft no viewer has paid for.
