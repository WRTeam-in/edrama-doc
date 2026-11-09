---
sidebar_position: 14
title: Go-live checklist
description: Everything to do before you launch eDrama, in order, with a link to each guide.
---

# Go-live checklist

Tick each item as you go. Your progress is remembered in this browser.

<Checklist
  id="go-live"
  items={[
    { id: 'server', label: 'Server meets the requirements (PHP 8.5, MySQL 8, HTTPS)', to: '/admin-panel/requirements/' },
    { id: 'install', label: 'Backend uploaded, domain points at public/, installer finished', to: '/admin-panel/installation/' },
    { id: 'cron', label: 'Cron job runs every minute, and System shows the scheduler running', to: '/admin-panel/background-jobs/' },
    { id: 'smtp', label: 'SMTP set up and a test email received', to: '/admin-panel/settings/email/' },
    { id: 'branding', label: 'App name, logos, favicon and theme colour set', to: '/admin-panel/settings/branding/' },
    { id: 'storage', label: 'Storage & video ready (ffmpeg, S3 or Cloudflare Stream) and a test episode plays', to: '/admin-panel/settings/storage-and-video/' },
    { id: 'firebase', label: 'Firebase keys added, Test connection passes', to: '/admin-panel/settings/firebase-and-notifications/' },
    { id: 'payments', label: 'Google Play and App Store keys added, store webhooks set', to: '/admin-panel/settings/payments/' },
    { id: 'monetization', label: 'Regions, coin packs and VIP plans priced; product IDs match the stores', to: '/admin-panel/monetization/' },
    { id: 'ads', label: 'AdMob unit IDs added and server-side verification turned on', to: '/admin-panel/monetization/#ads' },
    { id: 'legal', label: 'All seven legal pages written and published', to: '/admin-panel/settings/legal-and-security/' },
    { id: 'versions', label: 'App versions and store links filled in', to: '/admin-panel/settings/app-and-support/' },
    { id: 'share', label: 'Share link files show your app (.well-known)', to: '/admin-panel/share-links/' },
    { id: 'team', label: 'Team invited with the right roles; two-factor required', to: '/admin-panel/team-and-roles/' },
    { id: 'website', label: 'Website deployed, Website address and refresh secret set', to: '/website/connect/' },
    { id: 'app', label: 'App re-branded, pointed at your server and built for release', to: '/mobile-app/' },
    { id: 'demo', label: 'Demo data cleared', to: '/admin-panel/first-steps/#demo-data' },
    { id: 'content', label: 'Your first series uploaded, priced and published', to: '/features/admin-panel-menus/' },
  ]}
/>
