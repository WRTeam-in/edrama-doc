---
sidebar_position: 6
title: Edit the website
description: Every tab of Admin Panel › Content › Website, and how draft, preview and publish work.
---

# Edit the website

Everything on the website is edited in <AdminPath path="Content › Website" />. A live preview sits beside the form and shows what the form holds now, on a computer or a phone, in any language.

:::note Who can edit it
Members whose role has **View** on **Website** can open this page, and **Edit** is needed to change it. The **Website address** and the refresh secret need **Settings** › Edit. See [Team and roles](/admin-panel/team-and-roles/).
:::

<Shot src="/images/admin/website.webp" alt="Content, Website: the Sections tab with the home page sections and the Publish button" caption="The Sections tab. The live preview sits to the right of the form." width="720px" />

## Draft, preview, publish

| Action | What it does |
|---|---|
| **Save draft** | Keeps your changes. Visitors don't see them. |
| **Preview** | Opens the saved draft on your real website for 30 minutes. Nothing is published. Needs the **Website address** set. |
| **Publish** | Makes the draft live. Visitors see it within a minute. You can write what changed. |
| **Discard draft** | Throws away unpublished changes and goes back to the live version. |
| **Switch website off / on** | Off shows visitors a short "back soon" page and asks search engines not to index it. |

Every publish is kept in **Connection & history**. **Load into draft** brings an earlier version back so you can check it and publish it again.

## The tabs

### Sections

The home page is a list of sections you add, reorder, hide and style. Each section type has several **Style** choices.

| Section | What it shows |
|---|---|
| **Top slider** | Big pictures with your headline and buttons. Picks your most popular series by itself, or shows slides you make. |
| **Numbers** | Series, episodes, categories and creators counted from your catalogue, or numbers you type. |
| **Series showcase** | A row or grid of series: new, popular, Top 10, complete, one category, one creator, or ones you pick. |
| **What is it?** | A few lines about your app, with feature points and phone pictures. |
| **Categories** | Your categories with their artwork, each leading to its category page. |
| **Get the app** | Store buttons, a direct APK link and a QR code. Always on the page. |
| **Creators** | Creators with live series, and an invitation to become one. |
| **Questions** | Questions and short answers. Search engines and AI assistants read these too. |
| **Call to action** | A bold band with a heading and a button. |
| **Text block** | A heading, a few paragraphs and an optional picture. |

In headings, put `*stars*` around a word or two to set them in the accent style. In text, `**bold**`, `*italic*` and `[links](https://…)` work.

### Header & footer

The header style (Floating, Classic, Centred, Minimal), the footer style (Columns, Big name, Compact, Download first) and your **Social links**, shown as icons in the footer of every page.

### Look & languages

The theme (**Midnight (dark)**, **Paper (light)** or **Follow the visitor's device**), whether visitors may switch between light and dark, heading style, corners and motion, and which languages the website comes in. See [Languages and app links](./languages-and-app-links.md).

### Translations

Pick a language, then type each text in it. A box left empty shows the default language's text. Keep words in braces or after a colon, such as `{app_name}` or `:count`, exactly as they are: they are filled in for you.

### Search & statistics

- **Search engines and sharing**: site title, description, share picture, whether search engines may index the site, whether AI crawlers may read it, `llms.txt`, and Google and Bing verification codes.
- **Page by page**: an optional search title, description and share picture for each kind of page (home, all series, all categories, each series, each category, each creator), in each language.
- **Analytics**: Plausible, Umami or Google Analytics. Google Analytics loads only after the visitor agrees.

### Connection & history

The **Website address**, the refresh secret and the publish history. See [Connect to the Admin Panel](./connect.md).

## What comes from elsewhere

| On the website | Set in |
|---|---|
| App name, logos, theme colour | <AdminPath path="System › Settings › Branding" /> |
| Google Play and App Store buttons | <AdminPath path="System › Settings › App & support" /> › **App versions** › **Store link** |
| Series, categories, creators | <AdminPath path="Content › Titles" />, <AdminPath path="Content › Categories" />, <AdminPath path="Community › Creators" /> |
| Legal pages in the footer | <AdminPath path="System › Settings › Legal pages" /> |

:::tip Sample series
While a series section has fewer than 4 live series, sample series fill it so the page never looks empty. Turn this off when your catalogue is ready.
:::
