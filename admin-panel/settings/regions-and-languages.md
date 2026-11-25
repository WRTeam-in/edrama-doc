---
sidebar_position: 2
title: Regions and languages
description: App and Admin Panel languages, language files, the reporting currency and exchange rates.
---

# Regions and languages

<Path>Settings › Regions & languages</Path> has three parts: **languages** (for the app and the Studio), the **reporting currency** with its **exchange rates**, and a link to per-region prices in Monetization.

## Languages

The **app ships in English only**. Every other language is a JSON file you upload here, and the app downloads it at its next start, with no new app release. Each language has **two files**: one for the mobile app and one for the Admin Panel. Translate the values, never the keys, and keep words in braces such as `{name}` exactly as they are. **Upload pack** uploads several files at once.

The app ships only English; every other language comes from here, downloaded at the app's next start. The Studio can offer languages too.

Each language has **two JSON files**:

| File | Used by | Checked against |
|---|---|---|
| **Mobile app** | The viewer app | The app's English base file, with its `{placeholders}` |
| **Admin panel** | The Studio and the Creator Portal | The Studio's English text, with placeholders such as `:name` |

The table shows each language's code, source, current pack, **platform coverage** (how many keys each file covers), whether it's right to left, and whether it's **in the app**.

### Add a language

<Steps>

1. Choose **Add language**.
2. Fill in:
   - **Code**: the code the app uses, such as `hi` or `pt-BR` (lower case; fixed once created).
   - **Name** and **Native name** (how the language picker shows it, such as हिन्दी).
   - **Right to left (RTL)**: for Arabic, Hebrew, Persian, Urdu and the like. The app and the Studio turn their layout around.
3. Save, then choose **Files** on its row.
4. Download the **Sample JSON** (the English file with every key), translate the text, and **Upload file** under **Mobile app** (and **Admin panel** to offer it in the Studio).
5. **Edit** the language and turn on **Offered in the app**. A language can be turned on only once it has its app file.

</Steps>

### Language files: the rules

- A flat JSON object of `"key": "text"` pairs, UTF-8, **up to 1 MB**, plain text only (no HTML).
- Every key must exist in the English base file, with the same placeholders. Keys a file leaves out stay in English.
- Each upload becomes a **new version** and is live at once. Earlier versions are kept: open **Versions** and **Make current** to roll back.

### Default languages

- **Default app language**: new viewers, and anyone whose phone language isn't offered, see the app in it. Choose **Change** on its card, or **Make default** on a row.
- **Studio language**: the language the Studio opens in for members who haven't picked their own in the top bar.

:::caution[Hindi is already on]
A fresh install lists **Hindi** as offered in the app, but no Hindi file comes with it. Before you launch, upload its app file, or edit Hindi and turn off **Offered in the app**. Otherwise viewers who pick Hindi see English.
:::

## Reporting currency and exchange rates

Totals, the Dashboard and refund limits are shown in one **reporting currency** (USD by default). Each **exchange rate** says what one unit of a currency is worth in it, **from a date** until a newer rate starts. Stored purchases keep their own currency.

<Steps>

1. Choose **Add rate**.
2. Pick the **Currency**, the **Rate** (how many reporting-currency units one unit is worth, up to six decimals) and **Valid from** (rows on this day and later use it).
3. Optionally give a **Reason**, then **Save rate**.

</Steps>

Rates are marked **In force**, **Scheduled** (starts later) or **Earlier**. A rate for a currency and date that already has one replaces it. **Remove** a rate and its days use the rate before it, or are left out of totals if there's none.

:::warning[Add a rate for every currency you sell in]
If no rate is in force for a currency, its purchases are **left out** of totals and the Dashboard (the screens name the currency), and refunds in it can't be checked against a role's limit. Add one for each region's currency.
:::

**Change** the reporting currency on its card. Rates entered into the old currency stop applying, so enter rates into the new one straight away.

<Anchor id="regions" />

## Per-region settings

Countries, currencies, coin values, prices and ad caps live in Monetization: **Open Monetization › Regions** ([Regions](/admin-panel/monetization/#regions)).
