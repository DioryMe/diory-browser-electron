import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('select new diograph folder (without diograph.json) and delete it', async (t) => {
  const chooseFolderButton = Selector('div').withExactText(
    '+ Choose where your Diory folder is located on this Mac'
  )
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const importedFolderDiory = Selector('div').withExactText('testcafe-diograph-folder')

  const someFolderDiory = Selector('div').withExactText('some-folder')
  const someMusicDiory = Selector('div').withExactText('some-music.mp3')
  const dataFieldValue = Selector('input#data').value
  const deleteButton = Selector('button').withText('Delete')
  const doneButton = Selector('button').withText('Done')

  await t
    .click(chooseFolderButton)
    .expect(dioryCount)
    .eql(0) // Welcome screen doesn't have any diories
    // Import example-folder folder
    .click('[data-testid="tools-button"]')
    .click('[data-testid="import-button"]')
    .click('#FOLDER_IMPORT')
    .expect(dioryCount)
    .eql(1)
    .click(importedFolderDiory)
    .expect(dioryCount)
    .eql(9)
    // Delete diory
    .click('[data-testid="tools-button"]')
    .click('[data-testid="delete-button"]')
    .click(someFolderDiory)
    .click(deleteButton)
    .click('[data-testid="tools-button"]') // Close tool bar
    .wait(1000) // Wait for SAVE_ROOM to complete and possibly raise an error
    .expect(dioryCount)
    .eql(8)
    // Check diory.data
    .click('[data-testid="tools-button"]')
    .click('[data-testid="update-button"]')
    .click(someMusicDiory)
    .expect(dataFieldValue)
    .eql(
      '[{"@context":"https://schema.org","@type":"AudioObject","contentUrl":"some-music.mp3","encodingFormat":"audio/mpeg"}]'
    )
    .click(doneButton)
})
