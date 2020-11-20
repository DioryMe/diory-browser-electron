# Packaging the application

Creating a distributable package a.k.a. binary file.

## Release candidate binary
```
./package-mac-release-candidate.sh
open dist/Diory....dmg
```

## Notarized binary published in diograph.com

We use electron-builder package to package our app. Everything is currently done with the default settings (including default icons).

Steps:
1. Change MacBinaryFilename & WindowsBinaryFilename in Pipeline Cloudformation: https://eu-north-1.console.aws.amazon.com/cloudformation/home
  1. Select stack "dda-build-pipeline"
  2. Click "Update" and "Use current template"
  3. Change the version name (e.g. 1.0.0 -> 1.1.0) for both MacBinaryFilename and WindowsBinaryFilename
  4. Click "Next" -> "Next" -> "I acknowledge" -> "Update stack"
  5. Reconnect Github for pipeline in here: https://eu-north-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/DioryDemoApp-build-pipeline/edit?region=eu-north-1
1. Run script which builds the React code and creates MacOS .dmg file
```
./package-mac-notarized-publish.sh
```
1. Script asks APPLEID and APPLEIDPASS (the app-specific-password one!) for notarization purposes
1. Script asks AWS MFA code to upload binary to S3
1. Wait for the script and the pipeline to succeed: https://eu-north-1.console.aws.amazon.com/codesuite/codepipeline/pipelines
1. Test run the .dmg file (see: Testing plan -> Binary)
```
open dist/Diory....dmg
```

## Apple certificates

You need to setup Apple Developer ID Application and Installer certificates the first time you run this script. Steps:
1. Download them from https://developer.apple.com/account/resources/certificates/list
1. Save them to Keychain called "login" by double clicking them after download

## Config.json for room in focus

Independent from the app there is a config file saved under `~/Library/Application Support`. If you delete this file app starts up with default welcome room content.

MacOS path example:
```
/Users/[username]/Library/Application\ Support/Diory\ -\ Digital\ Memory\ Browser/config.json
```

## Resources folder

Currently we have all the stuff in `build` folder and they end up inside of the `.asar` file.

Convention would be to have only html, css, code and node_modules inside of `.asar` and all the other files like images, audio files etc. in the Resources folder.

=> default diograph content should be placed in Resources folder


## Asar file

> To mitigate issues around long path names on Windows, slightly speed up require and conceal your source code from cursory inspection, you can choose to package your app into an asar archive with little changes to your source code.

Folder structure inside of [.asar file](https://github.com/electron/asar) where `build` and `package.json` are exactly the same as in repository folder.
```
app.asar
  /build
  /package.json
  /node_modules  <--- includes only dependencies packages
```

If you need to extract the asar file to check things:
```
npx asar extract /Applications/Diory\ -\ Digital\ Memory\ Browser.app/Contents/Resources/app.asar ./YourNewDirectory
```
