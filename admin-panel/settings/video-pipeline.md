---
sidebar_position: 6
title: Video pipeline
description: Upload limits, YouTube episodes, and limits for creators' uploads.
---

# Video pipeline

**Where:** <AdminPath path="System › Settings › Video pipeline" />

The **Where videos live** card at the top shows who handles episode videos and where images and documents are kept. Change that on [Storage & video](./storage-and-video.md).

## Uploads

Episode files go from the browser straight to where videos live, as MP4, MOV or MKV.

| Setting | Default | Meaning |
|---|---|---|
| **Largest file** | 20 GB | Larger episode files are refused before they upload. Up to 200 GB. |
| **Allow YouTube videos as episodes** | On | Adds **Add YouTube video** for your team and creators. These episodes are **always free**, because YouTube doesn't allow charging for them. Turning this off keeps those already added. |

The **episode length floor** (45 seconds) is also part of this pipeline: see [Episodes & subtitles](/admin-panel/using/content/episodes-and-subtitles/#the-45-second-floor).

## Creator uploads

Limits for creators in the [Creator Portal](/creator-portal/):

| Setting | Default | Meaning |
|---|---|---|
| **Largest file a creator uploads** | 2 GB | Up to the team's limit above. |
| **Episodes a creator has processing at once** | 10 | Up to 200. Uploading or processing; more wait until one finishes. |
| **Earliest release after approval** | 2 hours | A creator's release time must be at least this many hours after your team approves the episode, up to 720. `0` allows any time from now. |

Press **Save** to apply both cards.
