---
sidebar_position: 9
title: "AI Studio (team)"
sidebar_label: "AI Studio"
description: "Make characters, storyboards and video takes for your own series with Google Gemini, on your platform's key."
---

**AI Studio** helps make short dramas with Google's Gemini models: create **characters** with a consistent look, turn each **shot** into a **storyboard** image, generate video **takes** from it, then assemble the takes into an episode on a timeline. The team's AI Studio works on your own (eDrama Original and Licensed) series and always uses **the platform's Gemini key**. Creators have their own AI Studio in the Creator Portal.

:::info[Before you start]
AI Studio is **off** until an Owner switches it on and adds the platform's Gemini key in <Path>Settings › AI Studio</Path>. Every call is billed to that Google account. See [AI Studio settings](/admin-panel/settings/ai-studio/).
:::

<Screen
  id="admin-ai-studio"
  type="browser"
  wire="studio"
  url="/admin/titles/18/ai-studio"
  title="AI Studio"
  caption="AI Studio for one of your own series, before any character has been made."
  markers={[
    {x: 28.4, y: 22.9, title: 'Characters', text: 'Step 1: create the cast and their portraits.'},
    {x: 49.3, y: 22.9, title: 'Shots', text: 'Step 2: plan shots, make storyboards and takes.'},
    {x: 70.2, y: 22.9, title: 'Episodes', text: 'Step 3: cut kept takes into an episode in the episode editor.'},
    {x: 89.9, y: 22.9, title: 'Who pays', text: 'The team studio always uses the platform’s Gemini key.'},
    {x: 33.8, y: 30, title: 'Key notice', text: 'Shown until the Owner adds the platform’s Gemini key in Settings › AI Studio.'},
    {x: 55.9, y: 36.3, title: 'Series look', text: 'One style line every prompt of this series opens with.'},
    {x: 93.7, y: 37.5, title: 'Edit style', text: 'Change the style line.'},
    {x: 93.4, y: 48, title: 'New character', text: 'A name and an identity profile; then generate the portrait.'},
  ]}
/>

## The workflow

<Flow steps={['Characters', 'Looks', 'Shots', 'Storyboard', 'Takes', 'Timeline', {label: 'Episode', tone: 'live'}]} />

<Steps>

1. **Open a series.** <Path>Content › AI Studio</Path> lists your series that take new work. Pick one.
2. **Set the series look.** One **style line** every prompt opens with, such as *realistic, soft daylight, Korean drama look*.
3. **Create characters.** Give each a name and an **identity profile** (age range, face shape, skin tone, eye colour, hair, build, height, distinguishing marks, usual clothes, voice), then **Generate portrait** (or upload a reference image you have the rights to). Every look and shot starts from the portrait.
4. **Add looks.** Start from a preset (Casual, Office, Wedding, Night, Traditional) or describe one, such as *Ivory wedding dress, hair up, pearl earrings*. Regenerate, edit by prompt ("Change only the jacket to red"), or go back to an earlier version.
5. **Plan shots.** Give each shot a title and an episode, pick up to the allowed number of characters (each in one of their looks), a framing template (Close-up, Wide, Two-shot, Over-the-shoulder, Walking, Conversation), a camera move (Static, Push in, Pull out, Pan, Tilt, Tracking, Handheld, Orbit) and lines of dialogue with an emotion.
6. **Make the storyboard.** Generate a still for the shot and approve it: takes start from it.
7. **Generate takes.** Choose the mode (from the storyboard, from start and end stills, or from the cast's images), resolution (360p, 720p or 1080p, up to the allowed maximum) and length. Keep the take you like; edit a take by prompt to make a new one from it.
8. **Assemble the episode.** In the **Episode editor**, arrange kept takes (and imported videos) on a timeline and export. See [AI episode editor](/creator-portal/guide/ai-episode-editor/); the team's editor works the same way.

</Steps>

The finished video goes to the episode through the normal upload pipeline, and your series is reviewed and published as usual.

:::warning[Consistency]
AI characters won't look exactly the same in every image or take. The portrait, the look and the same profile in every prompt keep them close. Check each storyboard before you make takes: takes cost more.
:::

## Costs and limits

Each button shows an **estimate** from the prices set in Settings; Google's bill is the final word. The team's spending on the platform key can be capped per month (**Team studio a month**), and every call appears on [AI usage](/admin-panel/using/community/ai-usage/).

Common messages:

| Message | Meaning |
|---|---|
| Google blocked this prompt | Change the prompt and try again. |
| Your Google project reached its limit | Google's rate limit (Tier 1 allows 40 videos a day). Try later. |
| We lost Google's answer | It may already be on the Google bill: check before trying again. |
| The server stopped before this was sent | Nothing was sent or charged; try again. |
