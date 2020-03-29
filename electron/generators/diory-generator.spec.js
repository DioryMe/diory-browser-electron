const { readFolder } = require('../readers/folder-reader')
const { readFile } = require('../readers/file-reader')
const { generateDiograph } = require('./diograph-generator')
const { generateFileDiory, generateFolderDiory } = require('./diory-generator')

jest.mock('../readers/folder-reader')
jest.mock('../readers/file-reader')

describe('diory-generator', () => {
  let act

  describe('generateFileDiory', () => {
    let filePath
    let file

    it('renders with undefined values', async () => {
      generateFileDiory()
    })

    beforeEach(() => {
      file = {}
      act = () => {
        readFile.mockReturnValueOnce(file)
        return generateFileDiory(filePath)
      }
    })

    it('renders with empty responses', async () => {
      await act()
    })

    it('reads file', async () => {
      filePath = 'some-filePath'

      await act()

      expect(readFile).toHaveBeenCalledWith('some-filePath')
    })

    it('sets file created time to diory id', async () => {
      file.created = 'some-file-created'

      const diory = act()

      expect(diory.id).toEqual('some-file-created')
    })

    it('sets file name to diory text', async () => {
      file.name = 'some-file-name'

      const diory = act()

      expect(diory.text).toEqual('some-file-name')
    })

    it('sets file modified time to diory modified', async () => {
      file.modified = 'some-file-modified'

      const diory = act()

      expect(diory.modified).toEqual('some-file-modified')
    })
  })

  describe('generateFolderDiory', () => {
    let folderPath
    let folder

    it('renders with undefined values', async () => {
      generateFileDiory()
    })

    beforeEach(() => {
      folder = {}
      act = () => {
        readFolder.mockReturnValueOnce(folder)
        return generateFolderDiory(folderPath)
      }
    })

    it('renders with empty responses', async () => {
      await act()
    })

    it('reads folder', async () => {
      folderPath = 'some-folderPath'

      await act()

      expect(readFolder).toHaveBeenCalledWith('some-folderPath')
    })

    it('sets folder created time to diory id', async () => {
      folder.created = 'some-folder-created'

      const diory = act()

      expect(diory.id).toEqual('some-folder-created')
    })

    it('sets folder name to diory text', async () => {
      folder.name = 'some-folder-name'

      const diory = act()

      expect(diory.text).toEqual('some-folder-name')
    })

    it('sets folder modified time to diory modified', async () => {
      folder.modified = 'some-folder-modified'

      const diory = act()

      expect(diory.modified).toEqual('some-folder-modified')
    })
  })
})
