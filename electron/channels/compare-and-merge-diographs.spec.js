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
    expect(response.map((p) => p.path)).toEqual(['/Tampere'])
    // const tampereId = "af15ae0f-73ee-444d-8113-b8f2e32f07a1"
    // const tampereDiory = { [tampereId]: newDiographDioryAdded[tampereId] }
    // expect(response.diograph).toEqual({ ...existingDiograph.diograph, ...tampereDiory })
    // expect(response.rootId).toEqual(existingDiograph.rootId)
  })
})
