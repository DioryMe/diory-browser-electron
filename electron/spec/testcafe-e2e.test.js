fixture`Electron test`.page('../../build/index.html')

import { setElectronDialogHandler } from 'testcafe-browser-provider-electron'

fixture`Electron test`.page('../../build/index.html')

test('Test test', async (t) => {
  await setElectronDialogHandler((type, browserWindow, options) => {
    //browserWindow, options are standard arguments of the opening dialog, you can use it for your purposes
    if (type !== 'open-dialog') {
      return
    }

    //it returns the file path from the open dialog
    return ['./development-content-room']
  })

  await t.click('[data-testid="undefined-button"]').expect(1).eql(2)
})
