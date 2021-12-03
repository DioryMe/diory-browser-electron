const path = require('path')
const { generateDiograph } = require('../generators/diograph-generator')
const { importFolder } = require('./import-folder')
const { copyFolderRecursiveSync } = require('./utils')

const someValidPath = path.join(__dirname, '../readers/example-folder')
const someCreatedFolderPath = `${someValidPath}/folderName`

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
  mkdirSync: () => true,
}))
jest.mock('./utils')
copyFolderRecursiveSync.mockReturnValue(true)
jest.mock('../generators/diograph-generator')
generateDiograph.mockResolvedValue(someDiograph)

// Copies folder to dioryFolderLocation from given path
// - luo folderin
// - jos on jo olemassa
// - same name folder raise error => tries again with different path?
// - if folder with same name already exists, add timestamp
// => pitäiskö olla omansa? kutsuisi varsinaista importFolderia vasta myöhemmin...?

// Error if has diograph.json
// Error if path doesn't exist
// Error if folder is empty

// Generates diograph (calls generateDiograph with correct params: copied folderPath from dioryFolderPath)
// Saves diograph (calls saveDiograph with correct params: generateDiograph return value)
// Returns diograph with relative path

describe('importFolder', () => {
  describe('creates new folder and calls copyFolderRecursiveSync and generateDiograph with it', () => {
    it('happy case', async () => {
      const importFolderPath = someValidPath
      const dioryFolderLocation = someValidPath

      const response = await importFolder({ importFolderPath, dioryFolderLocation })

      expect(response).toEqual(someDiograph)
      expect(copyFolderRecursiveSync).toHaveBeenCalledWith(someValidPath, someCreatedFolderPath)
      expect(generateDiograph).toHaveBeenCalledWith(someCreatedFolderPath)
    })

    it('already existing folder with importFolder name', async () => {
      const importFolderPath = someValidPath
      const dioryFolderLocation = someValidPath

      const response = await importFolder({ importFolderPath, dioryFolderLocation })

      expect(response).toEqual(someDiograph)
      expect(copyFolderRecursiveSync).toHaveBeenCalledWith(someValidPath, someCreatedFolderPath)
      expect(generateDiograph).toHaveBeenCalledWith(someCreatedFolderPath)
    })
  })

  describe('throws error', () => {
    it("importFolderPath doesn't exist", async () => {
      const importFolderPath = './invalid-path'
      const dioryFolderLocation = someValidPath

      const callImportFolder = importFolder({ importFolderPath, dioryFolderLocation })
      await expect(callImportFolder).rejects.toThrowError()
    })

    it("dioryFolderLocation doesn't exist", async () => {
      const importFolderPath = someValidPath
      const dioryFolderLocation = './invalid-path'

      const callImportFolder = importFolder({ importFolderPath, dioryFolderLocation })
      await expect(callImportFolder).rejects.toThrowError()
    })
  })
})
