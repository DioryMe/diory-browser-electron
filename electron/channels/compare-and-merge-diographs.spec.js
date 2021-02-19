const fs = require('fs')
const { compareAndMergeDiographs } = require('./compare-and-merge-diographs')

// Load static json fixtures
const currentPath = './electron/channels'
const originalDiograph = JSON.parse(fs.readFileSync(`${currentPath}/diograph-existing.json`))
const newDiographSame = JSON.parse(fs.readFileSync(`${currentPath}/diograph-new-same.json`))
const newDiographAddedDiories = JSON.parse(
  fs.readFileSync(`${currentPath}/diograph-new-added-diories.json`)
)

describe('compareAndMergeDiographs', () => {
  describe('GIVEN diograph generated from same folder structure', () => {
    it('returns original diograph', () => {
      const response = compareAndMergeDiographs(originalDiograph, newDiographSame)
      expect(response).toEqual(originalDiograph)
      expect(response.diograph).toEqual(originalDiograph.diograph)
      expect(response.rootId).toEqual(originalDiograph.rootId)
    })
  })

  describe('GIVEN diograph with added diories', () => {
    it('works with fixture jsons generated from changed folder structure (Tampere folder added)', () => {
      const response = compareAndMergeDiographs(originalDiograph, newDiographAddedDiories)
      const tampereId = '43563e8d-9599-46b7-b011-a90450fe4c81'
      const tampereDiory = { [tampereId]: newDiographAddedDiories.diograph[tampereId] }
      expect(response.diograph).toEqual({ ...originalDiograph.diograph, ...tampereDiory })
      expect(response.rootId).toEqual(originalDiograph.rootId)
      expect(response.diograph[response.rootId].links.Tampere).toEqual({ id: tampereId })
    })
  })
})
