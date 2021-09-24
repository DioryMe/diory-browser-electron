import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('select diograph folder with new subfolder (diograph.json + newly added subfolder)', async (t) => {
  const dioryCount = Selector('.ub-flx_1-0-360px').count
  const eventDiory = Selector('div').withExactText('Scouts BSA International (event)')

  await t
    .expect(dioryCount)
    .eql(1)
    .click('[data-testid="home"]')
    .click('[data-testid="tools-button"]')
    .click('[data-testid="undefined-button"]')
    .expect(dioryCount)
    .eql(10)
    .click(eventDiory)
    .expect(dioryCount)
    .eql(8)
})
