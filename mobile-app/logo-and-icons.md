---
sidebar_position: 7
title: Logo, icons and splash
description: Replace the in-app logo, the launcher icon, the splash screen and the notification icon.
---

# Logo, icons and splash

All of the app's brand images live in `assets/branding/`. To rebrand, **replace each file with yours under the same name**: nothing in the code needs to change.

<Screen
  id="app-splash"
  type="phone"
  wire="app-splash"
  title="Splash"
  caption="The splash screen as the app starts: the brand mark and the logo, the tagline, and the company logo at the bottom."
  markers={[
    {x: 20.9, y: 42.8, title: 'Brand mark', text: 'edrama_mark.png: the mark alone. It draws itself as the app starts.'},
    {x: 64.4, y: 42.8, title: 'Logo', text: 'edrama_logo_dark.png (on dark) or edrama_logo_light.png (on light).'},
    {x: 50, y: 50, title: 'Tagline', text: '“Stories that hook you. Prices that don’t.” Change it in assets/l10n/template.json (splash.tagline).'},
    {x: 50, y: 93.4, title: 'Made by', text: 'company_logo.svg and company_logo_light.svg. Hide it with showCompanyLogo = false.'},
  ]}
/>

<Anchor id="the-in-app-logo" />

## Brand images

Replace these files in `assets/branding/`, keeping the **same names and formats** (listed in `lib/core/constants/app_assets.dart`). The logos you upload in Admin Panel › Settings › Branding are for the panels and web pages only: the app uses these files.

| File | What it is | Tips |
|---|---|---|
| `edrama_mark.png` | The mark alone, on a transparent square. | Also the source of the app icons. |
| `edrama_logo_dark.png` | Mark and name together, with a **light** name, for dark backgrounds. | Both logo files share one shape: 2197 × 512 px. If yours differs, change `brandLogoAspect` in `lib/core/constants/app_assets.dart`. |
| `edrama_logo_light.png` | The same with a **dark** name, for light backgrounds. | |
| `coin.svg` | The coin, in full colour. | Shown wherever coins appear. |
| `coin_mono.svg` | The coin in one colour (drawn black, tinted in the app). | For toasts and buttons. |
| `vip.svg` / `vip_mono.svg` | The VIP crown, in colour and in one colour. | |
| `company_logo.svg` / `company_logo_light.svg` | "Made by your company" at the foot of the splash, for dark and light. | SVG recommended. Never recoloured. |

To hide the company logo, set this in `lib/app/config/app_config.dart`:

```dart
static const bool showCompanyLogo = false;
```

<Anchor id="the-launcher-icon" />

## App icon

<CommonGuide to="GeneralSettings/appicon" title="App icon" text="Icon sizes, adaptive icons and the flutter_launcher_icons options." />

<Steps>

1. Replace the four files in `assets/branding/launcher/`, keeping their names:
   - `ic_launcher.png`: the full icon (1024 × 1024 recommended),
   - `ic_launcher_background.png` and `ic_launcher_foreground.png`: Android's adaptive icon layers (the foreground already leaves Android's safe margin),
   - `ic_launcher_monochrome.png`: Android's themed (single-colour) icon.
2. Generate every size for both platforms:

   ```bash title="Terminal"
   dart run flutter_launcher_icons
   ```

</Steps>

<Anchor id="the-splash-screen" />

The project is set up for `flutter_launcher_icons`: its settings are at the end of `pubspec.yaml`.

## Splash screen (before Flutter starts)

The very first screen is drawn by the phone's own system, before the app's code runs: your mark centred on black. `dart run flutter_launcher_icons` doesn't change it, so replace these images yourself, **at the same sizes**:

| Platform | Image | Background |
|---|---|---|
| Android 12 and newer | `splash_icon.png` in each `android/app/src/main/res/drawable-*dpi/` folder | `brand_black` in `values/brand_colors.xml` (`#000000`) |
| Android 11 and older | `launch_mark.png` in the same folders, drawn by `drawable*/launch_background.xml` | the same `brand_black` |
| iOS | `LaunchImage.png`, `@2x` and `@3x` in `ios/Runner/Assets.xcassets/LaunchImage.imageset/` | the view's background colour in `ios/Runner/Base.lproj/LaunchScreen.storyboard` (open it in Xcode) |

The animated splash that follows is drawn by the app from your brand images above.

<Anchor id="the-notification-icon-android" />

## Notification icon and colour (Android)

- `android/app/src/main/res/drawable-*/ic_stat_edrama.png`: **white on transparent**, in each density folder.
- `brand_green` in `android/app/src/main/res/values/brand_colors.xml`: the colour Android tints it with.

Android draws the small notification icon in one colour:

- Replace `android/app/src/main/res/drawable-*/ic_stat_edrama.png` with your icon, **white on a transparent background**, in each density folder.
- Change `brand_green` in `android/app/src/main/res/values/brand_colors.xml` to your accent colour.

## Other icons

The app's interface icons are chosen in `lib/core/constants/app_icons.dart`; the bottom bar's tab icons are the SVGs in `assets/icons/tabs/`. Change them only if you want a different icon style.
