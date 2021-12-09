const { existsSync } = require('fs')
const { getDioryFolderLocation } = require('./get-diory-folder-location')
const { settingsStore } = require('./utils')

const someDioryFolderLocation = {
  dioryFolderLocation: 'some-folder-location',
}

jest.mock('./utils')
jest.mock('fs')

describe('getDioryFolderLocation', () => {
  beforeEach(() => {
    settingsStore.mockImplementation(() => ({
      get: () => 'some-folder-location',
      delete: () => true,
    }))
  })

  afterEach(() => {
    // TODO: settingsStore get is called with 'dioryFolderLocation'
  })

  it('returns dioryFolderLocation', async () => {
    existsSync.mockImplementation(() => true)
    await expect(getDioryFolderLocation()).resolves.toEqual(someDioryFolderLocation)
  })

  describe('returns false', () => {
    it('invalid path', async () => {
      existsSync.mockImplementation((path) => !path.match(/some-folder-location$/))
      await expect(getDioryFolderLocation()).resolves.toEqual(false)
      // TODO: settingsStore delete is called with 'dioryFolderLocation'
    })

    it('folder without diograph.json', async () => {
      existsSync.mockImplementation((path) => !path.match(/diograph\.json$/))
      await expect(getDioryFolderLocation()).resolves.toEqual(false)
      // TODO: settingsStore delete is called with 'dioryFolderLocation'
    })
  })
})
