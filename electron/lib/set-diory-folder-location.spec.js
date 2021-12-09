const path = require('path')
const { existsSync } = require('fs')
const { setDioryFolderLocation, defaultDiograph } = require('./set-diory-folder-location')
const { settingsStore, directoryExists } = require('./utils')
const { saveDiograph } = require('./save-diograph')

const someSelectedFolderLocation = 'some-selected-folder-location'
const someDioryFolderLocation = {
  dioryFolderLocation: path.join(someSelectedFolderLocation, 'My Diory'),
}

const setStore = jest.fn()

jest.mock('./save-diograph')
jest.mock('./utils')
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  mkdirSync: () => true,
  existsSync: jest.fn(),
}))

describe('setDioryFolderLocation', () => {
  beforeEach(() => {
    existsSync.mockImplementation(() => true)
    settingsStore.mockImplementation(() => ({
      set: setStore,
    }))
    directoryExists.mockImplementation(() => true)
  })

  describe('given empty folder', () => {
    it('saves defaultDiograph diograph.json + saves & returns dioryFolderLocation', async () => {
      directoryExists.mockImplementation((path) => !path.match(/My Diory$/))

      const returnValue = await setDioryFolderLocation(someSelectedFolderLocation)

      expect(returnValue).toEqual(someDioryFolderLocation)
      expect(setStore).toHaveBeenCalledTimes(1)
      expect(setStore).toHaveBeenCalledWith(
        'dioryFolderLocation',
        someDioryFolderLocation.dioryFolderLocation
      )
      expect(saveDiograph).toHaveBeenCalledTimes(1)
      expect(saveDiograph).toHaveBeenCalledWith({
        ...someDioryFolderLocation,
        ...defaultDiograph,
      })
    })
  })

  describe('given folder where diograph.json already exists', () => {
    it('returns dioryFolderLocation', async () => {
      existsSync.mockImplementation(() => true)

      const returnValue = await setDioryFolderLocation(someSelectedFolderLocation)

      expect(returnValue).toEqual(someDioryFolderLocation)
      expect(setStore).toHaveBeenCalledTimes(1)
      expect(setStore).toHaveBeenCalledWith(
        'dioryFolderLocation',
        someDioryFolderLocation.dioryFolderLocation
      )
      expect(saveDiograph).toHaveBeenCalledTimes(0)
    })
  })

  describe('throws error', () => {
    it("My Diory folder exists but doesn't contain diograph.json", async () => {
      existsSync.mockImplementation((path) => !path.match(/diograph\.json$/))
      await expect(setDioryFolderLocation(someSelectedFolderLocation)).rejects.toThrowError()
    })

    it("selectedFolderLocation doesn't exist", async () => {
      directoryExists.mockImplementation((path) => !path.match(/some-selected-folder-location$/))
      await expect(setDioryFolderLocation(someSelectedFolderLocation)).rejects.toThrowError()
    })
  })
})
