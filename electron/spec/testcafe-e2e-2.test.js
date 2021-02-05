import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`GIVEN welcome room`.page('../../build/index.html')

test('select new diograph folder (without diograph.json)', async (t) => {
  const dioryCount = Selector('.ub-flx_1-0-360px').count

  await t
    .expect(dioryCount)
    .eql(1)
    .click('[data-testid="home"]')
    .click('[data-testid="tools-button"]')
    .click('[data-testid="undefined-button"]')
    .expect(dioryCount)
    .eql(5)
})