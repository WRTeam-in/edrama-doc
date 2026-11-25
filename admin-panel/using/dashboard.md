---
sidebar_position: 2
title: "Dashboard"
sidebar_label: "Dashboard"
description: "The Admin Panel's Dashboard: revenue, viewers, how viewers unlock, top titles and what needs a person."
---

The Dashboard answers one question: **how is the platform doing?** It opens when you sign in. Every member sees it, but each card shows only if your role can see that area: revenue cards need **Transactions** (View), viewer figures need **Users** (View).

<Screen
  id="admin-dashboard"
  type="browser"
  wire="dashboard"
  url="/admin"
  title="Dashboard"
  caption="The Dashboard over the last 30 days for All regions."
  markers={[
    {x: 37.8, y: 15.2, title: 'Greeting', text: 'With today’s date, time and the region you’re looking at.'},
    {x: 24.2, y: 22.5, title: 'Shortcuts', text: 'Upload episodes, Review queue, Release schedule and Send a push.'},
    {x: 38.7, y: 26.3, title: 'Recount now', text: 'When the figures were last counted (every 15 minutes); recount today straight away.'},
    {x: 88.8, y: 12.8, title: 'Range', text: 'Last 7, 30 or 90 days. Every number on the page uses the same range and region.'},
    {x: 25.9, y: 34.9, title: 'Revenue', text: 'Revenue for the range, with the change against the period before.'},
    {x: 42.1, y: 34.9, title: 'Viewer and unlock cards', text: 'New viewers (signed in and guests), daily active viewers, paying viewers and unlocks, each with its trend.'},
    {x: 36.8, y: 55.4, title: 'Revenue by source', text: 'Daily revenue from coin packs and VIP, before or after the store fee. Table shows the numbers.'},
    {x: 85.1, y: 54.8, title: 'Revenue sources', text: 'Coin packs against VIP, after store fees and today so far.'},
    {x: 84.1, y: 86.9, title: 'Needs attention', text: 'Things only a person can decide: review items, failed uploads, held episodes, refunds and adjustments waiting.'},
  ]}
/>

## Reading the numbers

| Card | What it shows |
|---|---|
| **Revenue** | Money from coin packs and VIP in the range, in your **reporting currency**, with the change against the previous period of the same length, today's revenue so far, and the amount after store fees. Coin-pack revenue always equals the net on [Transactions](/admin-panel/using/money/transactions/) for the same days and region. |
| **New viewers** | New accounts in the range, split into signed in and guests. |
| **Daily active viewers** | The average number of viewers active each day. |
| **Paying viewers** | Viewers who paid in the range. |
| **Revenue by source** | A daily stacked chart of coin packs and VIP. Switch between **Before store fee** and **After store fee**. The **Table** button shows the same data as a table. |
| **How viewers unlock** | A donut of unlock methods. Useful for seeing whether ads, coins or VIP drive your catalogue. |
| **Top titles** | The top 10 titles, ranked by **Revenue** or **Views**, with their status. |
| **Needs attention** | Live counts: review items waiting (and how long the oldest has waited), failed uploads, episodes held past their publish time, refunds and balance adjustments waiting for approval. Each row links to where you act on it. |

## How fresh are the figures?

The Dashboard reads **pre-counted** figures, so it stays fast however big your catalogue gets. A background task recounts today and the two days before **every 15 minutes**, plus any day where a refund or a late purchase changed things. The line under the revenue card says when it was last counted.

Need today's numbers now? Choose **Recount now**. It recounts today straight away (at most once a minute for the whole team).

## Regions and currencies

Use the **Region** switcher in the top bar to see one region, or **All regions** for everything.

All money is shown in your **reporting currency** (USD by default), converted at the exchange rate in force on each day. If a currency has no exchange rate for some days, that revenue is **left out** and the card names the currency, rather than guessing. Add the missing rate in <Path>Settings › Regions & languages</Path>.

:::note
Days are counted in UTC (universal time), so "today" may start a few hours earlier or later than your local midnight.
:::
