import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('Import diory-demo-content with diograph.json and choose it again', async (t) => {
  const chooseFolderButton = Selector('div').withExactText(
    '+ Choose where your Diory is located on this Mac'
  )
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const exampleFolderDiory = Selector('div').withExactText('example-folder')
  const settingsButton = Selector('[data-icon=cog]')

  await t
    .click(chooseFolderButton)
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
    // Re-choose example-folder
    .click(settingsButton)
    .click(chooseFolderButton)
    .expect(dioryCount)
    .eql(9)
    // Import example-folder folder again
    .click('[data-testid="tools-button"]')
    .click('[data-testid="import-button"]')
    .click('#FOLDER_IMPORT')
    .expect(dioryCount)
    .eql(10)
  // TODO: Check that the diory name is not "example-folder" but "example-folder-2021-01-01T123456"
  // TODO2: Try searching something to verify that the store has been cleared (requires creating new diory in first phase)
})
