const { v4: uuid } = require('uuid')
const { statSync } = require('fs')
const { basename } = require('path')
const { fromFile } = require('file-type')
const { readImage } = require('../readers/image-reader')
const { readFolderMetadata } = require('../readers/folder-reader')
const { generateDioryFromFile, generateDioryFromFolder } = require('./diory-generator')

jest.mock('uuid')
jest.mock('../readers/folder-reader')
jest.mock('../readers/image-reader')
jest.mock('file-type')
jest.mock('path')
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  statSync: jest.fn(),
}))

describe('diory-generator', () => {
  let act

  describe('generateDioryFromFile', () => {
    let filePath

    it('renders with undefined values', async () => {
      await generateDioryFromFile()
    })

    beforeEach(() => {
      act = async () => generateDioryFromFile(filePath)
    })

    it('renders with empty responses', async () => {
      await act()
    })

    it('sets uuid to diory id', async () => {
      uuid.mockReturnValue('some-uuid')

      const diory = await act()

      expect(diory.id).toEqual('some-uuid')
    })

    it('sets mtime to modified', async () => {
      const fileStats = {
        mtime: {
          toISOString: jest.fn().mockReturnValue('some-fileStats-mtime'),
        },
      }
      statSync.mockReturnValueOnce(fileStats)

      const diory = await act()

      expect(diory.modified).toEqual('some-fileStats-mtime')
    })

    it('sets birthtime to created', async () => {
      const fileStats = {
        birthtime: {
          toISOString: jest.fn().mockReturnValue('some-fileStats-birthtime'),
        },
      }
      statSync.mockReturnValueOnce(fileStats)

      const diory = await act()

      expect(diory.created).toEqual('some-fileStats-birthtime')
    })

    it('sets basename to text', async () => {
      basename.mockReturnValueOnce('some-file.txt')

      const diory = await act()

      expect(diory.text).toEqual('some-file.txt')
    })

    it('sets defaultSchema to data', async () => {
      filePath = 'some-filePath'

      const diory = await act()

      expect(diory.data).toEqual({
        '@context': 'https://schema.org',
        '@type': 'DigitalDocument',
        contentUrl: 'some-filePath',
      })
    })

    describe('image/* mime type', () => {
      const image = {}

      beforeEach(() => {
        basename.mockReturnValueOnce('some-file.txt')
        fromFile.mockResolvedValue({ mime: 'image/jpeg' })
        readImage.mockResolvedValue(image)
      })

      it('sets uuid to diory id', async () => {
        uuid.mockReturnValue('some-uuid')

        const diory = await act()

        expect(diory.id).toEqual('some-uuid')
      })

      it('overrides attribute (=text) from readImage response', async () => {
        image.text = 'some-read-image-text'

        const diory = await act()

        expect(diory.text).toEqual('some-read-image-text')
      })

      const imageData = [
        'text',
        'image',
        'date',
        'latitude',
        'longitude',
        'created',
        'modified',
        'data',
      ]

      imageData.forEach((prop) => {
        it(`sets image ${prop} to diory ${prop}`, async () => {
          image[prop] = `some-image-${prop}`

          const diory = await act()

          expect(diory[prop]).toEqual(`some-image-${prop}`)
        })
      })

      it("doesn't set id from readImage response", async () => {
        image.id = 'some-id'

        const diory = await act()

        expect(diory.id).toEqual(undefined)
      })

      it("doesn't set invalidprop from readImage response", async () => {
        image.invalidprop = 'some-invalidprop'

        const diory = await act()

        expect(diory.invalidprop).toEqual(undefined)
      })
    })
  })

  describe('generateDioryFromFolder', () => {
    let folderPath
    let linkedDiorys
    let folder

    it('renders with undefined values', async () => {
      generateDioryFromFolder()
    })

    beforeEach(() => {
      folder = {}
      act = () => {
        readFolderMetadata.mockReturnValueOnce(folder)
        return generateDioryFromFolder(folderPath, linkedDiorys)
      }
    })

    it('renders with empty responses', async () => {
      await act()
    })

    it('reads folder', async () => {
      folderPath = 'some-folderPath'

      await act()

      expect(readFolderMetadata).toHaveBeenCalledWith('some-folderPath')
    })

    it('sets uid to diory id', async () => {
      uuid.mockReturnValue('some-uuid')

      const diory = await act()

      expect(diory.id).toEqual('some-uuid')
    })

    it('sets first image from linked diorys', async () => {
      linkedDiorys = {
        'some-link-key': { id: 'some-id' },
        'first-link-key': { id: 'first-id', image: 'first-image' },
        'second-link-key': { id: 'second-id', image: 'second-image' },
      }

      const diory = await act()

      expect(diory.image).toEqual('first-image')
    })

    const folderData = ['text', 'date', 'latitude', 'longitude', 'created', 'modified']

    folderData.forEach((prop) => {
      it(`sets folder ${prop} to diory ${prop}`, async () => {
        folder[prop] = `some-folder-${prop}`

        const diory = await act()

        expect(diory[prop]).toEqual(`some-folder-${prop}`)
      })
    })
  })
})
