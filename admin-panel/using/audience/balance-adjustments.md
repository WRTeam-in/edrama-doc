---
sidebar_position: 2
title: "Balance adjustments"
sidebar_label: "Balance adjustments"
description: "Add or remove a viewer's coins with a reason, and approve or decline large adjustments as a second member."
---

A **balance adjustment** adds coins to, or removes coins from, a viewer's wallet: a goodwill credit after an outage, or a correction. Every adjustment is a new ledger row with a reason the viewer sees in their coin history. Large ones need a **second member** to approve.

<Access area="Balance adjustments" view="See requests" edit="Make, approve and decline adjustments" />

## Make an adjustment

<Steps>

1. Open the viewer on <Path>Audience › Users</Path> and choose **Adjust balance**.
2. Choose **Paid** or **Bonus** coins, **Add** or **Remove**, and the **Amount** (whole coins).
3. For bonus coins, an optional **Bonus expiry**. Empty uses the region's bonus expiry (7 days by default).
4. Write the **Reason the viewer sees**, such as *Goodwill credit for the playback outage on 24 October.* It becomes the label in their coin history.
5. Optionally add an **Internal note** that never leaves the panel.
6. Choose **Adjust balance**.

</Steps>

- Removing coins can never take the balance below zero.
- Up to the **approval limit** (1,000 coins by default, in <Path>Settings › Payments › Balance adjustments</Path>), the change is applied at once.
- Above it, the request waits as **Pending** until another member approves it.

## Approve or decline

<Screen
  id="admin-balance-adjustments"
  type="browser"
  wire="list"
  url="/admin/balance-adjustments"
  title="Balance adjustments"
  caption="Balance adjustments filtered to Pending: a request over the approval limit waiting for a second member."
  markers={[
    {x: 42.7, y: 22.9, title: 'Requests by status', text: 'All, Pending (waiting for a second member), Applied and Declined.'},
    {x: 23.9, y: 48.7, title: 'User', text: 'Who the coins are for.'},
    {x: 36.6, y: 48.7, title: 'Change', text: 'The coins added or removed, and when bonus coins expire.'},
    {x: 55.9, y: 49.9, title: 'Reason the user sees', text: 'Shown in their coin history.'},
    {x: 71.6, y: 48.4, title: 'Requested by', text: 'Who asked for it, and when.'},
    {x: 83.6, y: 50, title: 'Status', text: 'A second member with Balance adjustments (Edit) approves or declines it.'},
  ]}
/>

Members with **Balance adjustments** (Edit) get a bell notification when a request waits for them.

:::warning[Four eyes]
Nobody can approve their **own** request, the Owner included. A member also can't approve a request from the person who added them to the team. This keeps one person from moving large amounts of coins alone.
:::

Every request, approval and decline is in the audit log.
