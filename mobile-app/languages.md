---
sidebar_position: 9
title: Languages
description: How eDrama's app gets its languages from the Admin Panel, with no new release.
---

# Languages

eDrama does this differently from most apps: **the app ships with English only**, and every other language is a JSON file you upload in the Admin Panel. The app downloads it at its next start, so you can add a language or fix a word without releasing a new version. Keep words in braces, such as `{name}`, exactly as they are when you translate.

The app ships with **one** language built in: English. Every other language is a file you upload in the Admin Panel; the app downloads it at its next start. So you add a language, fix a typo or roll back a translation **without releasing a new version**.

<Anchor id="change-the-english-texts" />

## Change the English text

All English text is in `assets/l10n/template.json`, as `"key": "text"` pairs grouped by screen:

```json title="assets/l10n/template.json"
{
  "splash.tagline": "Stories that hook you. Prices that don't.",
  "unlock.title": "Keep watching",
  "store.title": "Top up"
}
```

Change the text, never the keys. Words in braces, such as `{coins}` or `{app}`, are filled in by the app: keep them as they are.

:::tip
You can also change English without a release: upload an English pack in the Admin Panel. Keep the app's `template.json` and the server's `resources/language-packs/app-template.json` the same so the two never disagree.
:::

## Add a language

Languages are added in the Admin Panel, not in the app:

<Steps>

1. Open <Path>Settings › Regions & languages</Path> and choose **Add language**: its code (such as `hi` or `pt-BR`), name and native name (such as हिन्दी), and whether it is **right to left**.
2. Choose **Files** on its row, download the **Sample JSON** (the English file with every key) and translate the text.
3. Upload it under **Mobile app** and turn on **Offered in the app**.

</Steps>

Full details: [Regions & languages](/admin-panel/settings/regions-and-languages/).

:::caution[Hindi is already on]
A fresh install lists **Hindi** as offered in the app, but no Hindi file comes with it. Before you launch, upload its app file, or edit Hindi and turn off **Offered in the app**. Otherwise viewers who pick Hindi see English.
:::

## How the app picks a language

- With `followDeviceLanguage = true` (the default in `app_config.dart`), the app starts in the phone's language when you offer it.
- Otherwise it uses your **default app language** from the Admin Panel.
- Viewers can switch any time in <Path panel="app">Me › Settings › App language</Path>, and pick their language during onboarding.

Series names, synopses, category names, push messages and legal pages can also be translated per language in the Admin Panel; viewers see them in their language when a translation exists.

## Right-to-left languages

For Arabic, Hebrew, Persian, Urdu and similar languages, tick **Right to left** when you add the language. The app turns its whole layout around automatically.
