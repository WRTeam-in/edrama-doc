---
sidebar_position: 1
title: Creator Portal
description: What the Creator Portal is, who can use it, and how to turn it on.
---

# Creator Portal

The **Creator Portal** at `https://admin.your-domain.com/creator` lets approved creators (independent filmmakers, studios, storytellers) publish their own series on your platform. Creators upload episodes from their browser, propose prices within your limits, follow every review, set release times, see how their series do, reply to viewers, see their earnings and, when you allow it, use AI Studio. A creator sees **only their own work**, and **every episode is reviewed by your team before it goes live.**

<Screen
  id="creator-home"
  type="browser"
  wire="dashboard"
  url="/creator"
  title="Creator Portal"
  caption="The Creator Portal for the demo creator Amara Okafor: the menu on the left, the top bar, and Home."
  markers={[
    {x: 7.7, y: 3.4, title: 'Platform logo', text: 'The portal wears the platform’s logo, with the Creators tag.'},
    {x: 7.5, y: 8.7, title: 'New series', text: 'Start a new series from any page.'},
    {x: 8.4, y: 32.4, title: 'Menu', text: 'Home and Earnings, then My series, Upload episodes, AI Studio, Release schedule, Comments & reviews (with how many wait for your reply) and Notices.'},
    {x: 89.6, y: 3, title: 'Portal language', text: 'Only you see the portal in the language you pick.'},
    {x: 93.9, y: 3, title: 'Notices bell', text: 'Review decisions and other news, with the unread count.'},
    {x: 96.9, y: 3, title: 'Theme', text: 'Light or dark, just for you.'},
    {x: 7.7, y: 95.8, title: 'You', text: 'Your account: profile, sign-in, preferences and agreement. Sign out sits beside it.'},
    {x: 49.9, y: 20.5, title: 'Greeting', text: '“Good afternoon” and your name, with shortcuts to New series, My series and Notices.'},
  ]}
/>

<DocBanner />

## What creators can do

<Cards
  items={[
    {icon: 'film', title: 'Create a series', text: 'Details, artwork, free episodes and price, regions.', to: '/creator-portal/guide/create-series/', tone: 'vip'},
    {icon: 'server', title: 'Upload episodes', text: 'Straight from the browser, with subtitles.', to: '/creator-portal/guide/upload-episodes/', tone: 'vip'},
    {icon: 'check', title: 'Send for review', text: 'Every series and episode is checked by the team.', to: '/creator-portal/guide/submit-for-review/', tone: 'vip'},
    {icon: 'bell', title: 'Set release times', text: 'Pick when each approved episode drops.', to: '/creator-portal/guide/release-times/', tone: 'vip'},
    {icon: 'users', title: 'Talk to viewers', text: 'Reply to reviews and comments.', to: '/creator-portal/guide/comments-and-reviews/', tone: 'vip'},
    {icon: 'coin', title: 'See earnings', text: 'Monthly statements and payouts.', to: '/creator-portal/guide/earnings/', tone: 'coin'},
  ]}
/>

## How it works

1. Someone [applies or is invited](./becoming-a-creator.md) to become a creator.
2. Your team approves them in <AdminPath path="Community › Creators" />.
3. They sign in to the Creator Portal with the **same account they use in the app**: Google, email and password, or phone.
4. They accept your **Creator terms**, create a series, upload episodes and send it for review.
5. Your team approves, asks for changes or rejects it in <AdminPath path="Community › Review queue" />.
6. Approved episodes go live at their release time, and the creator earns their share of paid unlocks ([How earnings work](/features/how-earnings-work/)).

## Turn it on

<Steps>
<Step title="Add the Firebase web keys">

The portal's sign-in runs on your Firebase project in the browser, so it needs the **Web API key** and **Auth domain** in <AdminPath path="System › Settings › Notifications" /> › **Firebase** ([guide](/admin-panel/settings/firebase-and-notifications/)).

</Step>
<Step title="Allow your domain in Firebase">

Firebase console › **Authentication** › **Settings** › **Authorized domains** › **Add domain**: add your Admin Panel's domain, such as `admin.your-domain.com`.

</Step>
<Step title="Turn on the sign-in methods">

Firebase console › **Authentication** › **Sign-in method**: turn on **Google**, **Email/Password** and **Phone** (as you use them in the app). Phone sign-in on the portal also follows the **Phone sign-in** switch in <AdminPath path="System › Settings › App & support" />.

</Step>
<Step title="Publish the Creator terms">

Write and publish **Creator terms** in <AdminPath path="System › Settings › Legal pages" />. Creators can't create a series until they're published.

</Step>
<Step title="Set the creator limits">

The price range and free episodes in [Payments](/admin-panel/settings/payments/#creator-price-limits), and the upload limits in [Video pipeline](/admin-panel/settings/video-pipeline/#creator-uploads).

</Step>
</Steps>

## Check it worked

Open `/creator`. The sign-in page shows the sign-in methods. If it says **Creator sign-in isn't set up yet**, the Firebase web keys are missing. If Firebase says the site isn't allowed, add the domain to **Authorized domains**.

## The menu

**New series** sits above the menu on every page. The menu has two groups, *Overview* and *Your work*:

| Item | What it's for |
|---|---|
| **Home** | Your series at a glance and what needs you ([Home](/creator-portal/guide/home/)). |
| **Earnings** | Statements and payouts ([Earnings](/creator-portal/guide/earnings/)). |
| **My series** | Every series you've made, by status ([My series](/creator-portal/guide/series/)). |
| **Upload episodes** | Pick a series and upload ([Upload episodes](/creator-portal/guide/upload-episodes/)). |
| **AI Studio** | Characters, storyboards and video takes, when the platform allows it ([AI Studio](/creator-portal/guide/ai-studio/)). |
| **Release schedule** | Every episode not out yet, across your series ([Release times](/creator-portal/guide/release-times/)). |
| **Comments & reviews** | What viewers say about all your series ([Comments & reviews](/creator-portal/guide/comments-and-reviews/)). |
| **Notices** | Review decisions and news from the team ([Notices & account](/creator-portal/guide/notices-and-account/)). |

## Good to know for creators

- The portal is in your **own language** if the platform offers it: pick it from the language menu. Your app keeps its own language.
- Times are shown in **your time zone**, which you set in **Your account › Preferences**.
- A session lasts 12 hours. If your account is suspended, you're signed out at your next click.

:::tip Share the creator's guide
[The creator's guide](/creator-portal/guide/home/) walks through every screen of the portal, written for creators: share its link with yours.
:::
