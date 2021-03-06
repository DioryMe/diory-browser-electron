const { generateLink } = require('./link-generator')

describe('link-generator', () => {
  let act

  describe('generateLink for file', () => {
    let filePath
    let diory

    beforeEach(() => {
      diory = {}
      act = () => generateLink(filePath, diory)
    })

    describe('given file path and diory id', () => {
      beforeEach(() => {
        filePath = 'some-filePath/some-fileName'
        diory.id = 'some-diory-id'
      })

      it('sets file name as link key', () => {
        const link = act()

        expect(link['some-fileName']).toBeDefined()
      })

      it('sets diory id as link id', () => {
        const link = act()

        expect(link['some-fileName'].id).toEqual('some-diory-id')
      })
    })
  })

  describe('generateLink for folder', () => {
    let folderPath
    let diory

    beforeEach(() => {
      diory = {}
      act = () => generateLink(folderPath, diory)
    })

    describe('given folder path and diory id', () => {
      beforeEach(() => {
        folderPath = 'some-folderPath/some-folderName'
        diory.id = 'some-diory-id'
      })

      it('sets folder name as link key', () => {
        const link = act()

        expect(link['some-folderName']).toBeDefined()
      })

      it('sets diory id as link id', () => {
        const link = act()

        expect(link['some-folderName'].id).toEqual('some-diory-id')
      })
    })
  })
})
