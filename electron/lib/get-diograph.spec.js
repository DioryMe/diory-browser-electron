const path = require('path').posix
const { getDiograph } = require('./get-diograph')
const { readDiographJson } = require('./read-diograph-json')

jest.mock('../lib/read-diograph-json')

describe('getDiograph', () => {
  // Mock readDiographJson
  // const mockedReadDiographJsonValue = { diograph: {}, rootId: 'some-diory' }

  describe('returns readDiographJson return value', () => {
    it('valid diory folder location', () => {
      const dioryFolderLocation = './public/diory-demo-content'

      // const response = await getDiograph(dioryFolderLocation)
      getDiograph(dioryFolderLocation)

      const diographJsonPath = path.join(dioryFolderLocation, 'diograph.json')
      expect(readDiographJson).toHaveBeenCalledTimes(1)
      expect(readDiographJson).toHaveBeenCalledWith({ diographJsonPath })

      // expect(response).toEqual(mockedReadDiographJsonValue)
    })
  })

  describe('throws error', () => {
    it('folder without diograph.json', () => {
      const dioryFolderLocation = './electron/readers/example-folder'

      const callGetDiograph = () => getDiograph(dioryFolderLocation)
      expect(callGetDiograph).toThrow(/didn't contain/)
    })

    it('invalid path', () => {
      const invalidDioryFolderLocation = './some/invalid/path'

      const callGetDiograph = () => getDiograph(invalidDioryFolderLocation)
      expect(callGetDiograph).toThrow(/didn't exist/)
    })
  })
})
