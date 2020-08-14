# Packaging the application

Creating a distributable package a.k.a. binary file.

## Electron-builder

We use electron-builder package to package our app. Everything is currently done with the default settings (including default icons).

Steps:
1. Run script which builds the React code and creates MacOS .dmg file
```
./package-mac.sh
```
1. Test run the .dmg file
```
open dist/Diory....dmg
```

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
