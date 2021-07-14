import { resolveReverseDiograph } from './resolveReverseDiograph'

describe('resolveReverseDiograph', () => {
  let diograph
  beforeEach(() => {
    diograph = {}
  })

  describe('given some diory with some link', () => {
    beforeEach(() => {
      diograph['some-diory-id'] = {
        id: 'some-diory-id',
        links: {
          'some-path': {
            id: 'some-link-id',
          },
        },
      }
    })

    describe('given some linked diory in diograph', () => {
      beforeEach(() => {
        diograph['some-link-id'] = {
          id: 'some-link-id',
        }
      })

      it('adds linked diory with link to some diory to reverse diograph', () => {
        expect(resolveReverseDiograph(diograph)).toStrictEqual({
          'some-link-id': {
            id: 'some-link-id',
            links: {
              'some-diory-id': {
                id: 'some-diory-id',
              },
            },
          },
        })
      })

      describe('given linked diory has link to some diory', () => {
        beforeEach(() => {
          diograph['some-link-id'] = {
            id: 'some-link-id',
            links: {
              'some-path': {
                id: 'some-diory-id',
              },
            },
          }
        })

        it('adds linked diory with link to diory to reverse diograph', () => {
          expect(resolveReverseDiograph(diograph)).toStrictEqual({
            'some-link-id': {
              id: 'some-link-id',
              links: {
                'some-diory-id': {
                  id: 'some-diory-id',
                },
              },
            },
            'some-diory-id': {
              id: 'some-diory-id',
              links: {
                'some-link-id': {
                  id: 'some-link-id',
                },
              },
            },
          })
        })
      })
    })
  })

  describe('given two diorys with some link', () => {
    beforeEach(() => {
      diograph['some-diory-id'] = {
        id: 'some-diory-id',
        links: {
          'some-path': {
            id: 'some-link-id',
          },
        },
      }
      diograph['other-diory-id'] = {
        id: 'other-diory-id',
        links: {
          'some-path': {
            id: 'some-link-id',
          },
        },
      }
    })

    describe('given both linked diorys in diograph', () => {
      beforeEach(() => {
        diograph['some-link-id'] = {
          id: 'some-link-id',
        }
        diograph['other-link-id'] = {
          id: 'other-link-id',
        }
      })

      it('adds linked diory with link to two diorys', () => {
        expect(resolveReverseDiograph(diograph)).toStrictEqual({
          'some-link-id': {
            id: 'some-link-id',
            links: {
              'some-diory-id': {
                id: 'some-diory-id',
              },
              'other-diory-id': {
                id: 'other-diory-id',
              },
            },
          },
        })
      })
    })
  })

  describe('given some diory with two links', () => {
    beforeEach(() => {
      diograph['some-diory-id'] = {
        id: 'some-diory-id',
        links: {
          'some-path': {
            id: 'some-link-id',
          },
          'other-path': {
            id: 'other-link-id',
          },
        },
      }
    })

    describe('given both linked diorys in diograph', () => {
      beforeEach(() => {
        diograph['some-link-id'] = {
          id: 'some-link-id',
        }
        diograph['other-link-id'] = {
          id: 'other-link-id',
        }
      })

      it('adds both linked diorys ', () => {
        expect(resolveReverseDiograph(diograph)).toStrictEqual({
          'some-link-id': {
            id: 'some-link-id',
            links: {
              'some-diory-id': {
                id: 'some-diory-id',
              },
            },
          },
          'other-link-id': {
            id: 'other-link-id',
            links: {
              'some-diory-id': {
                id: 'some-diory-id',
              },
            },
          },
        })
      })
    })
  })

  describe('given two diorys with two links', () => {
    beforeEach(() => {
      diograph['some-diory-id'] = {
        id: 'some-diory-id',
        links: {
          'some-path': {
            id: 'some-link-id',
          },
          'other-path': {
            id: 'other-link-id',
          },
        },
      }
      diograph['other-diory-id'] = {
        id: 'other-diory-id',
        links: {
          'some-path': {
            id: 'some-link-id',
          },
          'other-path': {
            id: 'other-link-id',
          },
        },
      }
    })

    describe('given both linked diorys in diograph', () => {
      beforeEach(() => {
        diograph['some-link-id'] = {
          id: 'some-link-id',
        }
        diograph['other-link-id'] = {
          id: 'other-link-id',
        }
      })

      it('adds both linked diorys with links to two diorys', () => {
        expect(resolveReverseDiograph(diograph)).toStrictEqual({
          'some-link-id': {
            id: 'some-link-id',
            links: {
              'some-diory-id': {
                id: 'some-diory-id',
              },
              'other-diory-id': {
                id: 'other-diory-id',
              },
            },
          },
          'other-link-id': {
            id: 'other-link-id',
            links: {
              'some-diory-id': {
                id: 'some-diory-id',
              },
              'other-diory-id': {
                id: 'other-diory-id',
              },
            },
          },
        })
      })
    })
  })
})
