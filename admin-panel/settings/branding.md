---
sidebar_position: 1
title: Branding and sign-in screen
description: Your app name, logos, favicon and theme colour, and the photos and words on the sign-in pages.
---

# Branding and sign-in screen

## Branding

<Path>Settings › Branding</Path> sets your identity once for the app, the Studio, the Creator Portal, the public pages and the website.

<Screen
  id="admin-settings-branding"
  type="browser"
  wire="form"
  url="/admin/settings?s=branding"
  title="Branding"
  caption="Settings › Branding: identity, logos and the live preview."
  markers={[
    {x: 39.3, y: 26, title: 'App name', text: 'Replaces “eDrama” everywhere, including the app at its next start.'},
    {x: 57.4, y: 26, title: 'Tagline', text: 'Shown on the splash and public pages.'},
    {x: 40.2, y: 34.6, title: 'Wordmark font', text: 'Instrument Serif Italic or Geist Bold, when no logo is uploaded.'},
    {x: 55.4, y: 47, title: 'Logos', text: 'Horizontal for dark and light backgrounds, vertical, favicon and square logo. PNG or WebP up to 1 MB.'},
    {x: 57.5, y: 73.3, title: 'Favicon', text: 'The browser-tab icon, at least 64 × 64.'},
    {x: 85.4, y: 22.6, title: 'Preview', text: 'Your theme colour on the app and on the Studio and Creator Portal. The colour choices are further down.'},
    {x: 92.1, y: 95.5, title: 'Save', text: 'The Studio changes at once; the app at its next start.'},
  ]}
/>

| Setting | Details |
|---|---|
| **App name** | Replaces "eDrama" everywhere: the app (at its next start), the Studio, emails, share pages. Default *eDrama*. |
| **Tagline** | Default *Stories that hook you. Prices that don't.* |
| **Horizontal logo for dark backgrounds** | With a light name. Replaces the mark and name in the sidebar and on share and error pages. |
| **Horizontal logo for light backgrounds** | With a dark name. Top bar and public pages in the light theme. |
| **Vertical logo** | The mark above the name, with a light name, for the dark sign-in screens. |
| **Favicon** | The browser-tab icon. Square, at least 64 × 64. |
| **Square logo** | The mark alone, for small spots such as the push preview. |
| **Wordmark font** | Instrument Serif Italic or Geist Bold, when no logo is uploaded. |
| **Theme colour** | Greenlight (default), Ember, Iris, Rosé, Aqua, Gold, Sky, or **Custom colour** (any hex code). Text on it switches between ink and white automatically so it stays readable. Charts keep their own palette. |
| **Studio opens in** | Paper (light), Ink (dark) or Follow the device. Each member can still switch with the moon in the top bar. |

Logos are **PNG or WebP, up to 1 MB, on a transparent background**. The mobile app's own logo ships inside the app ([Logo & icons](/mobile-app/logo-and-icons/)).

The previews show the theme colour on the app (a "Continue E7" card and an "Unlock E8 · 60 coins" button) and on the Studio. Choose **Save**: the Studio and Creator Portal change at once; the app picks it up at its next start.

## Sign-in screen {#sign-in-screen}

<Path>Settings › Sign-in screen</Path> designs the stage beside the sign-in pages of the Studio and the Creator Portal.

| Setting | Details |
|---|---|
| **Photos** | **Built-in photos** or **Your own photos**: up to 3 landscape photos, JPEG, PNG or WebP, up to 4 MB each (1600 × 1000 or larger looks best). Drag to set their order; fewer than 3 repeat. |
| **Motion** | **Cinematic** (photos cross-fade and drift, posters scroll, the tagline rises word by word), **Subtle** (only the photos cross-fade, slowly) or **Still**. Anyone whose device asks for less motion always gets a still stage. |
| **Show the live titles' posters** | A strip of the newest live titles beside the photos. Off: the photos fill the stage. |
| **Words** | The **Tagline** and **Line under it**, separately for **Studio sign-in** and **Creator Portal sign-in**. Leave one blank to keep the standard wording shown in grey. |

:::tip
The built-in photos are stock images. Replace them with your own key art before launch.
:::
