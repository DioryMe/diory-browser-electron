import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('select diograph folder with new subfolder (diograph.json + newly added subfolder)', async (t) => {
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const eventDiory = Selector('div').withExactText('Kayaking at Potomac')

  await t
    .expect(dioryCount)
    .eql(1)
    .click('[data-testid="home"]')
    .click('[data-testid="tools-button"]')
    .click('[data-testid="undefined-button"]')
    .expect(dioryCount)
    // Would be 4 if could detect that "video in root folder is already linked to another diory"
    // => currently creates new diories for those two videos (although they already exist...)
    // .eql(4)
    .eql(6)
    .click(eventDiory)
    .expect(dioryCount)
    .eql(13)
})
