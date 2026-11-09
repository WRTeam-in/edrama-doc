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
gross money       = paid coins × the region's coin value
net money         = gross money × (1 − store fee ÷ 100)
owner's money     = net money × the owner's share ÷ 100
your money        = net money − owner's money
```

- **Coin value**: what one coin is worth in the region's currency (0.0099 USD in Global and 0.29 INR in India to start), set in Monetization › Regions.
- **Store fee**: Google Play and App Store keep part of every purchase (15% each to start, in Settings › Payments). The report uses the fees saved on that month's purchases in the region, weighted by amount.
- **Saved at the time**: each unlock saves the share in force when it happened, and each purchase saves its store fee. Changing a setting never rewrites past money.

### Example

A creator series priced at 60 coins in the Global region. In a month, viewers unlock 1,000 episodes with paid coins:

| | |
|---|---|
| Paid coins | 1,000 × 60 = **60,000** |
| Gross money | 60,000 × 0.0099 = **594.00 USD** |
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

On the 1st of every month at 02:00 UTC, eDrama builds the **creator report** for the month before and sends its link to the team members who can edit **Transactions** (the Owner and Admin with the ready-made roles; give your finance role Transactions › Edit if it should get it). It's a ZIP with two CSV files:

1. **The report**: one row per series and region, with the unlocks, paid and bonus coins, Series Pass coins, ad unlocks, VIP minutes, the coin value and store fee used, the net money and the creator's money, also in your reporting currency.
2. **The settings sheet**: the coin values, store fees, exchange rates and shares used, and how each column is worked out.

**Payouts are made by you**, outside eDrama: your finance team pays each creator from the report. The Creator Portal shows creators their views and unlocks, but no money figures.

To build a month's report again: `php artisan edrama:creator-report --month=2026-10`.
