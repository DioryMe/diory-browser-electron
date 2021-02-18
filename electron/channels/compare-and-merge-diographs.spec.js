const fs = require('fs')
const { compareAndMergeDiographs } = require('./compare-and-merge-diographs')

const currentPath = './electron/channels'
const existingDiograph = JSON.parse(fs.readFileSync(`${currentPath}/diograph-existing.json`))
const newDiographSame = JSON.parse(fs.readFileSync(`${currentPath}/diograph-new-same.json`))
const newDiographDioryAdded = JSON.parse(
  fs.readFileSync(`${currentPath}/diograph-new-diory-added.json`)
)

describe('compareAndMergeDiographs', () => {
  let act

  beforeEach(() => {
    act = () => compareAndMergeDiographs('existing-diograph', 'folder-structure-diograph')
  })

  it('works', () => {
    const response = act()
    expect(response).toEqual('existing-diograph')
  })

  it('works with fixture jsons generated from same folder structure', () => {
    const response = compareAndMergeDiographs(existingDiograph, newDiographSame)
    expect(response).toEqual(existingDiograph)
  })

  it('works with fixture jsons generated from changed folder structure (Tampere folder added)', () => {
    const response = compareAndMergeDiographs(existingDiograph, newDiographDioryAdded)
    expect(response).toEqual(existingDiograph)
  })
})
