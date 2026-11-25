---
sidebar_position: 3
title: Run the app
description: Open the project and run eDrama on an emulator or a phone.
---

# Run the app

Before the first run, three things must be in place, because the download ships with placeholders ([what's in the download](/mobile-app/#whats-in-the-download)):

1. your own [package name](/mobile-app/package-name/),
2. your [Firebase files](/mobile-app/firebase/) (the Android build stops without `google-services.json`, and the app won't start without `firebase_options.dart`),
3. your [server's address](/mobile-app/app-settings/) in `app_config.dart`.

Then run it: if it opens and shows your catalogue, your computer is set up correctly.

<Steps>

1. **Open the project.** Unzip the app source code and open the folder in Android Studio or VS Code.
2. **Check your Flutter version.**

   ```bash title="Terminal, in the app folder"
   flutter --version
   ```

   It should say **3.47.7**. (With FVM: `fvm install`, then use `fvm flutter`.) Not set up yet? See [Set up Flutter](/mobile-app/setup-flutter/).

3. **Install the packages.**

   ```bash
   flutter pub get
   ```

4. <Anchor id="if-you-change-the-code" />**Generate the code files.** Some files (ending in `.g.dart` and `.freezed.dart`) are generated from others. They are included, but regenerate them after changing anything marked `@riverpod` or `@freezed`:

   ```bash
   dart run build_runner build
   ```

5. **Start an emulator or connect your phone** (with USB debugging on, for Android).
6. **Run it.**

   ```bash
   flutter run
   ```

</Steps>

The app opens on the splash screen, then onboarding, then Home with your server's catalogue (or the demo data, if you imported it). For iOS, run `pod install` in the `ios` folder once before the first iOS build.

The app talks to the server set in `apiBaseUrl` in `lib/app/config/app_config.dart`. In the download it's `https://your-domain.com/api/v1/`, a placeholder, so the app can't load anything until you set your own Admin Panel's address there ([App settings](/mobile-app/app-settings/)).

<Anchor id="checks" />

## Health checks

Before a release, these should all pass:

```bash title="Terminal"
dart format lib test
flutter analyze        # should print: No issues found!
flutter test
```

## Common problems

| Problem | Fix |
|---|---|
| Errors mentioning a Dart or Flutter version | Use Flutter **3.47.7**. |
| `Undefined name` errors in `.g.dart` files | Run `dart run build_runner build`. |
| iOS build fails at `pod install` | In `ios/`, run `pod repo update` then `pod install`. |
| Android build complains about Java | Point Android Studio at JDK 17 or newer (**Settings › Build Tools › Gradle › Gradle JDK**). |
| The app shows "No internet connection" | The emulator has no network, or the server address is wrong ([Connect to your server](/mobile-app/app-settings/)). |
| Android build stops: `File google-services.json is missing` | Run `flutterfire configure` ([Firebase](/mobile-app/firebase/)). |
| The app stops at start: *Firebase is not configured yet* | `firebase_options.dart` is still the placeholder: run `flutterfire configure` with `--out=lib/app/config/firebase_options.dart`. |
| Nothing loads, or *Server error* | `apiBaseUrl` is still `your-domain.com`, isn't `https://`, or doesn't end in `/api/v1/`. If you turned on `EDRAMA_APP_CHECK=enforce`, test with `monitor` first. |
