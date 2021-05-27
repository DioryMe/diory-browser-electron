import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('select new diograph folder (without diograph.json) and delete it', async (t) => {
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const exampleFolderRoomDiory = Selector('div').withExactText('testcafe-diograph-folder')
  const someFolderDiory = Selector('div').withExactText('some-folder')
  const someMusicDiory = Selector('div').withExactText('some-music.mp3')
  const dataFieldValue = Selector('input#data').value
  const welcomeRoomDiory = Selector('div').withExactText('Welcome room!')
  const deleteButton = Selector('button').withText('Delete')
  const doneButton = Selector('button').withText('Done')

  await t
    .expect(dioryCount)
    .eql(1)
    // Load diograph folder
    .click('[data-testid="home"]')
    .click('[data-testid="tools-button"]')
    .click('[data-testid="undefined-button"]')
    .expect(dioryCount)
    .eql(9)
    // Delete diory
    .click('[data-testid="tools-button"]')
    .click('[data-testid="delete-button"]')
    .click(someFolderDiory)
    .click(deleteButton)
    .click('[data-testid="tools-button"]') // Close tool bar
    .wait(1000) // Wait for SAVE_ROOM to complete and possibly raise an error
    // Check diory.data
    .click('[data-testid="tools-button"]')
    .click('[data-testid="update-button"]')
    .click(someMusicDiory)
    .expect(dataFieldValue)
    .eql(
      '[{"@context":"https://schema.org","@type":"AudioObject","contentUrl":"some-music.mp3","encodingFormat":"audio/mpeg"}]'
    )
    .click(doneButton)
    // Delete room
    .click('[data-testid="home"]')
    .click('[data-testid="tools-button"]')
    .click('[data-testid="home-remove-room-button"]')
    .click(exampleFolderRoomDiory)
    .wait(1000) // Wait for SAVE_HOME to complete and possibly raise an error
    .click(welcomeRoomDiory)
})
