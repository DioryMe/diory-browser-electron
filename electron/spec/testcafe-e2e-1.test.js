import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('select diograph folder (with diograph.json)', async (t) => {
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const eventDiory = Selector('div').withExactText('Scouts BSA International (event)')
  const imageDiory = Selector('#103f852d-4a2a-44de-8f4f-08ccddc3d280')
  const doneButton = Selector('button').withText('Done')

  await t
    .expect(dioryCount)
    .eql(1)
    .click('[data-testid="home"]')
    .click('[data-testid="tools-button"]')
    .click('[data-testid="undefined-button"]')
    .expect(dioryCount)
    .eql(9)
    .click(eventDiory)
    .click(eventDiory)
    .expect(dioryCount)
    .eql(11)
    .click(imageDiory)
    .click(imageDiory)
    .click('[data-testid="tools-button"]')
    .click('[data-testid="create-button"]')
    .typeText('input#text', 'New diory')
    .click(doneButton)
    .wait(1000) // Wait for SAVE_ROOM to complete and possibly raise an error
    .click('button[data-testid="home"]')
})
