const { join } = require('path')
const glob = require('glob')
const { v4: uuid } = require('uuid')

// NOTE: This uses a bit special generateDiographWithRelativeImagePaths !!!
const { generateDiographWithRelativeImagePaths } = require('./diograph-generator')

const generateDiograph = generateDiographWithRelativeImagePaths

// Mock fs.statSync
jest.mock('fs', () => {
  const originalFsModule = jest.requireActual('fs')
  const mockedFsModule = jest.genMockFromModule('fs')
  const mockedStatSyncResponse = {
    birthtime: { toISOString: () => 'created-timestamp' },
    mtime: { toISOString: () => 'modified-timestamp' },
  }
  return { ...mockedFsModule, ...originalFsModule, statSync: jest.fn(() => mockedStatSyncResponse) }
})

// Mock uuid
jest.mock('uuid')

function getNumberOfFilesAndFolders(path) {
  return glob.sync(join(path, '/**/*')).length
}

function getArray(length) {
  return [...Array(length).keys()]
}

describe('diograph-generator', () => {
  describe('generateDiograph', () => {
    it('generates diograph from example folder', async () => {
      const exampleFolderPath = join(__dirname, '../readers/example-folder')
      const amountOfCases = getNumberOfFilesAndFolders(exampleFolderPath) + 1
      getArray(amountOfCases).forEach((id) => {
        uuid.mockReturnValueOnce(`uuid-${id}`)
      })

      const { diograph } = await generateDiograph(exampleFolderPath)

      expect(diograph).toMatchSnapshot()
    })
  })
})
