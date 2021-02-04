const { join } = require('path')
const { statSync } = require('fs')
const { getFileAndSubfolderPaths, readFolderMetadata } = require('./folder-reader')

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  statSync: jest.fn(),
}))

describe('folder-reader', () => {
  let act

  describe('getFileAndSubfolderPaths', () => {
    describe('given a folder path', () => {
      let filesAndSubfolders
      let folderPath
      beforeEach(async () => {
        folderPath = join(__dirname, 'example-folder')
        filesAndSubfolders = await getFileAndSubfolderPaths(folderPath)
      })

      it('returns files', () => {
        expect(filesAndSubfolders.files.length).toEqual(4)
      })

      it('returns subfolders', () => {
        expect(filesAndSubfolders.subfolders.length).toEqual(1)
      })
    })
  })

  describe('readFolderMetadata', () => {
    let folderPath
    let folderStats

    it('renders with undefined values', async () => {
      readFolderMetadata()
    })

    beforeEach(() => {
      jest.mock('fs')

      folderStats = {}
      act = () => {
        statSync.mockReturnValueOnce(folderStats)
        return readFolderMetadata(folderPath)
      }
    })

    it('renders with empty responses', async () => {
      await act()
    })

    it('reads folder', async () => {
      folderPath = 'some-folderPath'

      await act()

      expect(statSync).toHaveBeenCalledWith('some-folderPath')
    })

    it('returns folder birth time', async () => {
      folderStats.birthtime = {
        toISOString: jest.fn().mockReturnValue('some-folderStats-birthtime'),
      }

      const folder = act()

      expect(folder.created).toEqual('some-folderStats-birthtime')
    })

    it('returns folder modified time', async () => {
      folderStats.mtime = {
        toISOString: jest.fn().mockReturnValue('some-folderStats-mtime'),
      }

      const folder = act()

      expect(folder.modified).toEqual('some-folderStats-mtime')
    })

    it('returns folder name without extension', async () => {
      folderPath = 'some-folderPath/some-folderName'

      const folder = act()

      expect(folder.text).toEqual('some-folderName')
    })
  })
})
