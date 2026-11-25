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

The status above the tabs reads *Live · version N*, *Unpublished changes* or *Everything is published*. Every publish is kept on the **History** tab. **Load into draft** brings an earlier version back so you can check it and publish it again.

## The tabs

| Tab | What you set |
|---|---|
| **Sections** | The home page, top to bottom. |
| **Header & footer** | The header and footer styles, menu links and buttons. |
| **Style** | Theme, light/dark switch, headings, corners and motion. |
| **Get the app** | Store buttons, a direct APK link and a QR code. |
| **Search & stats** | Search engines, sharing, AI assistants and per-page titles. |
| **Social & analytics** | Social links and visitor statistics. |
| **Languages** | The website's languages and every text's translation. |
| **Connection** | Where the website lives and how it talks to your server. |
| **History** | Every published version. |

### Sections

The home page is a list of sections you add, reorder, hide and style. Each section type has several **Style** choices.

| Section | What it shows | Styles |
|---|---|---|
| **Top slider** | Big pictures with your headline and buttons. Picks your most popular series by itself, or shows slides you make. | Cinematic full width, Poster stack, Split |
| **Numbers** | Live series, released episodes, categories, creators and app languages counted from your catalogue, or numbers you type. | Band, Split |
| **Series showcase** | A row or grid of series: new, popular this week, Top 10 today, complete, one category, one creator, or ones you pick. | Row of posters, Large posters, Top 10 with big numbers, Grid, One big and a list, Wide cards |
| **What is it?** | A few lines about your app, with feature points and phone pictures. | Text and phone, Editorial, Centred |
| **Categories** | Your categories with their artwork, each leading to its category page. | Artwork tiles, Chips, Mosaic |
| **Get the app** | Store buttons, a direct APK link and a QR code. Always on the page. | Phone showcase, Band, Glowing card |
| **Creators** | Creators with live series, and an invitation to become one. | Avatars, Cards with posters |
| **Questions** | Questions and short answers. Search engines and AI assistants read these too. | Accordion, Two columns |
| **Call to action** | A bold band with a heading and a button. | Band, Split, Glowing card |
| **Text block** | A heading, a few paragraphs and an optional picture. | Text only, Text and picture |

Each section also has a **background** (page colour, raised panel, accent glow or accent colour), **spacing** (compact, regular, airy), an optional **section address** for header links, and a feature condition (**Only while** VIP is on, Rewards are on, and so on) so a section disappears when you switch that feature off.

In headings, put `*stars*` around a word or two to set them in the accent style. In text, `**bold**`, `*italic*` and `[links](https://…)` work.

### Header & footer

- **Header**: the style (Floating bar, Classic full width, Centred logo, Minimal with menu), menu links, the header button and an optional announcement bar.
- **Footer**: the style (Columns, Big name, Compact, Download first), the about line, link columns, legal pages, store buttons, contact email and copyright line.

<Anchor id="look--languages" />

### Style

The theme (**Midnight (dark)**, **Paper (light)** or **Follow the visitor's device**), whether visitors may switch between light and dark, the heading style (editorial serif italic or modern), corners and motion (Full, Subtle, None).

### Get the app

The store buttons (from your App versions store links), an optional direct APK download link with its version and minimum Android, and a QR code for visitors on computers.

<Anchor id="search--statistics" />

### Search & stats

- **Search engines and sharing**: site title and title pattern, description, share picture (1200 × 630), whether search engines may index the site, whether AI crawlers may read it, pages for every series, category and creator, `llms.txt`, and Google Search Console and Bing verification codes.
- **Page by page**: an optional search title, description and share picture for each kind of page (home, all series, all categories, each series, each category, each creator), in each language.

### Social & analytics

- **Social links** (Instagram, YouTube, X, Facebook, TikTok, Threads, LinkedIn, Telegram, WhatsApp, Discord), shown as icons in the footer of every page.
- **Analytics**: Plausible, Umami or Google Analytics. Google Analytics loads only after the visitor agrees.

<Anchor id="translations" />

### Languages

Which app languages the website comes in, and a language menu in the header. Then pick a language and type each text in it. A box left empty shows the default language's text. Keep words in braces or after a colon, such as `{app_name}` or `:count`, exactly as they are: they are filled in for you. See [Languages and app links](./languages-and-app-links.md).

<Anchor id="connection--history" />

### Connection

The website is a separate site, so this tab connects the two:

<Steps>

1. Copy **This server's address for the website** into the website's `EDRAMA_API_URL`.
2. Choose **Make a secret** and paste the **Refresh secret** into the website's `REVALIDATE_SECRET`. It's shown only once; **Make a new secret** replaces it.
3. Enter the **Website address** (such as `https://www.your-domain.com`) and choose **Save address**. It's used for previews and to tell the website about changes.

</Steps>

The full steps, with every setting of the website itself, are in [Connect to the Admin Panel](./connect.md).

### History

Every published version, with who published it and what changed. **Load into draft** brings one back so you can check it and publish it again.

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
