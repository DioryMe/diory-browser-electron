import { useStore } from '../../../store'
import { useGraphFilter } from './useGraphFilter'

jest.mock('../../../store')
const mockState = {
  diograph: {},
  navigation: {},
  filters: {},
}
useStore.mockImplementation((selector) => [selector(mockState)])

describe('useGraphFilter', () => {
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
        [0, 'false', false],
        [1, '2 diorys', ['linkedDioryId1', 'linkedDioryId2']],
        [
          2,
          '6 diorys',
          [
            'linkedDioryId1',
            'linkedDioryId2',
            'linkedDioryId11',
            'linkedDioryId12',
            'linkedDioryId21',
            'linkedDioryId22',
          ],
        ],
      ]

      graphFilterReturnsExpected.forEach(([graph, returns, expectedDioryIds]) => {
        describe(`given graph filter ${graph}`, () => {
          beforeEach(() => {
            mockState.filters = { filters: { graph } }
          })

          it(`returns ${returns}`, () => {
            expect(useGraphFilter()).toEqual(expectedDioryIds)
          })
        })
      })
    })

    describe('given no focus', () => {
      beforeEach(() => {
        mockState.navigation = { focus: undefined }
      })

      describe('given graph filter', () => {
        beforeEach(() => {
          mockState.filters = { filters: { graph: 1 } }
        })

        it('returns false', () => {
          expect(useGraphFilter()).toEqual(false)
        })
      })

      describe('given no graph filter', () => {
        beforeEach(() => {
          mockState.filters = { filters: {} }
        })

        it('returns false', () => {
          expect(useGraphFilter()).toEqual(false)
        })
      })
    })
  })

  describe('given no diograph', () => {
    beforeEach(() => {
      mockState.diograph = { diograph: {} }
    })

    describe('given diory in focus', () => {
      beforeEach(() => {
        mockState.navigation = { focus: 'someDioryId' }
      })

      describe('given graph filter', () => {
        beforeEach(() => {
          mockState.filters = { filters: { graph: 1 } }
        })

        it('returns false', () => {
          expect(useGraphFilter()).toEqual(false)
        })
      })
    })
  })
})
