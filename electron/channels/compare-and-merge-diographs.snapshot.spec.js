const fs = require('fs')
const { compareAndMergeDiographs } = require('./compare-and-merge-diographs')

jest.mock('uuid')

const currentPath = './electron/channels'
const existingDiograph = JSON.parse(fs.readFileSync(`${currentPath}/diograph-existing.json`))
const newDiographSame = JSON.parse(fs.readFileSync(`${currentPath}/diograph-new-same.json`))
const newDiographDioryAdded = JSON.parse(
  fs.readFileSync(`${currentPath}/diograph-new-diory-added.json`)
)

describe('diograph-generator', () => {
  describe('compareAndMergeDiograph', () => {
    it('merges existingDiograph and newDiographSame', async () => {
      const { diograph } = compareAndMergeDiographs(existingDiograph, newDiographSame)
      expect(diograph).toMatchSnapshot()
    })

    it('merges existingDiograph and newDiographDioryAdded', async () => {
      const { diograph } = compareAndMergeDiographs(existingDiograph, newDiographDioryAdded)
      expect(diograph).toMatchSnapshot()
    })
  })
})
