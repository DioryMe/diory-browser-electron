import { useStore } from '../../../store'
import { initialState } from '../../../store/initialState'

import { useGenerateGraphFilter } from './useGenerateGraphFilter'

jest.mock('../../../store')
const mockState = { ...initialState }
useStore.mockImplementation((selector) => [selector(mockState)])

describe('useGraphFilter', () => {
  it('executes with initial state', () => {
    expect(useGenerateGraphFilter()).toBeDefined()
  })

  describe('given diograph', () => {
    beforeEach(() => {
      mockState.diograph = {
        diograph: {
          someDioryId: {
            id: 'someDioryId',
            links: {
              1: { id: 'linkedDioryId1' },
              2: { id: 'linkedDioryId2' },
            },
          },
          linkedDioryId1: {
            id: 'linkedDioryId1',
            links: {
              1: { id: 'linkedDioryId11' },
              2: { id: 'linkedDioryId12' },
            },
          },
          linkedDioryId2: {
            id: 'linkedDioryId2',
            links: {
              1: { id: 'linkedDioryId21' },
              2: { id: 'linkedDioryId22' },
            },
          },
        },
      }
    })

    describe('given diory in focus', () => {
      beforeEach(() => {
        mockState.navigation = { focus: 'someDioryId' }
      })

      const graphFilterReturnsExpected = [
        [0, ['someDioryId'], ['linkedDioryId1', 'linkedDioryId11', 'linkedDioryId21']],
        [
          1,
          ['someDioryId', 'linkedDioryId1', 'linkedDioryId2'],
          ['linkedDioryId11', 'linkedDioryId21', 'linkedDioryId22'],
        ],
        [
          2,
          [
            'someDioryId',
            'linkedDioryId1',
            'linkedDioryId2',
            'linkedDioryId11',
            'linkedDioryId12',
            'linkedDioryId21',
            'linkedDioryId22',
          ],
          [],
        ],
        [
          3,
          [
            'someDioryId',
            'linkedDioryId1',
            'linkedDioryId2',
            'linkedDioryId11',
            'linkedDioryId12',
            'linkedDioryId21',
            'linkedDioryId22',
          ],
          [],
        ],
      ]

      graphFilterReturnsExpected.forEach(([zoom, includedIds, excludedIds]) => {
        describe(`given grid filter ${zoom}`, () => {
          beforeEach(() => {
            mockState.filters = {
              filters: { grid: { zoom, active: true } },
            }
          })

          includedIds.forEach((id) => {
            it(`includes ${id}`, () => {
              expect(useGenerateGraphFilter()({ id })).toEqual(true)
            })
          })

          excludedIds.forEach((id) => {
            it(`excludes ${id}`, () => {
              expect(useGenerateGraphFilter()({ id })).toEqual(false)
            })
          })
        })
      })
    })

    describe('given no focus', () => {
      beforeEach(() => {
        mockState.navigation = { focus: undefined }
      })

      describe('given active grid filter', () => {
        beforeEach(() => {
          mockState.filters = {
            filters: { grid: { zoom: 1, active: true } },
          }
        })

        it('returns false', () => {
          expect(useGenerateGraphFilter()({})).toEqual(false)
        })
      })

      describe('given inactive grid filter', () => {
        beforeEach(() => {
          mockState.filters = {
            filters: { grid: { zoom: 1, active: false } },
          }
        })

        it('returns false', () => {
          expect(useGenerateGraphFilter()({})).toEqual(true)
        })
      })

      describe('given no grid filter', () => {
        beforeEach(() => {
          mockState.filters = {
            filters: {},
          }
        })

        it('returns false', () => {
          expect(useGenerateGraphFilter()({})).toEqual(true)
        })
      })
    })
  })

  describe('given diograph with cycles', () => {
    beforeEach(() => {
      mockState.diograph = {
        diograph: {
          someDioryId: {
            id: 'someDioryId',
            links: {
              someDioryId: {
                id: 'someDioryId',
              },
              otherDioryId: {
                id: 'otherDioryId',
              },
            },
          },
          otherDioryId: {
            id: 'otherDioryId',
            links: {
              someDioryId: {
                id: 'someDioryId',
              },
            },
          },
        },
      }
    })

    describe('given diory in focus', () => {
      beforeEach(() => {
        mockState.navigation = { focus: 'someDioryId' }
      })

      describe('given grid filter', () => {
        beforeEach(() => {
          mockState.filters = {
            filters: {
              grid: { zoom: 3, active: true },
            },
          }
        })

        const dioryIdsInCycle = ['someDioryId', 'otherDioryId']
        dioryIdsInCycle.forEach((id) => {
          it('returns true for diorys included in cycle', () => {
            expect(useGenerateGraphFilter()({ id })).toEqual(true)
          })
        })
      })
    })
  })

  describe('given empty diograph', () => {
    beforeEach(() => {
      mockState.diograph = { diograph: {} }
    })

    describe('given diory in focus', () => {
      beforeEach(() => {
        mockState.navigation = { focus: 'someDioryId' }
      })

      describe('given grid filter', () => {
        beforeEach(() => {
          mockState.filters = {
            filters: {
              grid: { zoom: 1, active: true },
            },
          }
        })

        it('returns false', () => {
          expect(useGenerateGraphFilter()({})).toEqual(false)
        })
      })
    })
  })
})
