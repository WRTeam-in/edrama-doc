---
sidebar_position: 8
title: Colours and fonts
description: The app's theme colours, its five accents, and its two fonts.
---

# Colours and fonts

## The accent: no code needed

The **accent** colours the app's buttons, switches, progress and highlights. The app ships with five, and you pick the live one in Admin Panel › Settings › Branding › **Theme colour** (which also offers Gold, Sky and any custom colour). The app picks it up at its next start.

<AccentPreview />

`defaultAccent` in `lib/app/config/app_config.dart` is the accent used until the app first reaches the server.

## Every other colour

All colours are in one file, <FileRef path="lib/core/theme/theme_colors.dart" />. Screens never use raw colours, so changing a value here changes it everywhere.

| Group | What it colours |
|---|---|
| `coin`, `coinGradient`, `onCoin`, `coinShade` | Coins, prices and balances, and the gold Top up buttons |
| `vip`, `vipGradient`, `onVip` | VIP badges, the VIP card and VIP buttons |
| `like`, `streak` | Hearts, and the check-in streak |
| `dark…` | The dark theme (the default), on a pure black background |
| `light…` | The light theme |
| `greenlight`, `ember`, `iris`, `rose`, `aqua` and their `…OnLight` partners | The five accents. The `OnLight` colour is a deeper shade used on light backgrounds so text stays readable. |

The launcher icon, splash and notification colour are read by the phone before Flutter starts: see [Logo, icons and splash](./logo-and-icons.md).

## Fonts

The app uses **Geist** for text and **Instrument Serif** (italic) for big headings.

<Steps>
<Step title="Add the font files">

Put your font's `.ttf` files in `assets/fonts/<YourFont>/`.

</Step>
<Step title="List them in pubspec.yaml">

```yaml title="pubspec.yaml"
fonts:
  - family: YourFont
    fonts:
      - asset: assets/fonts/YourFont/YourFont-Regular.ttf
        weight: 400
      - asset: assets/fonts/YourFont/YourFont-Bold.ttf
        weight: 700
```

</Step>
<Step title="Use the family name">

```dart title="lib/core/theme/app_typography.dart"
abstract final class AppFonts {
  static const String sans = 'YourFont';
  static const String serif = 'InstrumentSerif';
}
```

</Step>
</Steps>
