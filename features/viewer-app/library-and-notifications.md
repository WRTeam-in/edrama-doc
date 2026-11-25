---
sidebar_position: 6
title: "Library and notifications"
sidebar_label: "Library & notifications"
description: "The Library's Watching, My List and Unlocked shelves, and the notification inbox."
---

## Library

The **Library** tab has three shelves:

<Screen
  id="app-library"
  type="phone"
  wire="app-list"
  title="Library"
  caption="The Library on Watching: series in progress with their poster, the episode reached and when, a progress bar, and Resume, or the price when the next episode is locked."
  markers={[
    {x: 92.2, y: 6.6, title: 'Search', text: 'Finds a series in the Library.'},
    {x: 30.8, y: 12.8, title: 'Watching · My List · Unlocked', text: 'The three shelves.'},
    {x: 40, y: 22.8, title: 'A series in progress', text: '“E1 of 5 · Today”: the episode reached, when it was watched, and how far.'},
    {x: 84, y: 22.8, title: 'Resume', text: 'Back where they stopped.'},
    {x: 86, y: 48.1, title: 'Next episode locked', text: 'Its price shows instead. Tap to unlock it.'},
    {x: 38.8, y: 93.8, title: 'Library tab'},
  ]}
/>

| Shelf | What's there |
|---|---|
| **Watching** | Series in progress, newest first: *E7 of 24*, today/yesterday/days ago, **Resume**, the **Next drop**, or *Episode 8 is locked*. Empty: *Start something from Home and it shows up here, right where you stopped.* |
| **My List** | Series saved with the bookmark. **Remove from My List** to take one off. |
| **Unlocked** | Episodes unlocked and Series Passes bought: *Series Pass · all 24 episodes*, *5 episodes unlocked*. |

*Unlocks belong to your account, not this phone. They come back on any device you sign in to.*

## Notifications

The bell on Home (and <Path panel="app">Me › Notifications</Path>) opens the **inbox**: new episodes of followed series, replies to the viewer's comments, new series from followed creators, offers, and VIP renewal reminders. Unread ones are marked; **Mark all as read** clears them. Tapping one opens what it's about (a reply opens the comments).

*You get at most 3 alerts a day.* Pushes are held during **quiet hours** (23:00–08:00 by default) and arrive when they end.

### What viewers can switch

In <Path panel="app">Me › Settings › Notifications</Path>:

| Switch | Default | Meaning |
|---|---|---|
| **Drop alerts** | On | New episodes of series they follow, at most a few a day. |
| **Replies** | On | When someone replies to their comment. |
| **Offers** | On | Bonus coins and win-back offers, at most weekly. |
| **VIP renewal reminders** | Always on | *So a renewal never surprises you.* |

:::note[To confirm]
The defaults for these switches are set by the server when an account is created; check them in the app after installing if they matter to you.
:::
