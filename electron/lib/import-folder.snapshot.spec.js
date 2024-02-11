const { statSync, mkdirSync, rmdirSync, existsSync } = require('fs')
const { join } = require('path').posix
const { v4: uuid } = require('uuid')
const { importFolder } = require('./import-folder')
const { getDefaultImage } = require('../../src/shared/getDefaultImage')

jest.mock('uuid')
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  statSync: jest.fn(),
}))
jest.mock('../../src/shared/getDefaultImage')

let dioryFolderLocation
let importFolderPath

describe('importFolder snapshot spec', () => {
  beforeEach(() => {
    const tempFolderPath = join(__dirname, `../../tmp`)
    dioryFolderLocation = join(tempFolderPath, `dir-${Date.now()}`)
    if (!existsSync(tempFolderPath)) {
      mkdirSync(tempFolderPath)
    }
    mkdirSync(dioryFolderLocation)
  })

  afterEach(() => {
    rmdirSync(dioryFolderLocation, { recursive: true, force: true })
  })

  describe('folder without diograph.json', () => {
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

      for (let id = 0; id < 50; id += 1) {
        uuid.mockReturnValueOnce(`uuid-${id}`)
      }
    })

    it('returns imported folder diograph', async () => {
      importFolderPath = join(__dirname, '../readers/example-folder')
      const importedFolderDiograph = await importFolder({ importFolderPath, dioryFolderLocation })
      expect(Object.keys(importedFolderDiograph)).toEqual(['rootId', 'diograph'])
      expect(importedFolderDiograph).toMatchSnapshot()
    })
  })

  describe('folder with diograph.json', () => {
    it('returns imported folder diograph', async () => {
      importFolderPath = join(__dirname, '../../public/diory-demo-content')
      const importedFolderDiograph = await importFolder({ importFolderPath, dioryFolderLocation })
      expect(importedFolderDiograph).toMatchSnapshot()
    })
  })
})
