import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('Import example-folder and choose it again', async (t) => {
  const chooseFolderButton = Selector('div').withExactText(
    '+ Choose where your Diory folder is located on this Mac'
  )
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const exampleFolderDiory = Selector('div').withExactText('testcafe-diograph-folder')
  const settingsButton = Selector('[data-icon=cog]')

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
    .click(exampleFolderDiory)
    .expect(dioryCount)
    .eql(9)
    // Re-choose example-folder
    .click(settingsButton)
    .click(chooseFolderButton)
    .expect(dioryCount)
    .eql(0) // Welcome screen doesn't have any diories
    // Import example-folder folder again
    .click('[data-testid="tools-button"]')
    .click('[data-testid="import-button"]')
    .click('#FOLDER_IMPORT')
    .expect(dioryCount)
    .eql(1)
  // TODO: Check that the diory name is not "example-folder" but "example-folder-2021-01-01T123456"
})
