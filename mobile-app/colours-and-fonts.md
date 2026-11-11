---
sidebar_position: 8
title: Colours and fonts
description: The app's theme colours, its five accents, and its two fonts.
---

# Colours and fonts

## The accent: no code needed

The **accent** colours the app's buttons, switches, progress and highlights. Set your brand colour in Admin Panel › Settings › Branding › **Theme colour**: pick a ready-made one or type any hex code. The app, the panels and the website all pick it up, with no new app release. Try one below:

<AccentPreview />

`defaultAccent` in `lib/app/config/app_config.dart` is the accent used until the app first reaches the server. It is one of the five accents drawn in `theme_colors.dart`, each with a deeper partner for light backgrounds.

## Every other colour

All colours are in one file, <FileRef path="lib/core/theme/theme_colors.dart" />. Screens never use raw colours, so changing a value here changes it everywhere.

| Group | What it colours |
|---|---|
| `coin`, `coinGradient`, `onCoin`, `coinShade` | Coins, prices and balances, and the gold Top up buttons |
| `vip`, `vipGradient`, `onVip` | VIP badges, the VIP card and VIP buttons |
| `like`, `streak…`, `flame…`, `wheel…` | Hearts, the check-in streak and its flame, and the Rewards spin wheel |
| `dark…` | The dark theme (the default), on a pure black background |
| `light…` | The light theme |
| `greenlight`, `ember`, `iris`, `rose`, `aqua` and their `…OnLight` partners | The five accents. The `OnLight` colour is a deeper shade used on light backgrounds so text stays readable. |

The launcher icon, splash and notification colour are read by the phone before Flutter starts: see [Logo, icons and splash](./logo-and-icons.md).

## Fonts

The app uses **Geist** for text and **Instrument Serif** (italic) for big headings.

<Steps>
<Step title="Add the font files">

Put your font's `.ttf` files in `assets/fonts/<YourFont>/`. The app uses weights 400 to 800 for text, so add each weight your font has (Geist ships Regular, Medium, SemiBold and Bold). Keep the font's licence file next to it.

</Step>
<Step title="List them in pubspec.yaml">

```yaml title="pubspec.yaml"
fonts:
  - family: YourFont
    fonts:
      - asset: assets/fonts/YourFont/YourFont-Regular.ttf
        weight: 400
      - asset: assets/fonts/YourFont/YourFont-Medium.ttf
        weight: 500
      - asset: assets/fonts/YourFont/YourFont-SemiBold.ttf
        weight: 600
      - asset: assets/fonts/YourFont/YourFont-Bold.ttf
        weight: 700
```

To replace the heading font instead, change the `InstrumentSerif` family the same way: it needs an `italic` file.

</Step>
<Step title="Use the family name">

Set it in `AppFonts`, at the top of the file:

```dart title="lib/core/theme/app_typography.dart"
abstract final class AppFonts {
  static const String sans = 'YourFont';
  static const String serif = 'InstrumentSerif';
}
```

</Step>
</Steps>
