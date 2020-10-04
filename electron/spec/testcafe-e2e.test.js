import { Selector } from 'testcafe'
// import { setElectronDialogHandler } from 'testcafe-browser-provider-electron'

// eslint-disable-next-line no-undef
fixture`Electron test`.page('../../build/index.html')

test('Test test', async (t) => {
  // setElectronDialogHandler should mock window.nativeFileDialog.showOpenDialog (in useAddConnectionButton.js)
  // - https://github.com/DevExpress/testcafe-browser-provider-electron#setelectrondialoghandler
  // await setElectronDialogHandler((type, browserWindow, options) => {
  // browserWindow, options are standard arguments of the opening dialog, you can use it for your purposes
  // if (type !== 'open-dialog') {
  //   return
  // }

  // it returns the file path from the open dialog
  // const path = '/Users/Jouni/Code/diory-browser-electron/public/development-content-room'
  // return [path]
  // RESULT:
  // JavaScript error details:
  // TypeError: window.nativeFileDialog.showOpenDialog(...).then is not a function

  // return Promise.new(() => { return { filePaths: [path] } })
  // RESULT:
  // JavaScript error details:
  // Error: Could not call remote method 'showOpenDialog'. Check that the method signature is correct. Underlying error: _promise2 is not defined
  // Underlying stack: ReferenceError: _promise2 is not defined
  // })

  const dioryCount = Selector('.ub-color_white').count

  await t
    // FIXME: Reset Testcafe to start always with the welcome-content
    // .expect(dioryCount)
    // .eql(1)
    // .click('[data-testid="tools-button"]')
    .click('[data-testid="undefined-button"]')
    .expect(dioryCount)
    .eql(4)
})
