---
sidebar_position: 10
title: "AI Studio settings"
sidebar_label: "AI Studio"
description: "Switch AI Studio on, choose who pays (creator, admin or hybrid), add the platform key, and set models, limits and prices."
---

<Path>Settings › AI Studio</Path> controls AI Studio for both the team and creators. Creators make characters, storyboards and video takes in the Creator Portal on their own Gemini key or the platform's; the team makes them for your own series. Whatever creators make still goes through review like an upload.

## Keys and billing (Owner only)

**Who pays** decides whose Google account is billed:

| Mode | Meaning |
|---|---|
| **Creator managed** (default) | Every creator adds their own Gemini key and pays Google directly. Your limits don't apply to their key. |
| **Admin managed** | Every creator's calls go on **the platform's key**, within the limits and caps below. Creators don't add a key. |
| **Hybrid** | Each creator may use the platform's key, their own, or both, and chooses. Limits apply only to calls on the platform's key. |

| Setting | Default |
|---|---|
| **In Hybrid, creators may use** | Both keys (the creator chooses) |
| **In Hybrid, before a creator chooses** | The creator's own key |
| **Cap on the platform's key a month** | $100: every call on it, creators' and the team's. Blank for no cap. |
| **Each creator's allowance a month** | $10 on the platform's key. Each creator's page can set otherwise. |
| **Team studio a month** | $50. The team's AI Studio always uses the platform's key. |

**The platform's Gemini key** is added on its own card: use a key from a Google project with billing on; Google checks it before it's saved. It's stored encrypted and only its last 4 characters are shown. Removing it stops new calls on it (creators who use it are told, never moved to their own key).

## Switch and models

| Setting | Default | Meaning |
|---|---|---|
| **Switch on AI Studio** | Off | Off hides AI Studio from every creator. What they made stays. |
| **Image model** | `gemini-nano-banana-2.1` | |
| **Higher-quality image model** | `gemini-3-pro-image` | Offered as "Higher quality" on portraits. |
| **Video model** | `gemini-omni-1.2-flash` | |
| **Text model** | empty | Describes a portrait into a character's profile. Blank hides that button. |

Google retires models often; when it does, change the model ID here.

## What creators may pick

| Setting | Default |
|---|---|
| **Highest resolution** | 720p (360p, 720p or 1080p; 1080p is upscaled by Google and costs more a second) |
| **Default resolution** | 720p |
| **Default image size** | 2K |
| **Default aspect ratio** | 9:16 (the app plays portrait episodes; 16:9 is for promotional clips) |

## Limits per creator on the platform's key

They apply only to calls the platform pays for. Days and months run in UTC. Each creator's page can override them.

| Setting | Default |
|---|---|
| **Images a day** / **a month** | 100 / 1,500 |
| **Takes a day** / **a month** | 40 / 600 |
| **Calls at once** | 2 (keeps a Tier 1 Google key under its limit of 8 a minute) |
| **Characters per series** | 20 |
| **Prompt length** | 2,000 characters |
| **Keep unused files** | 30 days (rejected storyboards, unkept takes and unused versions are deleted after this) |
| **Ask to confirm images above** | $0.10 (every take always asks to confirm) |

## Prices for estimates

What Google charges, used for the estimate on every button and in budgets. Check Google's pricing page and update these when it changes.

| Item | Default |
|---|---|
| Image, `gemini-nano-banana-2.1` | 1K $0.0336 · 2K $0.0504 · 4K $0.113 |
| Higher quality, `gemini-3-pro-image` | 1K/2K $0.134 · 4K $0.24 |
| Video a second, `gemini-omni-1.2-flash` | 360p $0.035 · 720p $0.10 · 1080p $0.15 |

A model without a price here takes the highest price listed for that size.

## Per creator

On <Path>Community › Creators</Path>, a creator's **AI Studio** action shows their key status, who pays now and this month's usage, and lets you **Allow AI Studio** for them, set their limits on the platform's key, and (Owner only) which keys they may use in Hybrid and their monthly allowance.

## Google Gemini and YouTube


### Google Gemini (AI Studio)

AI Studio makes images and video with Google's Gemini models. It needs a **Gemini API key** from a Google project **with billing on**: create one at [Google AI Studio](https://aistudio.google.com/apikey).

| Key | Where | Used for |
|---|---|---|
| **The platform's key** | <Path>Settings › AI Studio › Keys and billing</Path> (Owner only) | The team's AI Studio, and creators in Admin managed or Hybrid mode. |
| **A creator's own key** | The creator's **Your account › AI Studio** | Their calls in Creator managed or Hybrid mode, billed to them. |

Google checks a key before it's saved; only its last 4 characters are shown afterwards. Default models: `gemini-nano-banana-2.1` (images), `gemini-3-pro-image` (higher quality), `gemini-omni-1.2-flash` (video). Google retires models often; change the IDs in Settings when it does.

Google's own limits apply to each key: a Tier 1 project allows about **40 videos a day** and 8 requests a minute, which is why eDrama runs 2 calls at once by default.

Prompts and images used in AI Studio are sent to Google, under the account that pays. Every frame Google makes carries its **SynthID** watermark. See [AI Studio settings](/admin-panel/settings/ai-studio/).

### YouTube episodes

With **Allow YouTube videos as episodes** on (<Path>Settings › Video pipeline</Path>, on by default), your team and creators can add a public YouTube video (Shorts suit it best) as an episode. Only the video's ID is stored; the server checks the video may be embedded, with no API key.

Before you use it:

- **Terms**: the app must follow the [YouTube API Services Terms of Service](https://developers.google.com/youtube/terms/api-services-terms-of-service) and the [YouTube Terms of Service](https://www.youtube.com/t/terms).
- **Privacy policy**: your policy must say the app uses YouTube API Services and link to the [Google Privacy Policy](https://policies.google.com/privacy).
- **No paywall**: YouTube episodes are **always free**: never sold with coins, an ad unlock, VIP or a Series Pass, and they earn creators nothing. Don't change this.
- **Player**: YouTube's own player and its ads stay as they are. Its quality and subtitles are YouTube's; the app's quality menu and subtitle files don't apply.
- **Rights**: add only videos you own or may show. Use the **Credit** field for attribution, such as *Title by Creator, CC BY*.

Uploading a file to the same episode later replaces the YouTube video once it's processed; an episode holding an uploaded video refuses a YouTube link.
