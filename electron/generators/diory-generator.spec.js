const { v4: uuid } = require('uuid')
const { readFolder } = require('../readers/folder-reader')
const { resolveFileType, readFile } = require('../readers/file-reader')
const { readImage } = require('../readers/image-reader')
const { generateFileDiory, generateFolderDiory } = require('./diory-generator')

jest.mock('uuid')
jest.mock('../readers/folder-reader')
jest.mock('../readers/file-reader')
jest.mock('../readers/image-reader')

describe('diory-generator', () => {
  let act

  describe('generateFileDiory', () => {
    let filePath
    let type
    let file
    let image

    it('renders with undefined values', async () => {
      generateFileDiory()
    })

    beforeEach(() => {
      type = undefined
      file = {}
      image = {}
      act = () => {
        resolveFileType.mockReturnValue(type)
        readFile.mockReturnValue(file)
        readImage.mockReturnValue(image)
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

    it('sets uuid to diory id', async () => {
      uuid.mockReturnValue('some-uuid')

      const diory = act()

      expect(diory.id).toEqual('some-uuid')
    })

    describe('given image file', () => {
      beforeEach(() => {
        type = 'image'
        image = {}
      })

      describe('given file data', () => {
        const fileData = ['created', 'modified']

        beforeEach(() => {
          fileData.forEach((prop) => {
            file[prop] = `some-file-${prop}`
          })
        })

        fileData.forEach((prop) => {
          it(`sets file ${prop} to diory ${prop}`, async () => {
            const diory = act()

            expect(diory[prop]).toEqual(`some-file-${prop}`)
          })
        })

        describe('given image data', () => {
          it('reads image', async () => {
            filePath = 'some-imagePath'

            await act()

            expect(readImage).toHaveBeenCalledWith('some-imagePath')
          })

          it('sets uid to diory id', async () => {
            uuid.mockReturnValue('some-uuid')

            const diory = act()

            expect(diory.id).toEqual('some-uuid')
          })

          const imageData = ['image', 'date', 'latitude', 'longitude', 'created', 'modified']

          imageData.forEach((prop) => {
            it(`sets image ${prop} to diory ${prop}`, async () => {
              image[prop] = `some-image-${prop}`

              const diory = act()

              expect(diory[prop]).toEqual(`some-image-${prop}`)
            })
          })
        })
      })
    })

    describe('given other file', () => {
      const fileData = ['text', 'image', 'date', 'latitude', 'longitude', 'created', 'modified']

      fileData.forEach((prop) => {
        it(`sets file ${prop} to diory ${prop}`, async () => {
          file[prop] = `some-file-${prop}`

          const diory = act()

          expect(diory[prop]).toEqual(`some-file-${prop}`)
        })
      })
    })
  })

  describe('generateFolderDiory', () => {
    let folderPath
    let linkedDiorys
    let folder

    it('renders with undefined values', async () => {
      generateFileDiory()
    })

    beforeEach(() => {
      folder = {}
      act = () => {
        readFolder.mockReturnValueOnce(folder)
        return generateFolderDiory(folderPath, linkedDiorys)
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

    it('sets uid to diory id', async () => {
      uuid.mockReturnValue('some-uuid')

      const diory = act()

      expect(diory.id).toEqual('some-uuid')
    })

    it('sets first image from linked diorys', async () => {
      linkedDiorys = [{ some: 'image' }, { image: 'first-image' }, { image: 'second-image' }]

      const diory = act()

      expect(diory.image).toEqual('first-image')
    })

    const folderData = ['text', 'date', 'latitude', 'longitude', 'created', 'modified']

    folderData.forEach((prop) => {
      it(`sets folder ${prop} to diory ${prop}`, async () => {
        folder[prop] = `some-folder-${prop}`

        const diory = act()

        expect(diory[prop]).toEqual(`some-folder-${prop}`)
      })
    })
  })
})
