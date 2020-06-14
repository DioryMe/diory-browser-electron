const Application = require('spectron').Application
const path = require('path')

const electronPath = require('electron')
const appPath = path.join(__dirname, '..', '..')

const app = new Application({
  path: electronPath,
  args: [appPath],
})

describe('Test Example', () => {
  beforeEach(() => {
    return app.start()
  })

  afterEach(() => {
    return app.stop()
  })

  it('opens a window', () => {
    expect.assertions(1)
    return app.client
      .click('[data-testid="undefined-button"]')
      .waitForExist('ub-color_white')
      .then((j) => {
        expect(1).toEqual(1)
      })
  })
})
