import { generateFileLink, generateFolderLink } from './link-generator'

describe('link-generator', () => {
  let act

  describe('generateFileLink', () => {
    let filePath
    let diory

    beforeEach(() => {
      diory = {}
      act = () => {
        return generateFileLink(filePath, diory)
      }
    })

    describe('given file path', () => {
      beforeEach(() => {
        filePath = 'some-filePath/some-fileName'
      })

      it('sets file name as link key', () => {
        const link = act()

        expect(link['some-fileName']).toBeDefined()
      })

      it('sets diory id as link id', () => {
        diory.id = 'some-diory-id'

        const link = act()

        expect(link['some-fileName'].id).toEqual('some-diory-id')
      })
    })
  })

  describe('generateFolderLink', () => {
    let folderPath
    let diory

    beforeEach(() => {
      diory = {}
      act = () => {
        return generateFolderLink(folderPath, diory)
      }
    })

    describe('given folder path', () => {
      beforeEach(() => {
        folderPath = 'some-folderPath/some-folderName'
      })

      it('sets folder name as link key', () => {
        const link = act()

        expect(link['some-folderName']).toBeDefined()
      })

      it('sets diory id as link id', () => {
        diory.id = 'some-diory-id'

        const link = act()

        expect(link['some-folderName'].id).toEqual('some-diory-id')
      })
    })
  })
})
