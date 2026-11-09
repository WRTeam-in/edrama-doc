---
sidebar_position: 3
title: Run the app
description: Open the project and run eDrama on an emulator or a phone.
---

# Run the app

<Steps>
<Step title="Open the project">

Unzip the app's code and open the folder in Android Studio or VS Code.

</Step>
<Step title="Get the packages">

```bash
flutter pub get
```

For iOS, also run:

```bash
cd ios
pod install
cd ..
```

</Step>
<Step title="Run it">

Start an emulator or connect a phone, then:

```bash
flutter run
```

</Step>
</Steps>

The app talks to the server set in `lib/app/config/app_config.dart`. Until you change it, it shows WRTeam's demo server. Point it at your own Admin Panel next: [App settings](./app-settings.md).

## If you change the code

The project uses code generation for its models and state. The generated files are included, so you don't need this to run the app. If you edit a model or a provider, regenerate them:

```bash
dart run build_runner build
```

## Checks

```bash
flutter analyze
flutter test
```
