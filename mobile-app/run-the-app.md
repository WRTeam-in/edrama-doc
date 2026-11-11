---
sidebar_position: 3
title: Run the app
description: Open the project and run eDrama on an emulator or a phone.
---

# Run the app

Before the first run, give the app your [package name](./package-name.md), connect [Firebase](./firebase.md) and set your server in [App settings](./app-settings.md). The download has no Firebase files, so neither the Android nor the iOS build runs until `flutterfire configure` has made them.

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

The app talks to the server set in `apiBaseUrl` in `lib/app/config/app_config.dart`. It ships as `https://your-domain.com/api/v1/`, a placeholder, so the app can't load anything until you set your own Admin Panel's address there: [App settings](./app-settings.md).

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
