const { existsSync, mkdirSync } = require('fs')
const path = require('path')
const { generateDiograph } = require('../generators/diograph-generator')
const { importFolder } = require('./import-folder')
const { readDiographJson } = require('./read-diograph-json')
const { copyFolderRecursiveSync } = require('./utils')

const someValidPath = path.join(__dirname, '../readers/example-folder')
const someCreatedFolderPath = path.join(someValidPath, 'folderName')

const someDiograph = {
  diograph: {
    'some-diory': { id: 'some-diory' },
  },
  rootId: 'some-diory',
}

jest.mock('path', () => ({
  ...jest.requireActual('path'),
  basename: () => 'folderName',
}))
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
}))

jest.mock('./utils')
jest.mock('../generators/diograph-generator')
jest.mock('./read-diograph-json')

// Copies folder to dioryFolderLocation from given path
// - luo folderin
// - jos on jo olemassa
// - same name folder raise error => tries again with different path?
// - if folder with same name already exists, add timestamp
// => pitäiskö olla omansa? kutsuisi varsinaista importFolderia vasta myöhemmin...?

// Error if has diograph.json

// Generates diograph (calls generateDiograph with correct params: copied folderPath from dioryFolderPath)
// Saves diograph (calls saveDiograph with correct params: generateDiograph return value)
// Returns diograph with relative path

describe('importFolder', () => {
  beforeEach(() => {
    mkdirSync.mockReturnValue(true)
    existsSync.mockImplementation((path) => path === someValidPath)
    copyFolderRecursiveSync.mockReturnValue(true)
    generateDiograph.mockResolvedValue(someDiograph)
    readDiographJson.mockReturnValue(undefined) // <--- change this to throwing an error
  })
  describe('creates new folder and calls copyFolderRecursiveSync and generateDiograph with it', () => {
    it('happy case', async () => {
      const importFolderPath = someValidPath
      const dioryFolderLocation = someValidPath

      const response = await importFolder({ importFolderPath, dioryFolderLocation })

      expect(response).toEqual(someDiograph)
      expect(copyFolderRecursiveSync).toHaveBeenCalledWith(someValidPath, someCreatedFolderPath)
      expect(generateDiograph).toHaveBeenCalledWith(someCreatedFolderPath)
    })

    it('importFolder name already exists in diory folder', async () => {
      existsSync.mockImplementation(() => true)
      const importFolderPath = someValidPath
      const dioryFolderLocation = someValidPath

      const response = await importFolder({ importFolderPath, dioryFolderLocation })

      expect(response).toEqual(someDiograph)
      // Calls with .../example-folder/folderName-2021-12-03T170304
      expect(copyFolderRecursiveSync).not.toHaveBeenCalledWith(someValidPath, someCreatedFolderPath)
      expect(generateDiograph).not.toHaveBeenCalledWith(someCreatedFolderPath)
    })
  })

  describe('throws error', () => {
    describe('importFolderPath', () => {
      it("doesn't exist", async () => {
        const importFolderPath = './invalid-path'
        const dioryFolderLocation = someValidPath

        const callImportFolder = importFolder({ importFolderPath, dioryFolderLocation })
        await expect(callImportFolder).rejects.toThrowError()
      })

      it('contains diograph.json', async () => {
        readDiographJson.mockReturnValue(someDiograph)
        const importFolderPath = someValidPath
        const dioryFolderLocation = someValidPath

        const callImportFolder = importFolder({ importFolderPath, dioryFolderLocation })
        await expect(callImportFolder).rejects.toThrowError()
      })

      // TODO: Shouldn't do anything if folder to be imported is empty
      // it('is empty', async () => {
      //   const importFolderPath = './empty-path'
      //   const dioryFolderLocation = someValidPath

      //   const callImportFolder = importFolder({ importFolderPath, dioryFolderLocation })
      //   await expect(callImportFolder).rejects.toThrowError()
      // })
    })

    describe('dioryFolderLocation', () => {
      it("doesn't exist", async () => {
        const importFolderPath = someValidPath
        const dioryFolderLocation = './invalid-path'

        const callImportFolder = importFolder({ importFolderPath, dioryFolderLocation })
        await expect(callImportFolder).rejects.toThrowError()
      })
    })
  })
})
