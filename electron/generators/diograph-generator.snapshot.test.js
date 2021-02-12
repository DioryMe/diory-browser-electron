const { join } = require('path')
// const glob = require('glob')
// const { v4: uuid } = require('uuid')

const { generateDiograph } = require('./diograph-generator')

// jest.mock('uuid')

// function getNumberOfFilesAndFolders(path) {
//   return glob.sync(join(path, '/**/*')).length
// }

// function getArray(length) {
//   return [...Array(length).keys()]
// }

describe('diograph-generator', () => {
  describe('generateDiograph', () => {
    it('generates diograph from example folder', async () => {
      const exampleFolderPath = join(__dirname, '../readers/example-folder')
      // const amountOfCases = getNumberOfFilesAndFolders(exampleFolderPath) + 1
      // getArray(amountOfCases).forEach((id) => {
      //   uuid.mockReturnValueOnce(`uuid-${id}`)
      // })

      const diograph = await generateDiograph(exampleFolderPath)

      expect(diograph).toMatchSnapshot()
    })
  })
})
