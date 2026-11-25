---
sidebar_position: 4
title: "Upload episodes"
sidebar_label: "Upload episodes"
description: "Upload episode files to your series, add a YouTube video, upload subtitles, and check each episode is ready to send."
---

Open a series and choose **Upload episodes**, or use **Upload episodes** in the menu and pick the series. A series takes uploads while it's a **draft**, **sent back for changes**, or **live**.

<Screen
  id="creator-upload"
  type="browser"
  wire="upload"
  url="/creator/titles/25/upload"
  title="Upload episodes"
  caption="Uploading episodes to one series: your limits, the drop zone, and the Episodes pipeline with each file’s stages and status."
  markers={[
    {x: 39.6, y: 19.8, title: 'Your limits', text: 'Files up to 2 GB each, and up to 10 episodes uploading or processing at once (the platform sets both).'},
    {x: 92.6, y: 13.6, title: 'Add YouTube video', text: 'When the platform allows it. YouTube episodes are always free to watch.'},
    {x: 57.9, y: 35.7, title: 'Drop episode files', text: 'MP4, MOV or MKV, or Choose files. Episode numbers are read from file names, such as EP07: check them, then upload.'},
    {x: 65.2, y: 43.7, title: 'Resumes', text: 'A dropped connection picks up where it stopped.'},
    {x: 57.9, y: 52.9, title: 'Episodes', text: 'Every episode from upload until release: upload → process → ready.'},
    {x: 41.9, y: 75.4, title: 'Failed', text: 'Says why and what to do, such as “Upload it again”.'},
    {x: 42.5, y: 81.7, title: 'Uploading', text: 'Still on its way. “Ready to submit?” says what it waits for.'},
    {x: 41.9, y: 88, title: 'Ready', text: 'Processed and ready to schedule.'},
    {x: 92.2, y: 75.4, title: 'Subtitles', text: 'Add the episode’s subtitle files.'},
  ]}
/>

## Upload

<Steps>

1. Drag your files onto the page, or choose them. **MP4, MOV or MKV.**
2. Check each file's **episode number**: it's read from the file name (`EP07`, or the first number that isn't a year). Type it if it's missing.
3. Upload. Keep the page open until the files are sent. If your connection drops, the upload carries on where it stopped.

</Steps>

### Your limits

The platform sets these (defaults shown):

- **Files up to 2 GB** each.
- **10 episodes** uploading or processing at once; more wait until one finishes.
- **At least 45 seconds** per episode. Creators can't submit shorter episodes: upload a longer cut.

### Replacing an episode's video

You can replace the video of an episode that isn't in review, approved or released by uploading a new file with the same number. An episode in review, approved or already out can't be changed here: upload it as a new episode, or ask the team to replace it.

## Add a YouTube video

If the platform allows it, **Add YouTube video** makes an episode that plays in YouTube's own player. Paste a link to a **public** video that allows embedding (Shorts suit it best). These episodes are **always free**: YouTube's rules don't allow charging for them, so they earn nothing. Only add videos you own or may show; use the **Credit** field for attribution.

## Subtitles

On an episode, choose **Subtitles**: pick the **language** and an **SRT or WebVTT file** (UTF-8, times in order and within the episode). A new file replaces the old one for that language.

## Is it ready to send?

On the series page, each episode shows **Ready to submit?**:

| Shows | Means |
|---|---|
| **Yes** | It can be sent for review. |
| **Not yet: still uploading or processing** | Wait a few minutes. |
| **No: the upload failed** | Upload it again (the reason is shown). |
| **No: shorter than 45 seconds** | Upload a longer cut. |

Next: [Send for review](/creator-portal/guide/submit-for-review/).
