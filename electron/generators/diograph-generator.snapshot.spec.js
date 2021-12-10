const { join } = require('path')
const glob = require('glob')
const { v4: uuid } = require('uuid')
const { statSync } = require('fs')

const { generateDiograph } = require('./diograph-generator')
const { getDefaultImage } = require('../../src/shared/getDefaultImage')
const { convertDiographUrlsRelative } = require('../lib/convertDiographUrlsRelative')

jest.mock('uuid')
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  statSync: jest.fn(),
}))
jest.mock('../../src/shared/getDefaultImage')

function getNumberOfFilesAndFolders(path) {
  return glob.sync(join(path, '/**/*')).length
}

function getArray(length) {
  return [...Array(length).keys()]
}

describe('diograph-generator', () => {
  describe('generateDiograph', () => {
    beforeEach(() => {
      const fileStats = {
        mtime: {
          toISOString: jest.fn().mockReturnValue('some-modified'),
        },
        birthtime: {
          toISOString: jest.fn().mockReturnValue('some-created'),
        },
      }
      statSync.mockReturnValue(fileStats)
      getDefaultImage.mockReturnValue('some-default-image')
    })
    it('generates diograph from example folder', async () => {
      const exampleFolderPath = join(__dirname, '../readers/example-folder')
      const amountOfCases = getNumberOfFilesAndFolders(exampleFolderPath) + 1
      getArray(amountOfCases).forEach((id) => {
        uuid.mockReturnValueOnce(`uuid-${id}`)
      })

      const { diograph } = await generateDiograph(exampleFolderPath)

      // Relative paths for image & contentUrl
      const diographWithRelativePaths = convertDiographUrlsRelative({
        diograph,
        baseUrl: exampleFolderPath,
      })

      expect(diographWithRelativePaths).toMatchSnapshot()
    })
  })
})
