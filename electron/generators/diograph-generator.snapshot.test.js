const { join } = require('path')
const uuid = require('uuid')
const { generateDiograph } = require('./diograph-generator')

jest.mock('uuid')

describe('diograph-generator', () => {
  let act

  describe('generateDiograph', () => {
    let folderPath
    let paths
    let folderDiory

    it('generates diograph', async () => {
      ;[...Array(10).keys()].forEach(id => {
        uuid.mockReturnValueOnce(`uuid-${id}`)
      })

      const { diograph } = await generateDiograph(join(__dirname, '../readers/example-folder'))

      expect(diograph).toMatchSnapshot()
    })
  })
})
