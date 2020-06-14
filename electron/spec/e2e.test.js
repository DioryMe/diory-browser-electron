import { getMainMenuItem } from 'testcafe-browser-provider-electron'

fixture`Electron test`.page('./index.html')

test('Check the menu item role', async (t) => {
  const menuItem = await getMainMenuItem(['Main Menu', 'Edit', 'Undo'])

  await t.expect(menuItem.role).eql('undo')
})
