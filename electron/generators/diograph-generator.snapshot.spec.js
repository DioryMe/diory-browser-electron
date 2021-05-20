const { join } = require('path')
const glob = require('glob')
const { v4: uuid } = require('uuid')
const { statSync } = require('fs')

const { generateDiograph } = require('./diograph-generator')
const { getDefaultImage } = require('../../src/shared/getDefaultImage')

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
      // TODO: Move to own function in generate-diograph-channel
      //       && call it from there instead of copy-pasting here
      Object.keys(diograph).forEach((dioryId) => {
        const diory = diograph[dioryId]
        if (diory.image) {
          diory.image = diory.image.replace(`${exampleFolderPath}/`, '')
        }
        if (diory.data && diory.data.contentUrl) {
          diory.data.contentUrl = diory.data.contentUrl.replace(`${exampleFolderPath}/`, '')
        }
      })

      expect(diograph).toMatchSnapshot()
    })
  })
})
