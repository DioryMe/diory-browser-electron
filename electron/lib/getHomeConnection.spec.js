const { existsSync } = require('fs')
const { getHomeConnection } = require('./getHomeConnection')
const { settingsStore } = require('./utils')

const someDioryHomeConnection = {
  connection: 'some-folder-location',
}

jest.mock('./utils')
jest.mock('fs')

describe('getHomeConnection', () => {
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
    await expect(getHomeConnection()).resolves.toEqual(someDioryHomeConnection)
  })
})
