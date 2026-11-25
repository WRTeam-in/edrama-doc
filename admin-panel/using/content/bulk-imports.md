---
sidebar_position: 6
title: "Bulk imports and downloads"
sidebar_label: "Bulk imports"
description: "Import titles, prices, translations and creator invites from a CSV or Excel file, and download any table."
---

When you have many titles, prices or translations to change, a spreadsheet is faster than the editor. Several screens have an **Import** button that takes a CSV or Excel file, shows you exactly what each row will do, and saves everything together, or nothing at all.

## How every import works

<Steps>

1. Choose **Import** and the kind of import.
2. Choose **Download the template**. For prices and translations, the template already contains your current data, so you only change what you mean to.
3. Fill it in, then save it as **CSV (UTF-8)** or **Excel (.xlsx)**. (In Excel, choose *CSV UTF-8* when saving, or some letters will be lost.)
4. Upload it. The **Review** step shows each row as **Ready**, **Unchanged** or **Problem**, with the reason for each problem.
5. If there are no problems, choose **Import**. All rows are saved together.

</Steps>

:::info
**Nothing is saved while a row has a problem.** Fix the file, go back and upload it again. Columns the import doesn't read are listed and ignored.
:::

## The four imports

| Import | Where | What each row does |
|---|---|---|
| **New titles** | <Path>Content › Titles › Import</Path> | Creates a **draft** title with its owner, details, categories and default-region price. Posters and episodes are added in the editor afterwards. |
| **Prices** | <Path>Content › Titles › Import</Path> | Changes coin and Series Pass prices, with a column pair per region (`coin_price:IN`, `series_pass_price:IN`). Only prices that differ change. Asks for one **reason**, recorded for every title that changes and sent to the creator of a creator series. |
| **Translations** | <Path>Content › Titles › Import</Path> and <Path>Content › Categories</Path> | Fills in each title's (or category's) text per language, with a column per language and field (such as `name:hi`). An emptied cell removes that translation. The default language's columns are there for reference only. |
| **Invite from a file** | <Path>Community › Creators</Path> | Invites each row as a creator, exactly as **Invite creator** does: name, handle, contact email and share percent (empty uses the default share). |

### New titles: the rules

- A **licensed** title needs its licensor; its share is a number from 0 to 100.
- A **creator** title needs the creator's handle or contact email; invite them first.
- Age rating: one of All, 13+, 16+ or 18+.
- Categories must be active ones, separated by `;`.
- A Series Pass price needs the coin price too.
- A title with the same name as an existing one is added under its own slug.

### Prices: the rules

- The default region always keeps a coin price.
- Leave a region's cells empty to remove its own price, so it uses the default region's.
- Viewers keep the price they unlocked at ([price lock](/features/coins-and-unlocks/)).

## Downloading any table

Every table has a **Download** menu next to its search. It saves **exactly what the table shows**, with your search and filters, as **CSV, MS-Excel, JSON, XML, TXT or SQL**. A table too big for one download asks you to narrow it first. Each download is recorded in the audit log as *Table downloaded*.

For money reports, use **Export CSV** and **Monthly creator report** on [Transactions](/admin-panel/using/money/transactions/).
