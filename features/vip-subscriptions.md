---
sidebar_position: 3.2
title: "VIP subscriptions"
sidebar_label: "VIP subscriptions"
description: "How VIP works end to end: plans, the no-free-trial rule, verification, renewal reminders, statuses and refunds."
---

**VIP** is an auto-renewing store subscription (Weekly, Monthly or Yearly) that unlocks every episode with no ads. Plans are set per region in [VIP plans](/admin-panel/monetization/#vip-plans).

## What VIP includes

- Every episode of every series with **Included in VIP** on (the default).
- **No ads**, anywhere.
- **1080p** playback.
- The daily spin's prize multiplied (×2 by default).
- The perks text your team writes per plan.

## The rules

| Rule | Why |
|---|---|
| **No free trial** that turns into a charge | The price must be above zero, and no store ID or perk may name a trial. The server refuses a subscription the store started with a free trial, and leaves a Google Play one unacknowledged so Google refunds it. |
| **Renewal reminder 24 hours before every charge** | A notification and an inbox message, always sent. |
| **Cancel in two taps** | The app opens the store's subscription page. |
| **VIP never sees an ad** | Not between episodes, not on the paywall, nowhere. |

## How a subscription is checked

<Steps>

1. The viewer subscribes in the store from the app's VIP page.
2. The app sends the receipt to your server, which **verifies it with Google or Apple** before turning VIP on.
3. Afterwards, the stores' **notifications** keep it up to date: renewals, cancellations, grace periods, refunds. They arrive at the URLs on the store cards in <Path>Settings › Payments</Path>.

</Steps>

## Statuses

| Status | Meaning |
|---|---|
| **Active** | Paid and current. |
| **Grace period** | A renewal payment failed; the store is retrying. |
| **On hold** | Payment failed; access paused until fixed. |
| **Canceled** | Won't renew; VIP lasts until the end of the paid period. |
| **Expired** | Ended. |
| **Revoked** | Refunded or taken back by the store. |

Each viewer's subscriptions are on their user page's **VIP** tab.

## Money and reporting

Every charge is recorded with the store's amount (or the plan's price), the store fee in force, and whether it was refunded. VIP revenue appears on the Dashboard, and the minutes VIP members watch creators' locked episodes decide each creator's part of the **VIP pool** ([Creator earnings](/features/how-earnings-work/)).
