import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('Import diory-demo-content', async (t) => {
  const chooseFolderButton = Selector('div').withExactText(
    '+ Choose where your Diory is located on this Mac'
  )
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const importedFolderDiory = Selector('div').withExactText('testcafe-diograph-folder')
  const doneButton = Selector('button').withText('Done')

  await t
    .click(chooseFolderButton)
    .expect(dioryCount)
    .eql(0) // Welcome screen doesn't have any diories
    // Import diory-demo-content folder
    .click('[data-testid="tools-button"]')
    .click('[data-testid="import-button"]')
    .click('#FOLDER_IMPORT')
    .expect(dioryCount)
    .eql(1)
    .click(importedFolderDiory)
    .expect(dioryCount)
    .eql(8)
    .click('[data-testid="tools-button"]')
    .click('[data-testid="import-button"]')
    .click('#CREATE_TOOL_BUTTON')
    .typeText('input#text', 'New diory')
    .click(doneButton)
    .wait(1000) // Wait for SAVE_ROOM to complete and possibly raise an error
    .expect(dioryCount)
    .eql(9)
    .click('button[data-testid="home"]')
    .expect(dioryCount)
    .eql(1)
})
