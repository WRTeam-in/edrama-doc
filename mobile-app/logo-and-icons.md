---
sidebar_position: 7
title: Logo, icons and splash
description: Replace the in-app logo, the launcher icon, the splash screen and the notification icon.
---

# Logo, icons and splash

## The in-app logo

Replace these files in `assets/branding/`, keeping the **same names and formats**:

| File | What it is |
|---|---|
| `edrama_logo_dark.png` | The full logo for dark backgrounds |
| `edrama_logo_light.png` | The full logo for light backgrounds |
| `edrama_mark.png` | The mark alone |
| `coin.svg`, `coin_mono.svg` | The coin, in colour and in one colour |
| `vip.svg`, `vip_mono.svg` | The VIP badge |
| `company_logo.svg`, `company_logo_light.svg` | Your company's logo at the foot of the splash, for the dark and the light theme |

The two full logos are 2197 × 512 pixels. Keep that shape, or set `brandLogoAspect` in `lib/core/constants/app_assets.dart` to your logo's width divided by its height.

The logos you upload in Admin Panel › Settings › Branding are for the panels and web pages only: the app uses these files.

## The launcher icon

The project is set up for `flutter_launcher_icons` (its settings are at the end of `pubspec.yaml`). Replace the four files in `assets/branding/launcher/` (same names, 1024 × 1024 PNG), then run:

```bash
dart run flutter_launcher_icons
```

| File | What it is |
|---|---|
| `ic_launcher.png` | The full icon, for iOS and older Android |
| `ic_launcher_background.png` | The adaptive icon's background layer |
| `ic_launcher_foreground.png` | The adaptive icon's foreground. The files already leave Android's safe margin, so keep yours the same. |
| `ic_launcher_monochrome.png` | The one-colour layer for Android 13+ themed icons |

More about icon sizes and the options: **[common guide › App icon](https://wrteam-in.github.io/common_app_doc/GeneralSettings/appicon)**.

## The splash screen

The first screen, drawn by the phone before the app starts: your mark centred on black. `dart run flutter_launcher_icons` doesn't change it, so replace these images yourself, at the same sizes:

| Platform | Image | Background |
|---|---|---|
| Android 12 and newer | `splash_icon.png` in each `android/app/src/main/res/drawable-*dpi/` folder | `brand_black` in `values/brand_colors.xml` |
| Android 11 and older | `launch_mark.png` in the same folders, drawn by `drawable*/launch_background.xml` | the same `brand_black` |
| iOS | `LaunchImage.png`, `@2x` and `@3x` in `ios/Runner/Assets.xcassets/LaunchImage.imageset/` | the view's background colour in `ios/Runner/Base.lproj/LaunchScreen.storyboard` |

The animated splash after it uses your logo from `assets/branding/`.

## The notification icon (Android)

- `android/app/src/main/res/drawable-*/ic_stat_edrama.png`: **white on transparent**, in each density folder.
- `brand_green` in `android/app/src/main/res/values/brand_colors.xml`: the colour Android tints it with.
