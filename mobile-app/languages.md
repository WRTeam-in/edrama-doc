---
sidebar_position: 9
title: Languages
description: How eDrama's app gets its languages from the Admin Panel, with no new release.
---

# Languages

eDrama does this differently from most apps: **the app ships with English only**, and every other language is a JSON file you upload in the Admin Panel. The app downloads it at its next start, so you can add a language or fix a word without releasing a new version.

## Add a language

Everything happens in Admin Panel › Settings › **Regions & languages**: add the language, download the **Sample JSON**, translate it, upload it and turn it on. Step by step: [Regions and languages](/admin-panel/settings/regions-and-languages/).

- Right-to-left languages (Arabic, Hebrew, Persian, Urdu) turn the app's layout around.
- Keys a file leaves out stay in English.
- A fresh install already lists **Hindi** as offered. Upload its file, or turn it off, before you launch.
- `followDeviceLanguage` in `app_config.dart` starts the app in the phone's language when it's offered; otherwise viewers get your **default** language.

## Change the English texts

The English texts are in <FileRef path="assets/l10n/template.json" />: one `"key": "text"` pair per line. Change the text, never the key, and keep words in braces such as `{name}` as they are. The same file is the **Sample JSON** the Admin Panel offers for translating.
