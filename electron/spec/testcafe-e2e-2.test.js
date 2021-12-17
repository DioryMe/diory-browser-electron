import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('Load diory-demo-content by default and import example folder (without diograph.json)', async (t) => {
  const chooseFolderButton = Selector('div').withExactText(
    '+ Choose where your Diory is located on this Computer'
  )
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const exampleFolderDiory = Selector('div').withExactText('example-folder')

  const someFolderDiory = Selector('div').withExactText('some-folder')
  const someMusicDiory = Selector('div').withExactText('some-music.mp3')
  const dataFieldValue = Selector('input#data').value
  const deleteButton = Selector('button').withText('Delete')
  const doneButton = Selector('button').withText('Done')

  await t
    .click(chooseFolderButton)
    .wait(3000) // Wait for welcome screen to disappear
    .expect(dioryCount)
    .eql(8)
    // Import example-folder folder
    .click('[data-testid="tools-button"]')
    .click('[data-testid="import-button"]')
    .click('#FOLDER_IMPORT')
    .expect(dioryCount)
    .eql(9)
    .click(exampleFolderDiory)
    .expect(dioryCount)
    .eql(9)
    // ------ Delete diory
    .click('[data-testid="tools-button"]')
    .click('[data-testid="delete-button"]')
    .takeScreenshot('testcafe-e2e-2/delete-tool-activated')
    .click(someFolderDiory)
    .takeScreenshot('testcafe-e2e-2/delete-tool-modal')
    .click(deleteButton)
    .click('[data-testid="tools-button"]') // Close tool bar
    .wait(1000) // Wait for SAVE_ROOM to complete and possibly raise an error
    .expect(dioryCount)
    .eql(8)
    // Check diory.data
    .click('[data-testid="tools-button"]')
    .click('[data-testid="update-button"]')
    .takeScreenshot('testcafe-e2e-2/update-tool-activated')
    .click(someMusicDiory)
    .takeScreenshot('testcafe-e2e-2/update-tool-modal')
    .expect(dataFieldValue)
    .eql(
      '[{"@context":"https://schema.org","@type":"AudioObject","contentUrl":"example-folder/some-music.mp3","encodingFormat":"audio/mpeg"}]'
    )
    .click(doneButton)
})
