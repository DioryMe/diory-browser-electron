This helped for "ERROR Unable to find the browser. "electron:./" is not a browser alias or path to an executable file."
```
yarn add -D testcafe testcafe-browser-provider-electron
```

With Electron 9:
1. Launches correctly with incorrect mainWindowUrl but testcafe doesn't work
1. With correct mainWindowUrl freezes (maybe some cross-origin content-security issue with file:// )

Electron 8 not supported:
https://github.com/DevExpress/testcafe-browser-provider-electron/issues/64
=> THIS WAS THE SOLUTION!!!!, downgraded to Electron v7

Both binary & .js versions work the same way...


Doesn't shut down after tests?

Logging is needed


Run tests:
```
testcafe "electron:." electron/spec/testcafe-e2e.test.js
npx jest electron/spec/spectron-e2e.test.js
```

Source mapit olis kova:
```
file:///Users/Jouni/Code/diory-browser-electron/build/static/js/main.ea992b26.chunk.js:2:9288
```
Tarvittais logitusta, että tuota^ voisi selvitellä tarkemmin.


Spectron can't interact with dialogs:
https://github.com/electron-userland/spectron/issues/23


Toimii samalla tavalla kuin t.setNativeDialogHandler
- ei toiminut esimerkki, tulee yhä window.nativeFileDialog.showOpenDialog(...).then is not a function

=> tästä voisi rapsata bugin, jos jaksais


