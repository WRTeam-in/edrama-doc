---
sidebar_position: 4
title: App settings
description: The one file that points the app at your server and sets its defaults.
---

# App settings

<Anchor id="point-it-at-your-server" />

The app reaches your server through two addresses, both in one file: `lib/app/config/app_config.dart`. There are no build flags or environment files: whatever this file says is what the build uses.

| Setting | What it's for | Example |
|---|---|---|
| `apiBaseUrl` | Every request the app makes: catalogue, unlocks, purchases, sign-in. It ends in **`/api/v1/`**. | `https://admin.your-domain.com/api/v1/` |
| `shareBaseUrl` | The address in links viewers share (`…/s/12`). No trailing slash. It must serve your share pages and link files. | `https://admin.your-domain.com` |

<Steps>

1. Open `lib/app/config/app_config.dart`.
2. Change the two values:

   ```dart title="lib/app/config/app_config.dart"
   /// Your admin panel's API, ending in `/api/v1/`.
   static const String apiBaseUrl = 'https://admin.your-domain.com/api/v1/';

   /// Where shared links point, e.g. `https://yourdomain.com/s/12`. No
   /// trailing slash.
   static const String shareBaseUrl = 'https://admin.your-domain.com';
   ```

3. Run the app again. The Home screen now shows your own catalogue (or the demo data, if you imported it).

</Steps>

:::warning
- `apiBaseUrl` **must** end with `/api/v1/`, including the last slash.
- `shareBaseUrl` must **not** end with a slash.
- Use `https://`. Phones refuse plain `http://` addresses in release builds.
:::

## What the app learns from the server

At every start, the app asks your server for its configuration. That's how these things reach viewers without a new release:

- the app name and theme colour from <Path>Settings › Branding</Path>,
- the feature switches and maintenance mode from <Path>Settings › App & support</Path>,
- the minimum and latest app versions (to ask viewers to update),
- push limits and quiet hours, the daily spend cap choices,
- the viewer's region: its currency, coin packs, VIP plans and ad units,
- every language other than English.

So after your first build, most changes happen in the Admin Panel. You rebuild the app only for changes to the files listed in [Prerequisites](/mobile-app/#every-file-youll-change).

## Also change the share-link hosts

If you change `shareBaseUrl`, the same domain must also be set as the Android `shareHost` and in iOS's associated domains, or shared links open in the browser instead of the app. See [Deep links](/mobile-app/deep-links/).

<Anchor id="the-rest" />

## Everything in `app_config.dart`

The same file holds the rest of the app's own settings. The download's values are on the left; change them as you rebrand.

| Setting | In the download | What it does |
|---|---|---|
| `apiBaseUrl` | `https://your-domain.com/api/v1/` | Your Admin Panel's API (above). |
| `shareBaseUrl` | `https://your-domain.com` | Where shared links point (above), such as `https://admin.your-domain.com/s/12`. |
| `appName` | `'eDrama'` | The name on the splash and Home header until the Admin Panel's **App name** arrives ([Name & package name](/mobile-app/package-name/)). |
| `appId` | `'com.example.edrama'` | Your application ID / bundle ID. YouTube's player needs it ([Name & package name](/mobile-app/package-name/)). |
| `companyName` | `'WRTeam'` | Your company's name, read out for the logo at the foot of the splash. |
| `showCompanyLogo` | `true` | Shows "Made by" your company on the splash. Replace `assets/branding/company_logo.svg`, or set `false` ([Logo & icons](/mobile-app/logo-and-icons/)). |
| `defaultThemeMode` | `ThemeMode.dark` | The theme a new install starts in. Viewers can change it. |
| `defaultAccent` | `AppAccent.greenlight` | The accent until the Admin Panel sends one ([Colours & fonts](/mobile-app/colours-and-fonts/)). |
| `followDeviceLanguage` | `true` | Start in the phone's language when you offer it ([Languages](/mobile-app/languages/)). |
| `signInWithGoogle`, `signInWithApple`, `signInWithPhone`, `signInWithEmail` | `true` | The sign-in methods. Turn off any you haven't set up in Firebase ([Defaults & limits](/mobile-app/defaults-and-limits/#sign-in-methods)). |
| `protectScreen` | `true` | Blocks screenshots and recordings of the player ([Defaults & limits](/mobile-app/defaults-and-limits/#screen-protection)). |

Prices, coin packs, VIP plans, ad unit IDs, feature switches, languages and texts are **not** here: they come from the Admin Panel. The AdMob **app** IDs are the exception: they're build settings ([Ads setup](/mobile-app/ads-and-purchases/)).

## Other files you may change

| To change | Edit |
|---|---|
| Colours | `lib/core/theme/theme_colors.dart` |
| Fonts | `lib/core/theme/app_typography.dart` and `fonts:` in `pubspec.yaml` |
| Defaults and limits (playback speeds, Up Next countdown and more) | `lib/core/constants/constant.dart` |
| Logo, coin, VIP badge, company logo | the files in `assets/branding/` (same names), listed in `lib/core/constants/app_assets.dart` |
| Icons | `lib/core/constants/app_icons.dart` |
| API paths, if yours differ | `lib/core/network/api_endpoints.dart` |
| English texts | `assets/l10n/template.json` |
