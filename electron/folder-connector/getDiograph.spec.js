const path = require('path').posix
const { getDiograph } = require('./getDiograph')
const { readDiographJson } = require('./readDiographJson')

const someDiograph = {
  diograph: {
    'some-diory': { id: 'some-diory' },
  },
  rootId: 'some-diory',
}
jest.mock('./readDiographJson')

describe('getDiograph', () => {
  beforeEach(() => {
    readDiographJson.mockImplementation(() => someDiograph)
  })

  describe('returns readDiographJson return value', () => {
    it('valid diory folder location', async () => {
      const dioryFolderLocation = './public/diory-demo-content'

      const response = await getDiograph(dioryFolderLocation)

      const diographJsonPath = path.join(dioryFolderLocation, 'diograph.json')
      expect(readDiographJson).toHaveBeenCalledTimes(1)
      expect(readDiographJson).toHaveBeenCalledWith({ diographJsonPath })
      expect(response).toEqual(someDiograph)
    })
  })

  describe('throws error', () => {
    it('folder without diograph.json', async () => {
      const dioryFolderLocation = './electron/readers/example-folder'

      const callGetDiograph = async () => getDiograph(dioryFolderLocation)
      expect(callGetDiograph).rejects.toThrowError(/didn't contain/)
    })

    it('invalid path', () => {
      const invalidDioryFolderLocation = './some/invalid/path'

      const callGetDiograph = async () => getDiograph(invalidDioryFolderLocation)
      expect(callGetDiograph).rejects.toThrowError(/didn't exist/)
    })
  })
})
