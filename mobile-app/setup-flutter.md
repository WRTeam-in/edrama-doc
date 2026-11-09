---
sidebar_position: 2
title: Set up Flutter
description: Install the exact Flutter version eDrama is built with.
---

# Set up Flutter

Follow the common guide to install Flutter, the Java JDK and your IDE:

👉 **[Flutter and Java JDK setup](https://wrteam-in.github.io/common_app_doc/GeneralSettings/basicsetup)**

## The Flutter version

eDrama is built and tested with **Flutter 3.47.7**. Use that exact version: a newer one may need code changes.

```bash
flutter --version
```

The project pins it in `.fvmrc`, so with [FVM](https://fvm.app/) you can run `fvm use` in the project folder and then `fvm flutter …` instead of `flutter …`.

## Check

```bash
flutter doctor
```

Fix anything it marks before you continue. For iOS you need a Mac with Xcode and CocoaPods.
