const { compareAndMergeDiographs } = require('./compare-and-merge-diographs')

describe('compareAndMergeDiographs', () => {
  let act

  beforeEach(() => {
    act = () => compareAndMergeDiographs('existing-diograph', 'folder-structure-diograph')
  })

  it('works', () => {
    const response = act()
    expect(response).toEqual('existing-diograph')
  })
})
