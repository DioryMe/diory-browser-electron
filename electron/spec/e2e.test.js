import { getMainMenuItem } from 'testcafe-browser-provider-electron'

fixture`Electron test`.page('../../build/index.html')

test('Check the menu item role', async (t) =>
  await t.click('[data-testid="undefined-button"]').expect(1).eql(2))
