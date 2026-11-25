---
sidebar_position: 8
title: Colours and fonts
description: The app's theme colours, its five accents, and its two fonts.
---

# Colours and fonts

The app is drawn from one colour file and two fonts. Screens never use a colour directly; they use roles such as "background" or "accent", so changing a value here changes it everywhere.

<Anchor id="the-accent-no-code-needed" />

## The theme colour (accent)

The accent colours buttons, switches, progress and highlights. You have two ways to set it:

1. **From the Admin Panel (no new release):** <Path>Settings › Branding › Theme colour</Path>. The app picks it up at its next start, and the Admin Panel and Creator Portal use the same colour.
2. **The default in the app:** used until the server sends one.

Set your brand colour in Admin Panel › Settings › Branding › **Theme colour**: pick a ready-made one or type any hex code. The app, the panels and the website all pick it up. Try one below:

<AccentPreview />

```dart title="lib/app/config/app_config.dart"
/// The brand accent until the admin panel sends one.
static const AppAccent defaultAccent = AppAccent.greenlight;
```

The built-in accents, defined at the bottom of `lib/core/theme/theme_colors.dart`:

| Accent | On dark | On light |
|---|---|---|
| Greenlight (default) | `#C6EB3B` | `#4A7300` |
| Ember | `#FF8A4C` | `#B4410E` |
| Iris | `#9B8CFF` | `#4F3FD0` |
| Rose | `#FF7FA8` | `#B21C55` |
| Aqua | `#4FDCCB` | `#0B6E64` |

Each accent has a brighter value for buttons and a darker one for text on the light theme, where the bright one would be too faint.

## Light or dark to start with

```dart title="lib/app/config/app_config.dart"
/// The theme a new install starts in; viewers can change it in Settings.
static const ThemeMode defaultThemeMode = ThemeMode.dark;
```

Use `ThemeMode.light`, `ThemeMode.dark` or `ThemeMode.system` (follow the phone). Viewers can change it in <Path panel="app">Me › Settings › Appearance</Path>.

## Every other colour

`lib/core/theme/theme_colors.dart` lists every colour by name, with a note on where it's used. The important ones:

| Colour | Default | Used for |
|---|---|---|
| `coin` | `#F2C25B` | Coins only: the coin, prices, balances. Nothing that isn't a coin is gold. |
| `coinGradient` | `#FFD98A` → `#E9AE3F` | Buttons that buy coins (Top up). |
| `vip` / `vipGradient` | `#F1DDB3`, champagne to bronze | VIP badges, the VIP card and VIP buttons. |
| `onCoin`, `coinShade`, `onVip` | | Text and shading on coin and VIP surfaces. |
| `like` | `#FF4F6E` | Likes and hearts. |
| `streak…` and the `flame…` colours | Orange to deep red | The daily streak's flame and card. |
| `wheel…` | | The Rewards spin wheel. |
| `titleTiers` | Grey → teal → blue → purple → pink → orange → red | Streak titles, lowest to highest. |
| `darkBackground` | `#000000` | The dark theme's background: pure black. |
| `lightBackground` | `#F6F6F3` | The light theme's background. |
| `dark…` / `light…` | | Surfaces, text, borders and status colours for each theme. |
| `greenlight`, `ember`, `iris`, `rose`, `aqua` and their `…OnLight` partners | | The five accents. The `OnLight` colour is a deeper shade used on light backgrounds so text stays readable. |

Also change the Android notification colour (`brand_green` in `android/app/src/main/res/values/brand_colors.xml`) and the splash screens, which are drawn before the app starts ([Logo & icons](/mobile-app/logo-and-icons/)).

## Fonts

The app uses two fonts, both free under the SIL Open Font License:

- **Instrument Serif Italic** for big headings,
- **Geist** for everything else.

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

To replace the heading font instead, change the `InstrumentSerif` family the same way: it needs an `italic` file (declared with `style: italic`).

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

Then run `flutter pub get` and rebuild.

:::note
Keep a font with good coverage of the languages you offer. Hindi, Arabic and other scripts may need their own font family; test each language after a font change.
:::
