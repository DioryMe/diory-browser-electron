const { statSync, mkdirSync, rmSync } = require('fs')
const { join } = require('path')
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

describe('importFolder snapshot spec', () => {
  beforeEach(() => {
    dioryFolderLocation = join(__dirname, `../../tmp/dir-${Date.now()}`)
    mkdirSync(dioryFolderLocation)
  })

  afterEach(() => {
    rmSync(dioryFolderLocation, { recursive: true, force: true })
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

      for (let id = 0; id < 500; id += 1) {
        uuid.mockReturnValueOnce(`uuid-${id}`)
      }
    })

    it('returns imported folder diograph', async () => {
      const importFolderPath = join(__dirname, '../readers/example-folder')
      const importedFolderDiograph = await importFolder({ importFolderPath, dioryFolderLocation })
      expect(Object.keys(importedFolderDiograph)).toEqual(['rootId', 'diograph'])
      expect(importedFolderDiograph).toMatchSnapshot()
    })
  })

  describe('folder with diograph.json', () => {
    it('returns imported folder diograph', async () => {
      const importFolderPath = join(__dirname, '../../public/diory-demo-content')
      const importedFolderDiograph = await importFolder({ importFolderPath, dioryFolderLocation })
      expect(Object.keys(importedFolderDiograph)).toEqual(['rootId', 'diograph'])
      expect(importedFolderDiograph).toMatchSnapshot()
    })
  })
})
