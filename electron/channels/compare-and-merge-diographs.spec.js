const fs = require('fs')
const { compareAndMergeDiographs } = require('./compare-and-merge-diographs')

const currentPath = './electron/channels'
const existingDiograph = JSON.parse(fs.readFileSync(`${currentPath}/diograph-existing.json`))
const newDiographSame = JSON.parse(fs.readFileSync(`${currentPath}/diograph-new-same.json`))
const newDiographDioryAdded = JSON.parse(
  fs.readFileSync(`${currentPath}/diograph-new-diory-added.json`)
)

describe('compareAndMergeDiographs', () => {
  it('works with fixture jsons generated from same folder structure', () => {
    const response = compareAndMergeDiographs(existingDiograph, newDiographSame)
    expect(response.diograph).toEqual(existingDiograph.diograph)
    expect(response.rootId).toEqual(existingDiograph.rootId)
  })

  it('works with fixture jsons generated from changed folder structure (Tampere folder added)', () => {
    const response = compareAndMergeDiographs(existingDiograph, newDiographDioryAdded)
    const tampereId = '43563e8d-9599-46b7-b011-a90450fe4c81'
    const tampereDiory = { [tampereId]: newDiographDioryAdded.diograph[tampereId] }
    expect(response.diograph).toEqual({ ...existingDiograph.diograph, ...tampereDiory })
    expect(response.rootId).toEqual(existingDiograph.rootId)
    expect(response.diograph[response.rootId].links.Tampere).toEqual({ id: tampereId })
  })
})
