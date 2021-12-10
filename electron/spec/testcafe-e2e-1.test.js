import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('Import example-folder', async (t) => {
  const chooseFolderButton = Selector('div').withExactText(
    '+ Choose where your Diory is located on this Computer'
  )
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const importedFolderDiory = Selector('div').withExactText('testcafe-diograph-folder')
  const doneButton = Selector('button').withText('Done')

  const someFolderDiory = Selector('div').withExactText('some-folder')
  const someMusicDiory = Selector('div').withExactText('some-music.mp3')
  const dataFieldValue = Selector('input#data').value
  const deleteButton = Selector('button').withText('Delete')

  await t
    .takeScreenshot('testcafe-e2e-1/welcome-screen.png')
    .click(chooseFolderButton)
    .wait(2200) // Wait for welcome screen to disappear
    .expect(dioryCount)
    .eql(0) // Default diograph doesn't have any diories
    // ----- Create diory
    .click('[data-testid="tools-button"]')
    .takeScreenshot('testcafe-e2e-1/home-with-tools.png')
    .click('[data-testid="import-button"]')
    .click('#CREATE_TOOL_BUTTON')
    .takeScreenshot('testcafe-e2e-1/create-tool.png')
    .typeText('input#text', 'New diory')
    .click(doneButton)
    .wait(1000) // Wait for SAVE_DIOGRAPH to complete and possibly raise an error
    .expect(dioryCount)
    .eql(1)
    // ------ Import diory-demo-content folder
    .click('[data-testid="tools-button"]')
    .click('[data-testid="import-button"]')
    .takeScreenshot('testcafe-e2e-1/import-tools.png')
    .click('#FOLDER_IMPORT')
    .expect(dioryCount)
    .eql(2)
    .click(importedFolderDiory)
    .takeScreenshot('testcafe-e2e-1/imported-folder-story.png')
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
      '[{"@context":"https://schema.org","@type":"AudioObject","contentUrl":"testcafe-diograph-folder/some-music.mp3","encodingFormat":"audio/mpeg"}]'
    )
    .click(doneButton)
})
