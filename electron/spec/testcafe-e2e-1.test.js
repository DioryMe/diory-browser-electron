import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('Load default diograph and import diory-demo-content (with diograph.json)', async (t) => {
  const chooseFolderButton = Selector('div').withExactText(
    '+ Choose where your Diory is located on this Computer'
  )
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const importedFolderDiory = Selector('div').withExactText('Diory demo content')
  const doneButton = Selector('button').withText('Done')

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
    .click('#CREATE_TOOL')
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
    .eql(8)
})
