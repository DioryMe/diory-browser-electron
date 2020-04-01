const { statSync } = require('fs')
const { readFile, resolveFileType } = require('./file-reader')

jest.mock('fs')

describe('file-reader', () => {
  let act
  describe('readFile', () => {
    let filePath
    let fileStats

    it('renders with undefined values', async () => {
      readFile()
    })

    beforeEach(() => {
      fileStats = {}
      act = () => {
        statSync.mockReturnValueOnce(fileStats)
        return readFile(filePath)
      }
    })

    it('renders with empty responses', async () => {
      await act()
    })

    it('reads file', async () => {
      filePath = 'some-filePath'

      await act()

      expect(statSync).toHaveBeenCalledWith('some-filePath')
    })

    it('returns file birth time', async () => {
      fileStats.birthtime = {
        toISOString: jest.fn().mockReturnValue('some-fileStats-birthtime'),
      }

      const file = act()

      expect(file.created).toEqual('some-fileStats-birthtime')
    })

    it('returns file modified time', async () => {
      fileStats.mtime = {
        toISOString: jest.fn().mockReturnValue('some-fileStats-mtime'),
      }

      const file = act()

      expect(file.modified).toEqual('some-fileStats-mtime')
    })

    it('returns file name without extension', async () => {
      filePath = 'some-filePath/some-fileName.some-extension'

      const file = act()

      expect(file.text).toEqual('some-fileName')
    })
  })

  describe('resolveFileType', () => {
    let filePath

    it('renders with undefined values', async () => {
      readFile()
    })

    beforeEach(() => {
      act = () => {
        return resolveFileType(filePath)
      }
    })

    it('renders with empty responses', async () => {
      await act()
    })

    describe('given type is defined', () => {
      const definedTypes = [
        ['.jpg', 'image'],
        ['.jpeg', 'image'],
        ['.png', 'image'],
        ['.mpg', 'video'],
        ['.mov', 'video'],
        ['.txt', 'text'],
        ['.md', 'text'],
      ]

      definedTypes.forEach(([extension, type]) => {
        it(`sets ${extension} type as ${type}`, () => {
          filePath = `some-filePath/some-fileName${extension}`

          const type = act()

          expect(type).toEqual(type)
        })
      })
    })

    describe('given type is not defined', () => {
      const undefinedTypes = [['.some'], [''], [undefined], [null], ['noDot']]

      undefinedTypes.forEach(([extension]) => {
        it(`sets ${extension} type as undefined`, () => {
          filePath = `some-filePath/some-fileName${extension}`

          const type = act()

          expect(type).toBeUndefined()
        })
      })
    })
  })
})
