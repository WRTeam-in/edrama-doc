---
sidebar_position: 2
title: "Creator revenue"
sidebar_label: "Creator revenue"
description: "Each month's ads and VIP money shared with creators: import from AdMob, calculate, review, adjust, approve, then pay."
---

Creators earn from **coins** viewers spend on their series, and also from **ads** and **VIP**, which aren't tied to one series' price. **Creator revenue** works out each creator's share of the ad and VIP money month by month. The app imports and calculates it; your team reviews, adjusts and approves it before it reaches the creators' statements.

<Access area="Transactions" view="See months" edit="Import, calculate, adjust, approve and reopen" />

<Flow
  steps={[
    {label: 'Import', note: 'AdMob earnings'},
    {label: 'Calculate', note: 'Pools and shares'},
    {label: 'Review', note: 'Adjust if needed'},
    {label: 'Approve', tone: 'live', note: 'Onto statements'},
    {label: 'Pay', tone: 'vip', note: 'Record payouts'},
  ]}
/>

<Screen
  id="admin-creator-revenue"
  type="browser"
  wire="list"
  url="/admin/creator-revenue"
  title="Creator revenue"
  caption="Creator revenue for a month not yet prepared: the five steps, the tiles and Pools by region."
  markers={[
    {x: 84.5, y: 15.7, title: 'Import from AdMob', text: 'Reads the month’s unlock-ad earnings by country and ad unit.'},
    {x: 94.4, y: 15.7, title: 'Calculate', text: 'Works out the pools and each creator’s share.'},
    {x: 27.1, y: 24.4, title: 'Month', text: 'Pick the month to review.'},
    {x: 24.7, y: 33.9, title: 'Steps', text: 'Import, Calculate, Review, Approve, Pay.'},
    {x: 57.9, y: 48.8, title: 'AdMob notice', text: 'Until AdMob is connected, ads pools stay at zero unless set by hand.'},
    {x: 24, y: 55.4, title: 'Tiles', text: 'Ads and VIP pools, and what creators get from coins, ads, VIP and in total.'},
    {x: 57.9, y: 70.2, title: 'Pools by region', text: 'Each region’s ad and VIP money and the part shared with creators.'},
  ]}
/>

## How it's calculated

**Ads.** Each region's **ads pool** = its unlock-ad earnings from AdMob × the ads pool percent. A creator earns: pool × *their verified ad unlocks* ÷ *all verified ad unlocks in the region* × *their share percent*. A creator's own views and accounts under a day old don't count.

**VIP.** Each region's **VIP pool** = the month's VIP charges, less refunds and store fees, × the VIP pool percent. A creator earns: pool × *their VIP minutes on locked episodes* ÷ *all VIP minutes in the region* × *their share percent*.

Your own and licensed titles count in each region's total, so their part stays with the platform. Amounts are rounded down, in your reporting currency.

## Run a month

<Steps>

1. **Prepare.** On the **import day** (the 5th by default), the app imports the month before from AdMob and calculates it by itself, and members with **Transactions** (Edit) get a bell. Or choose **Import from AdMob** or **Calculate** yourself.
2. **Review.** Check the tiles, **Pools by region** and each creator.
3. **Fix a pool if needed.** Set a pool by hand only when the import or the charges are wrong. It keeps your amount (marked *Set by hand*) until you reset it.
4. **Adjust a creator if needed.** Add (or, with a minus sign, take) an amount with a reason. Creators see the amount, not your reason. A **void** adjustment stays in the history, crossed out.
5. **Approve.** The creators' statements get their ads, VIP and adjustments, and the month is locked. **Reopen** unlocks it; statements keep the approved amounts until you approve again.
6. **Pay.** Pay each creator outside the app (bank transfer, UPI, PayPal, Wise…) and record it with **Record payout** on their page in [Creators](/admin-panel/using/community/creators/).

</Steps>

If AdMob isn't connected, ads pools stay at zero until you set them by hand or connect AdMob in <Path>Settings › Creator revenue</Path>.

## Settings

In <Path>Settings › Creator revenue</Path> (see [Payments & creator revenue](/admin-panel/settings/payments/#creator-revenue)):

| Setting | Default |
|---|---|
| **Prepare each month by itself** | On |
| **Import day of the month** | 5 (1–28; AdMob finalises a month's earnings in the first days of the next) |
| **Ads pool** | 100% of each region's unlock-ad earnings |
| **VIP pool** | 100% of each region's VIP revenue after refunds and store fees |
| **A second member approves** | Off. On: whoever last changed a month can't approve it. |

## Statements and payouts

On each creator's page, **Earnings & payouts** shows what they earned in **closed months**, what was **paid**, what's **owed**, and **this month so far** (an estimate). A month is closed automatically on the 1st of the next month, or with **Close month for creators**. Coins come from the monthly statement; ads and VIP come from this page once approved.

Creators see the same figures on their [Earnings](/creator-portal/guide/earnings/) page in the Creator Portal. See [Creator earnings](/features/how-earnings-work/) for the full picture.
