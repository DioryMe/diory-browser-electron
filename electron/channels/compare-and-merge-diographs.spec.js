const fs = require('fs')
const { compareAndMergeDiographs } = require('./compare-and-merge-diographs')

const currentPath = './electron/channels'

describe('compareAndMergeDiographs', () => {
  let act

  beforeEach(() => {
    act = () => compareAndMergeDiographs('existing-diograph', 'folder-structure-diograph')
  })

  it('works', () => {
    const response = act()
    expect(response).toEqual('existing-diograph')
  })

  it('works with fixture jsons', () => {
    const existingDiograph = JSON.parse(fs.readFileSync(`${currentPath}/diograph-new.json`))
    const newDiograph = JSON.parse(fs.readFileSync(`${currentPath}/diograph-existing.json`))
    const response = compareAndMergeDiographs(existingDiograph, newDiograph)
    expect(response).toEqual(existingDiograph)
  })
})
