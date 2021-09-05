import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('select diograph folder (with diograph.json)', async (t) => {
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const eventDiory = Selector('div').withExactText('Scouts BSA International (event)')
  const imageDiory = Selector('#c60c4384-6cb1-4569-b6f8-d6ece4dd75e0')
  const doneButton = Selector('button').withText('Done')

  await t
    .expect(dioryCount)
    .eql(1)
    .click('[data-testid="home"]')
    .click('[data-testid="tools-button"]')
    .click('[data-testid="undefined-button"]')
    .expect(dioryCount)
    .eql(3)
    .click(eventDiory)
    .expect(dioryCount)
    .eql(15)
    .click(imageDiory)
    .click('[data-testid="tools-button"]')
    .click('[data-testid="create-button"]')
    .typeText('input#text', 'New diory')
    .click(doneButton)
    .wait(1000) // Wait for SAVE_ROOM to complete and possibly raise an error
    .click('button[data-testid="home"]')
})
