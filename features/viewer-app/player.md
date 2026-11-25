---
sidebar_position: 5
title: "The player"
sidebar_label: "Player"
description: "The vertical player: swiping between episodes, likes, comments, speed, quality, subtitles, reports, Up Next and screen protection."
---

The player shows one episode at a time, full screen, in portrait. **Swipe up** for the next episode, **down** for the previous. On a tablet or a wide window, the episode plays in a 9:16 column.

<Screen
  id="app-player"
  type="phone"
  wire="app-player"
  title="Player"
  caption="The player during episode 1: Back, the subtitles over the video, the buttons on the right (Like, Comments, Episodes, Share, More, Clean view), the series and episode at the bottom, and the progress bar."
  markers={[
    {x: 6.9, y: 5.7, title: 'Back', text: 'Returns to where the viewer came from.'},
    {x: 50, y: 50.5, title: 'Subtitles', text: 'Shown over the video in the viewer’s language when the episode has them.'},
    {x: 90.8, y: 43.6, title: 'Like', text: 'Double-tapping the video works too.'},
    {x: 90.8, y: 52, title: 'Comments', text: 'Comments on this episode, with the count.'},
    {x: 90.8, y: 60.5, title: 'Episodes', text: '“1/3”: the episode list, with what is watched, locked or coming soon.'},
    {x: 90.8, y: 68.9, title: 'Share', text: 'Shares a link to this episode.'},
    {x: 90.8, y: 77.3, title: 'More', text: 'Speed, quality, subtitles and Report a problem.'},
    {x: 90.8, y: 85.7, title: 'Clean view', text: 'Hides the buttons to watch the video alone.'},
    {x: 23.8, y: 86.2, title: 'Series and episode', text: '“E1 · The Wedding That Wasn’t”. Tap for the series page.'},
    {x: 50, y: 93, title: 'Progress', text: 'Drag to seek. Elapsed and total time on each side.'},
  ]}
/>

## Controls

| Control | What it does |
|---|---|
| **Tap** | Play or pause. |
| **Double-tap** | Like the episode. |
| **Press and hold** | Plays at **2× speed** while held. |
| **Clean view** | Hides the buttons; the way out fades after 2 seconds and comes back with a tap. |
| **More › Speed** | 0.75×, Normal, 1.25×, 1.5×, 2×. |
| **More › Quality** | **Auto** (adaptive, up to 720p without VIP), or a fixed quality the video has: 1080p (**VIP only**), 720p, 480p, 360p. With data saver on, Auto starts at 360p. |
| **More › Subtitles** | The languages the episode has, or Off. By default, subtitles follow the app language. |
| **More › Report a problem** | Video won't play, Sound or sync is off, Subtitles are wrong, Inappropriate content, Something else. *Thanks. The team will take a look.* Reports reach the [Review queue](/creator-portal/review-queue/). |

## Up next

When an episode ends, an **Up next** card counts down 3 seconds and plays the next one (**Play now** to skip the wait, or dismiss it). Autoplay can be turned off in <Path panel="app">Me › Settings › Autoplay next episode</Path>.

If the next episode is locked, the card says **Unlock for 60 coins** or **See unlock options**. If it isn't out yet: *E9 drops 12 Dec* with **Remind me** (follows the series).

## Locked episodes

A locked episode shows *Unlock for 60 coins (≈ $0.59), one short ad, VIP or the Series Pass.* and **See unlock options**. See [Unlocking episodes](/features/viewer-app/unlocking-episodes/). With **auto-unlock** on, the next episode unlocks with coins as it starts, never past the daily limit.

## YouTube episodes

Episodes your team added from YouTube play in **YouTube's own player** with nothing drawn over it, and are always free. A line says *Plays from YouTube. By watching you agree to YouTube's Terms of Service.* with **Watch on YouTube**.

## Screen protection

The player can't be captured: Android blocks screenshots and recordings, and iOS hides the video while the screen is recorded or mirrored (*Screen recording is on. Episodes can't be recorded.*). This is on by default ([Defaults & limits](/mobile-app/defaults-and-limits/#screen-protection)). The screenshot on this page was taken from a documentation build with it switched off.

## Watching counts

The app reports progress as the viewer watches. It drives **Continue watching**, views and stats, and VIP minutes for creators' earnings. An episode counts as watched at **90%**. The screen stays awake while playing.
