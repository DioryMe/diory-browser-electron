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

```
~/Code/diory-browser-electron (testcafe)* $ testcafe --version
Using locally installed version of TestCafe.
1.8.8
~/Code/diory-browser-electron (testcafe)* $ testcafe "electron:." electron/spec/testcafe-e2e.test.js
Using locally installed version of TestCafe.
ERROR Was unable to open the browser "electron:." due to error.

Error: Unable to connect
    at NodeInspect._callee2$ (/Users/Jouni/Code/diory-browser-electron/node_modules/testcafe-browser-provider-electron/lib/node-inspect.js:123:39)
    at tryCatch (/Users/Jouni/Code/diory-browser-electron/node_modules/babel-runtime/node_modules/regenerator-runtime/runtime.js:62:40)
    at Generator.invoke [as _invoke] (/Users/Jouni/Code/diory-browser-electron/node_modules/babel-runtime/node_modules/regenerator-runtime/runtime.js:296:22)
    at Generator.prototype.<computed> [as next] (/Users/Jouni/Code/diory-browser-electron/node_modules/babel-runtime/node_modules/regenerator-runtime/runtime.js:114:21)
    at step (/Users/Jouni/Code/diory-browser-electron/node_modules/babel-runtime/helpers/asyncToGenerator.js:17:30)
    at /Users/Jouni/Code/diory-browser-electron/node_modules/babel-runtime/helpers/asyncToGenerator.js:28:13

Type "testcafe -h" for help.
~/Code/diory-browser-electron (testcafe)* $
```

```
~/Code/diory-browser-electron (testcafe)* $ export NO_PROXY=127.0.01,localhost
~/Code/diory-browser-electron (testcafe)* $ npx jest --testTimeout 10000 electron/spec/spectron-e2e.test.js
 FAIL  electron/spec/spectron-e2e.test.js (8.031s)
  Test Example
    ✕ opens a window (5120ms)

  ● Test Example › opens a window

    ChromeDriver did not start within 5000ms

      at node_modules/spectron/lib/chrome-driver.js:70:13
      at Request._callback (node_modules/spectron/lib/chrome-driver.js:131:23)
      at self.callback (node_modules/request/request.js:185:22)
      at Request.Object.<anonymous>.Request.onRequestError (node_modules/request/request.js:877:8)
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


---

Tätä alkaa käyttää: https://devexpress.github.io/testcafe/documentation/reference/configuration-file.html
