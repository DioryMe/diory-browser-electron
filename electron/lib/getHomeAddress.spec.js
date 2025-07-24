const { existsSync } = require('fs')
const { getHomeAddress } = require('./getHomeAddress')
const { settingsStore } = require('./utils')

const someDioryHomeAddress = {
  address: 'some-folder-location',
}

jest.mock('./utils')
jest.mock('fs')

describe('getHomeAddress', () => {
  beforeEach(() => {
    settingsStore.mockImplementation(() => ({
      get: () => 'some-folder-location',
      delete: () => true,
    }))
  })

  afterEach(() => {
    // TODO: settingsStore get is called with 'dioryHomeAddress'
  })

  it('returns dioryHomeAddress', async () => {
    existsSync.mockImplementation(() => true)
    await expect(getHomeAddress()).resolves.toEqual(someDioryHomeAddress)
  })
})
