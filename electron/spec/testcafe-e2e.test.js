import { Selector } from 'testcafe'
import { setElectronDialogHandler } from 'testcafe-browser-provider-electron'

// eslint-disable-next-line no-undef
fixture`Electron test`.page('../../build/index.html')

test('Test test', async (t) => {
  await setElectronDialogHandler((type, browserWindow, options) => {
    // browserWindow, options are standard arguments of the opening dialog, you can use it for your purposes
    if (type !== 'open-dialog') {
      return
    }
    // it returns the file path from the open dialog
    const path = '/Users/Jouni/Code/diory-browser-electron/public/development-content-room'
    return [path]
  })

  const dioryCount = Selector('.ub-color_white').count

  await t
    .expect(dioryCount)
    .eql(1)
    .click('[data-testid="home"]')
    .click('[data-testid="tools-button"]')
    .click('[data-testid="undefined-button"]')
    .expect(dioryCount)
    .eql(4)
})
