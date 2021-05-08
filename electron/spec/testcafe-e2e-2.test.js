import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('select new diograph folder (without diograph.json) and delete it', async (t) => {
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const exampleFolderRoomDiory = Selector('div').withExactText('testcafe-diograph-folder')
  const someFolderDiory = Selector('div').withExactText('some-folder')
  const welcomeRoomDiory = Selector('div').withExactText('Welcome room!')
  const deleteButton = Selector('button').withText('Delete')

  await t
    .expect(dioryCount)
    .eql(1)
    .click('[data-testid="home"]')
    .click('[data-testid="tools-button"]')
    .click('[data-testid="undefined-button"]')
    .expect(dioryCount)
    .eql(9)
    .click('[data-testid="tools-button"]')
    .click('[data-testid="delete-button"]')
    .click(someFolderDiory)
    .click(deleteButton)
    .click('[data-testid="tools-button"]') // Close tool bar
    .wait(1000) // Wait for SAVE_ROOM to complete and possibly raise an error
    .click('[data-testid="home"]')
    .click('[data-testid="tools-button"]')
    .click('[data-testid="home-remove-room-button"]')
    .click(exampleFolderRoomDiory)
    .wait(1000) // Wait for SAVE_HOME to complete and possibly raise an error
    .click(welcomeRoomDiory)
})
