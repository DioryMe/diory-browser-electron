const { join } = require('path')
const { statSync } = require('fs')
const { readPaths, readFolder } = require('./folder-reader')

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  statSync: jest.fn()
}));

describe('folder-reader', () => {
  let act

  describe('readPaths', () => {
    describe('given a folder path', () => {
      let filesAndSubfolders
      let folderPath
      beforeEach(async () => {
        folderPath = join(__dirname, 'example-folder')
        filesAndSubfolders = await readPaths(folderPath)
      })

      it('returns files', () => {
        expect(filesAndSubfolders.files.length).toEqual(3)
      })

      it('returns subfolders', () => {
        expect(filesAndSubfolders.subfolders.length).toEqual(1)
      })
    })
  })

  describe('readFolder', () => {
    let folderPath
    let folderStats

    it('renders with undefined values', async () => {
      readFolder()
    })

    beforeEach(() => {
      jest.mock('fs')

      folderStats = {}
      act = () => {
        statSync.mockReturnValueOnce(folderStats)
        return readFolder(folderPath)
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

    it('returns folder created time', async () => {
      folderStats.ctime = 'some-folderStats-ctime'

      const folder = act()

      expect(folder.created).toEqual('some-folderStats-ctime')
    })

    it('returns folder modified time', async () => {
      folderStats.mtime = 'some-folderStats-mtime'

      const folder = act()

      expect(folder.modified).toEqual('some-folderStats-mtime')
    })

    it('returns folder name without extension', async () => {
      folderPath = 'some-folderPath/some-folderName'

      const folder = act()

      expect(folder.name).toEqual('some-folderName')
    })
  })
})
