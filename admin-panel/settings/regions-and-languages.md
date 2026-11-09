---
sidebar_position: 2
title: Regions and languages
description: App and Admin Panel languages, language files, the reporting currency and exchange rates.
---

# Regions and languages

<AdminPath path="System › Settings › Regions & languages" />.

## Languages

The **app ships in English only**. Every other language is a JSON file you upload here, and the app downloads it at its next start, with no new app release. The same screen also offers languages for the Admin Panel.

Each language has **two files**: one for the mobile app and one for the Admin Panel.

:::caution Hindi is already on
A fresh install lists **Hindi** as offered in the app, without its app file. Upload its file, or edit it and turn off **Offered in the app**, before you launch.
:::

<Steps>
<Step title="Add the language">

Click **Add language** and fill in the **Code** (such as `hi`, or a regional code such as `pt-BR`; it can't change later), the **Name** and the **Native name** (how the language picker shows it, such as हिन्दी). Tick **Right to left (RTL)** for Arabic, Hebrew, Persian, Urdu and the like: the app and the Admin Panel turn their layout around.

</Step>
<Step title="Translate the file">

Download the **Sample JSON**: the English file with every key. Translate the values, never the keys, and keep words in braces such as `{name}` exactly as they are.

</Step>
<Step title="Upload it">

Open **Files** for the language and upload the app's JSON file (UTF-8, up to 1 MB, plain text only). Keys a file leaves out stay in English. Upload an Admin Panel file too if your team should use the Admin Panel in that language.

</Step>
<Step title="Turn it on">

Edit the language and tick **Offered in the app**. A language can only be turned on once it has its app file.

</Step>
</Steps>

- **Make default** sets the language new viewers start in, and anyone whose phone language isn't offered.
- **Studio language** sets the language the Admin Panel opens in for everyone who hasn't picked their own in the top bar.
- Every upload is a new **version**. **Versions** › **Make current** rolls back to an earlier one.

## Reporting currency and exchange rates

Your regions can sell in different currencies. The Dashboard and totals are shown in one **Reporting currency** (USD by default), and refund limits are compared in it.

Add an exchange rate for each currency a region uses: **Currency**, **Rate** (how much one unit is worth in the reporting currency, up to six decimals) and **Valid from**. A rate applies from its date until a newer one starts. Rows in a currency with no rate are left out of reporting totals until you add one.

## Regions

Countries, currencies, coin values, prices and ad limits per region are set in [Monetization › Regions](../monetization.md#regions).
