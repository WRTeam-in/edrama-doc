---
sidebar_position: 1
title: Branding and sign-in screen
description: Your app name, logos, favicon and theme colour, and the photos and words on the sign-in pages.
---

# Branding and sign-in screen

## Branding

**Where:** <AdminPath path="System › Settings › Branding" />

One place sets your brand for the app, the Admin Panel, the Creator Portal and the website. A preview of the app and the Admin Panel sits beside the form.

| Field | What it is |
|---|---|
| **App name**, **Tagline** | Your product's name (up to 40 characters, `eDrama` to start) and one-line tagline (up to 120). The app shows the name once it reaches the server. |
| **Horizontal logo for dark backgrounds** | A logo with a light name. It replaces the mark and name in the sidebar and on the share and error pages. |
| **Horizontal logo for light backgrounds** | A logo with a dark name, for the top bar and public pages in the light theme. |
| **Vertical logo** | The mark above the name, with a light name, for the dark sign-in screens. |
| **Favicon** | The small icon on the browser tab. Square, at least 64 × 64 pixels. |
| **Square logo** | The mark alone, for small spots such as the organisation card and the push preview. Without one, they show the built-in mark. |
| **Wordmark font** | Instrument Serif Italic (default) or Geist Bold, for the name where it's written out. |
| **Theme colour** | One colour for the app, the Admin Panel and the Creator Portal: buttons, switches, progress and highlights. Pick Greenlight (default), Ember, Iris, Rosé, Aqua, Gold, Sky, or a **Custom colour** by hex code. Text on it switches between ink and white so it stays readable. |
| **Studio opens in** | The theme the Admin Panel and Creator Portal open in: Paper (light, the default), Ink (dark) or Follow the device. Each member can still switch with the moon icon. |

Logos are PNG or WebP, up to 1 MB, on a transparent background.

Press **Save**. The Admin Panel and the Creator Portal change at once; the app picks up the change at its next start.

:::note The app's own logo
The logo inside the app (splash screen, Home header) ships with the app. Change it in the app's code: see [Mobile App › Logo and icons](/mobile-app/logo-and-icons/). The app picks up the **App name** and **Theme colour** from here at its next start.
:::

## Sign-in screen

<AdminPath path="System › Settings › Sign-in screen" /> sets the stage beside the Admin Panel's and the Creator Portal's sign-in forms.

- **Photos**: **Built-in photos**, or **Your own photos**: up to 3 landscape photos (JPEG, PNG or WebP up to 4 MB each; 1600 × 1000 or larger looks best). Drag to set their order; fewer than 3 repeat.
- **Motion**: **Cinematic** (the default: photos cross-fade and drift, posters scroll, the tagline rises word by word), **Subtle** (only the photos cross-fade) or **Still**. Anyone whose device asks for less motion always gets a still stage.
- **Show the live titles' posters**: a strip of your newest live series beside the photos. Off, the photos fill the stage.
- **Words**: the **Tagline** and the **Line under it**, separately for the Admin Panel's and the Creator Portal's sign-in. Leave a box blank to keep the standard wording shown in grey.

Press **Save**: the sign-in pages show the change at once.
