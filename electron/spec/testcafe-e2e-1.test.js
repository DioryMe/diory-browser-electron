import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('select diograph folder (with diograph.json)', async (t) => {
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const eventDiory = Selector('div').withExactText('Kayaking at Potomac')

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
    .eql(13)
})

// Taking snapshots didn't work too well
// - maybe better idea to take them with Cypress or something
//
// test('take snapshots', async (t) => {
//   const eventDiory = Selector('div').withExactText('Kayaking at Potomac')

//   await t
//     .takeScreenshot({ path: 'welcome-room.png' })
//     .click('[data-testid="home"]')
//     .click('[data-testid="tools-button"]')
//     .click('[data-testid="undefined-button"]')
//     .wait(1000)
//     .takeScreenshot({ path: 'added-room.png' })
//     .click(eventDiory)
//     .wait(1000)
//     .takeScreenshot({ path: 'kayaking-at-potomac.png' })
// })
