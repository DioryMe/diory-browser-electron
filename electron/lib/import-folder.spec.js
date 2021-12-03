const path = require('path')
const { generateDiograph } = require('../generators/diograph-generator')
const { importFolder } = require('./import-folder')
const { copyFolderRecursiveSync } = require('./utils')

const someDiograph = {
  diograph: {
    'some-diory': { id: 'some-diory' },
  },
  rootId: 'some-diory',
}

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  mkdirSync: () => true,
}))
jest.mock('./utils')
copyFolderRecursiveSync.mockImplementation(() => true)
jest.mock('../generators/diograph-generator')
generateDiograph.mockImplementation(() => someDiograph)

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
  describe('e2e test with real path', () => {
    it('works', async () => {
      const importFolderPath = path.join(__dirname, '../readers/example-folder')
      const dioryFolderLocation = './some-path'

      const response = await importFolder({ importFolderPath, dioryFolderLocation })

      expect(response).toEqual(someDiograph)
    })
  })

  describe('throws error', () => {
    it('error', async () => {
      const importFolderPath = './invalid-path'
      const dioryFolderLocation = './some-path'

      const callImportFolder = importFolder({ importFolderPath, dioryFolderLocation })
      await expect(callImportFolder).rejects.toThrowError()
    })
  })
})