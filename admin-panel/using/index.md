---
sidebar_position: 0
title: "The Admin Panel"
description: "A tour of the eDrama Admin Panel (the Studio): its menu, top bar, search, region switcher and shared controls."
sidebar_label: "Admin Panel tour"
---

The **Admin Panel**, also called the **Studio**, is where your team runs eDrama: the catalogue, the release schedule, creators, viewers, money and settings. Open it at `https://your-domain.com/admin`.

<Screen
  id="admin-overview"
  type="browser"
  wire="dashboard"
  url="/admin"
  title="Admin Panel"
  caption="The Admin Panel’s Dashboard, with the sidebar menu on the left and the top bar above."
  markers={[
    {x: 2.3, y: 3.4, title: 'Your logo', text: 'From Settings › Branding, with the STUDIO label. Click it to return to the Dashboard.'},
    {x: 14.2, y: 3.4, title: 'Hide sidebar', text: 'More room for wide tables. Shortcut: Ctrl + B (⌘ + B on a Mac).'},
    {x: 8.4, y: 18.8, title: 'Menu', text: 'Grouped into Overview, Content, Community, Audience, Money and System. You only see the screens your role allows; numbers show what’s waiting.'},
    {x: 68.6, y: 3, title: 'Search or jump to…', text: 'The command palette (Ctrl + K or ⌘ + K): find a title, creator or user by email, phone or ID, or jump to any page.'},
    {x: 83.1, y: 3, title: 'Region', text: 'Choose the region that region-based screens show, or All regions.'},
    {x: 90.4, y: 3, title: 'Studio language', text: 'The language you see the Studio in. Only you see your choice.'},
    {x: 94.3, y: 3, title: 'Notifications', text: 'The bell: export links, approvals waiting for you, failed jobs and new support tickets.'},
    {x: 96.9, y: 3, title: 'Theme', text: 'Switch between the paper (light) and ink (dark) theme. Your choice stays in your browser.'},
    {x: 7.7, y: 95.8, title: 'You', text: 'Your name and role. Open Your account (profile, password, two-factor); the arrow signs you out.'},
  ]}
/>

## The menu

| Group | Screens |
|---|---|
| **Overview** | [Dashboard](/admin-panel/using/dashboard/) |
| **Content** | [Titles](/admin-panel/using/content/titles/), [Categories](/admin-panel/using/content/categories/), [Upload & pipeline](/admin-panel/using/content/upload-pipeline/), [AI Studio](/admin-panel/using/content/ai-studio/), [Release schedule](/admin-panel/using/content/release-schedule/), [Home builder](/admin-panel/using/content/home-builder/), [Website](/website/edit-content/) |
| **Community** | [Creators](/admin-panel/using/community/creators/), [AI usage](/admin-panel/using/community/ai-usage/), [Review queue](/creator-portal/review-queue/), [Comments & reviews](/admin-panel/using/community/comments-and-reviews/) |
| **Audience** | [Users](/admin-panel/using/audience/users/), [Balance adjustments](/admin-panel/using/audience/balance-adjustments/), [Support tickets](/admin-panel/using/audience/support-tickets/), [Push](/admin-panel/using/audience/push/) |
| **Money** | [Monetization](/admin-panel/monetization/#regions), [Transactions](/admin-panel/using/money/transactions/), [Creator revenue](/admin-panel/using/money/creator-revenue/) |
| **System** | [Settings](/admin-panel/settings/overview/), [Team & roles](/admin-panel/team-and-roles/), [Audit log](/admin-panel/using/system/audit-log/), [System](/admin-panel/using/system/system-health/), [License & updates](/admin-panel/license-and-updates/), [Clear demo data](/admin-panel/first-steps/#demo-data) |

Small numbers next to a menu item show what's waiting: open review items, comments and reviews held for a decision, and failed uploads.

Hide the sidebar for more room with **Ctrl + B** (**⌘ + B** on a Mac).

## Things every screen shares

**Status cards.** Most lists start with a row of cards (for example *All titles · Live · In review · Changes requested · Drafts*). Click a card to filter the list to that status.

**Search, filters and tabs.** Above each table: a search box, a **Filter** button and, where it helps, tabs.

**Refresh and Download.** Next to the search, **Refresh** reloads the table and **Download** saves exactly what the table shows (with your search and filters) as CSV, Excel, JSON, XML, TXT or SQL. Each download is recorded in the audit log.

**Save bar.** Long forms (Settings, the title editor) end with a bar that sticks to the bottom of the window: *Changes take effect when you save.*

**Reasons.** Anything that touches money, prices, a viewer's account or a creator's work asks for a reason. The reason is stored in the [audit log](/admin-panel/using/system/audit-log/) with who made the change and when.

## Permissions

What you see depends on your role. A screen you have **View** access to shows its data but hides the buttons that change it; with **None**, it isn't in your menu at all. The server checks your permission on every action too. See [Roles and access](/admin-panel/team-and-roles/).

## The Studio's language

The Studio is in English by default and can offer more languages, including right-to-left ones. Pick yours from the language menu in the top bar; the default for the team is set in <Path>Settings › Regions & languages</Path>.
