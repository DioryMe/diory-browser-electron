fixture`Electron test`.page('../../build/index.html')

test('Test test', async (t) => await t.click('[data-testid="undefined-button"]').expect(1).eql(2))
