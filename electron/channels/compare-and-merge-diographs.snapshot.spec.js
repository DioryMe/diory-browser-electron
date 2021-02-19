const fs = require('fs')
const { compareAndMergeDiographs } = require('./compare-and-merge-diographs')

// Load static json fixtures
const currentPath = './electron/channels'
const originalDiograph = JSON.parse(fs.readFileSync(`${currentPath}/diograph-existing.json`))
const newDiographSame = JSON.parse(fs.readFileSync(`${currentPath}/diograph-new-same.json`))
const newDiographAddedDiories = JSON.parse(
  fs.readFileSync(`${currentPath}/diograph-new-added-diories.json`)
)

describe('diograph-generator', () => {
  describe('compareAndMergeDiograph', () => {
    it('merges originalDiograph and newDiographSame', async () => {
      const diograph = compareAndMergeDiographs(originalDiograph, newDiographSame)
      expect(diograph).toMatchSnapshot()
    })

    it('merges originalDiograph and newDiographAddedDiories', async () => {
      const diograph = compareAndMergeDiographs(originalDiograph, newDiographAddedDiories)
      expect(diograph).toMatchSnapshot()
    })
  })
})
