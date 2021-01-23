import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`Electron test`.page('../../build/index.html')

test('Test test', async (t) => {
  const dioryCount = Selector('.ub-color_white').count

  await t
    .expect(dioryCount)
    .eql(1)
    .click('[data-testid="home"]')
    .click('[data-testid="tools-button"]')
    .click('[data-testid="undefined-button"]')
    .expect(dioryCount)
    .eql(5)
})
