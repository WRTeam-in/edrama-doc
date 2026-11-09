---
sidebar_position: 1
title: Creator Portal
description: What the Creator Portal is, who can use it, and how to turn it on.
---

# Creator Portal

The **Creator Portal** at `https://admin.your-domain.com/creator` lets approved creators publish their own series on your platform. Creators upload episodes from their browser, set prices and release times within your limits, follow every review, and see how their series do. **Every episode is reviewed by your team before it goes live.**

<DocBanner />

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
