---
sidebar_position: 4
title: "Push notifications"
sidebar_label: "Push"
description: "Send or schedule a push notification to every viewer or to a title's followers, test it on your own phone, and follow the results."
---

**Push** sends a notification to viewers' phones: to **all viewers**, or to the **followers of one title**. Every push also lands in the app's notification inbox. Automatic pushes (new episode drops, replies, VIP renewal reminders) are sent by eDrama itself; this screen is for the messages your team writes.

<Access area="Push" view="See sent and scheduled pushes" edit="Compose, send, schedule, test and cancel" />

<Screen
  id="admin-push"
  type="browser"
  wire="modal"
  url="/admin/push"
  title="Push"
  caption="The New push composer open over the Push list, with the lock-screen preview."
  markers={[
    {x: 30.5, y: 15.9, title: 'Audience', text: 'All viewers, or a title’s followers (then pick the title).'},
    {x: 45.3, y: 54.2, title: 'Kind', text: 'News & drops, or Offer. Viewers choose which kinds they receive.'},
    {x: 42.1, y: 38, title: 'Title', text: 'Up to 65 characters.'},
    {x: 42.1, y: 49.2, title: 'Body', text: 'Up to 178 characters.'},
    {x: 29.8, y: 57.9, title: 'Other languages', text: 'Optional translations; empty uses your default text.'},
    {x: 42.1, y: 88.6, title: 'Opens', text: 'A title, an episode, the Wallet or VIP.'},
    {x: 65.3, y: 20, title: 'Lock-screen preview', text: 'How the push looks on a phone.'},
    {x: 30.4, y: 94.2, title: 'Send push', text: 'Goes out within minutes, or schedule it for a time.'},
    {x: 37.7, y: 94.2, title: 'Test send', text: 'To the devices of the app account signed in with your email.'},
  ]}
/>

## Write a push

<Steps>

1. Choose **New push**.
2. **Audience**: **All viewers** or **A title's followers** (then pick a live title; the reach updates).
3. **Kind**:
   - **News & drops**: pushed to viewers with *Drop alerts* on.
   - **Offer**: pushed only to viewers with *Offers* on.
   Everyone in the audience also finds it in their inbox.
4. **Title** (up to 65 characters), such as *E24 drops tonight at 8*, and **Body** (up to 178), such as *Ava faces the board. You asked to be reminded.* Optional translations per app language; empty uses your default text.
5. **Opens**: a title, an episode of it, the Wallet or VIP.
6. **Send**: **Now**, or **At a time** (in the default region's time zone).
7. Check the **lock-screen preview**, then choose **Test send** (optional) and **Send push** or **Schedule push**.

</Steps>

## Test on your phone

**Test send** goes to the devices of the **app account signed in with your email**. Sign in to the app on your phone with the same email as your Studio account and allow notifications first. If your devices refuse the test, open the app once so it registers again.

## The rules every push follows

- At most **3 pushes per viewer per day** (default), counting automatic ones. Pushes above the cap wait for the next day; the inbox still gets every message.
- **Quiet hours** 23:00–08:00 in each viewer's own time (default). Pushes wait until quiet hours end.
- Money notices are never marketing.

Change these in <Path>Settings › Notifications</Path>. Pushes need the Firebase keys there too; without them the panel says pushes aren't set up.

## Results

The list shows every push, newest first, with status cards for **Scheduled**, **Sent**, **Canceled** and **Failed**. **Reach** reads "*sent* of *targeted*", then how many are **waiting** (quiet hours or the cap) and how many **failed**. Results refresh every minute for two days.

A scheduled push can be **cancelled** until it starts going out.
