---
sidebar_position: 4
title: How earnings work
description: How a paid unlock turns into store fees, the creator's share and the platform's share, and how creators get paid.
---

# How earnings work

Every series has an owner, and the owner decides who shares its money:

| Series | Who shares the net money |
|---|---|
| **Your own** (made or bought outright by you) | Nobody: you keep it all |
| **Licensed** | The licensor gets their **Licensor share**, from the contract, set on the series |
| **A creator's series** | The creator gets their own share, set on their page in **Creators**, or else the **Default creator share** (50% to start) |

## From a coin to money

Only **paid coins** earn money. Bonus coins (the welcome bonus, coin-pack bonuses, the spin, streak titles, Rewards ads) are given away, so they earn nobody anything.

For each series, each region and each month:

```text
paid coins        = paid coins spent on its episodes + paid coins spent on its Series Passes
                    − paid coins taken back by refunds
gross money       = paid coins × the paid coin value
net money         = gross money × (1 − store fee ÷ 100)
owner's money     = net money × the owner's share ÷ 100
your money        = net money − owner's money
```

- **Coin value**: what one coin is worth in the region's currency (0.0099 USD in Global and 0.29 INR in India to start), set in Monetization › Regions.
- **Paid coin value**: what one paid coin really brought in that month in the region: the store money of completed purchases divided by every paid coin added, team adjustments included. It is **never above the coin value**, so discounted packs, test purchases or coins the team added never pay out more than you received. When every purchase paid full price, it equals the coin value.
- **Store fee**: Google Play and App Store keep part of every purchase (15% each to start, in Settings › Payments). The report uses the fees saved on that month's purchases in the region, weighted by amount.
- **Saved at the time**: each unlock saves the share in force when it happened, and each purchase saves its store fee. Changing a setting never rewrites past money.
- **Refunds**: when a store refund or chargeback arrives after the coins were spent, the share those coins earned is taken back in the month of the refund, from the viewer's newest paid unlocks since the purchase.

### Example

A creator series priced at 60 coins in the Global region. In a month, viewers unlock 1,000 episodes with paid coins:

| | |
|---|---|
| Paid coins | 1,000 × 60 = **60,000** |
| Gross money (full-price packs) | 60,000 × 0.0099 = **594.00 USD** |
| Store fees (15%) | **89.10 USD** |
| Net money | **504.90 USD** |
| Creator (50%) | **252.45 USD** |
| You | **252.45 USD** |

Try your own numbers in the [earnings calculator](./earnings-calculator.md).

## Series Pass

A Series Pass's paid coins count for the series too. The report splits them into a **released part** (the episodes out when the pass was bought) and a **future part**, and both are shared at the saved share.

## Ads and VIP

Ad and VIP money doesn't come per unlock, so it's shared from a **monthly pool per region**:

- **Ads**: your finance team fills the report's `ad_pool_value` column with the month's ad money from the AdMob report. It is split by **verified ad unlocks**. Failed ads don't count, and neither do the creator's own views or accounts less than 24 hours old.
- **VIP**: your finance team fills `vip_pool_value` with the month's VIP money from the store reports. It is split by **VIP minutes on locked episodes**, each viewer counted once per episode per month. The creator's own viewing never counts.

## The monthly creator report

On the 1st of every month at 02:00 UTC, eDrama builds the **creator report** for the month before and sends its download link to the bell of the team members who can edit **Transactions** (the Owner and Admin with the ready-made roles; give your finance role Transactions › Edit if it should get it). You can also download it for any month from <AdminPath path="Money › Transactions" /> › **Monthly creator report**. It's a ZIP with three CSV files:

1. **The report**: one row per series and region, with the unlocks, paid and bonus coins, Series Pass coins, refunds taken back, ad unlocks, VIP minutes, the coin value, paid coin value and store fee used, the net money and the creator's money, also in your reporting currency.
2. **The settings sheet**: the coin values, store fees, exchange rates and shares used, and how each column is worked out.
3. **The payouts sheet**: the month's creator statements and payouts.

To build a month's report again: `php artisan edrama:creator-report --month=2026-10`.

## Statements and payouts

**Payouts are made by you**, outside eDrama (bank transfer, UPI, PayPal, Wise or other), and recorded in the Admin Panel so nobody is paid twice:

1. **Close the month.** The same run on the 1st writes each creator's **statement** for the month before: their share of the net money from paid coins, less refunds, in your reporting currency. You can also do it with **Close month for creators** on Transactions. A month closes only once it's over and needs an exchange rate for every currency used (Settings › Regions & languages). A statement, once written, never changes its coin figures.
2. **Add the ads and VIP share.** On the creator's page in <AdminPath path="Community › Creators" />, add their part of the month's ad and VIP pools to the statement, with a note on how you worked it out.
3. **Pay, then record it.** Pay the creator, then use **Record payout** on their page with the amount, method, payment reference and date. A payout can't be more than what they're owed. A wrong one is **voided** with a reason, never deleted.

Recording payouts needs Transactions › Edit. Every step is in the audit log.

Creators see their own money on **Earnings** in the Creator Portal: earned, paid to them, waiting to be paid, an estimate for this month so far, their monthly statements by series and their payouts. Your internal notes are never shown to them.

Licensors aren't in the Creator Portal: pay them from the report's rows for their series.
