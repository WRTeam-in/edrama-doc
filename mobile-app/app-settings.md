---
sidebar_position: 4
title: App settings
description: The one file that points the app at your server and sets its defaults.
---

# App settings

The app's core settings are in one file: <FileRef path="lib/app/config/app_config.dart" />. Edit the values, then build. There are no environments or build flags to set up.

## Point it at your server

```dart title="lib/app/config/app_config.dart"
static const String apiBaseUrl = 'https://admin.your-domain.com/api/v1/';
static const String shareBaseUrl = 'https://admin.your-domain.com';
```

| Setting | What it is |
|---|---|
| `apiBaseUrl` | Your Admin Panel's API, ending in `/api/v1/`. Must be `https://`. |
| `shareBaseUrl` | Where shared links point, such as `https://admin.your-domain.com/s/12`. No trailing slash. It must be the domain that serves the link files: your backend's domain ([Deep links](./deep-links.md)). |

## The rest

| Setting | Default | What it does |
|---|---|---|
| `appName` | `'eDrama'` | The name on the splash and Home header until the Admin Panel's **App name** arrives |
| `appId` | `'in.wrteam.edrama'` | Your Android application ID and iOS bundle ID. Change it when you [change the package name](./package-name.md): YouTube's player needs it. |
| `companyName` | `'WRTeam'` | Your company's name, read out for the logo on the splash screen |
| `showCompanyLogo` | `true` | Shows "Made by" your company at the bottom of the splash. Replace `assets/branding/company_logo.svg` with yours, or set `false` to hide it. |
| `defaultThemeMode` | `ThemeMode.dark` | The theme a new install starts in. Viewers can change it. |
| `defaultAccent` | `AppAccent.greenlight` | The accent until the Admin Panel sends one ([Colours and fonts](./colours-and-fonts.md)) |
| `followDeviceLanguage` | `true` | Start in the phone's language when the app has it |
| `signInWithGoogle`, `signInWithApple`, `signInWithPhone`, `signInWithEmail` | `true` | The sign-in methods. Turn off any you haven't set up in Firebase. Apple requires Sign in with Apple on iOS whenever Google is offered. |
| `protectScreen` | `true` | Blocks screenshots and recordings of the player on Android, and hides the video while the screen is recorded on iOS. Turn it off only if your content may be captured freely. |

Prices, coin packs, VIP plans, ad unit IDs, feature switches, languages and texts are **not** in the app. They come from the Admin Panel, so you change them without a new release.

## Other files you may change

| To change | Edit |
|---|---|
| Colours | `lib/core/theme/theme_colors.dart` |
| Fonts | `lib/core/theme/app_typography.dart` and `fonts:` in `pubspec.yaml` |
| Defaults and limits (playback speeds, Up Next countdown and more) | `lib/core/constants/constant.dart` |
| Logo, coin, VIP badge, company logo | the files in `assets/branding/` (same names) |
| Icons | `lib/core/constants/app_icons.dart` |
| API paths, if yours differ | `lib/core/network/api_endpoints.dart` |
| English texts | `assets/l10n/template.json` |
