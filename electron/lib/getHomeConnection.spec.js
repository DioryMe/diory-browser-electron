const { existsSync } = require('fs')
const { getDioryHomeConnection } = require('./getHomeConnection')
const { settingsStore } = require('./utils')

const someDioryHomeConnection = {
  connection: 'some-folder-location',
}

jest.mock('./utils')
jest.mock('fs')

describe('getDioryHomeConnection', () => {
  beforeEach(() => {
    settingsStore.mockImplementation(() => ({
      get: () => 'some-folder-location',
      delete: () => true,
    }))
  })

  afterEach(() => {
    // TODO: settingsStore get is called with 'dioryHomeConnection'
  })

  it('returns dioryHomeConnection', async () => {
    existsSync.mockImplementation(() => true)
    await expect(getDioryHomeConnection()).resolves.toEqual(someDioryHomeConnection)
  })
})
