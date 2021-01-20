import { useStore } from '../../../store'
import { initialState } from '../../../store/initialState'

import { useGraphFilteredDiorys } from './useGraphFilteredDiorys'

jest.mock('../../../store')
const mockState = { ...initialState }
useStore.mockImplementation((selector) => [selector(mockState)])

describe('useGraphFilter', () => {
  it('executes with initial state', () => {
    expect(useGraphFilteredDiorys()).toBeDefined()
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
        [0, 'false', false],
        [
          1,
          '2 diorys',
          {
            linkedDioryId1: { id: 'linkedDioryId1' },
            linkedDioryId2: { id: 'linkedDioryId2' },
          },
        ],
        [
          2,
          '6 diorys',
          {
            linkedDioryId1: { id: 'linkedDioryId1' },
            linkedDioryId2: { id: 'linkedDioryId2' },
            linkedDioryId11: { id: 'linkedDioryId11' },
            linkedDioryId12: { id: 'linkedDioryId12' },
            linkedDioryId21: { id: 'linkedDioryId21' },
            linkedDioryId22: { id: 'linkedDioryId22' },
          },
        ],
        [
          3,
          '6 diorys',
          {
            linkedDioryId1: { id: 'linkedDioryId1' },
            linkedDioryId2: { id: 'linkedDioryId2' },
            linkedDioryId11: { id: 'linkedDioryId11' },
            linkedDioryId12: { id: 'linkedDioryId12' },
            linkedDioryId21: { id: 'linkedDioryId21' },
            linkedDioryId22: { id: 'linkedDioryId22' },
          },
        ],
        [
          4,
          '6 diorys',
          {
            linkedDioryId1: { id: 'linkedDioryId1' },
            linkedDioryId2: { id: 'linkedDioryId2' },
            linkedDioryId11: { id: 'linkedDioryId11' },
            linkedDioryId12: { id: 'linkedDioryId12' },
            linkedDioryId21: { id: 'linkedDioryId21' },
            linkedDioryId22: { id: 'linkedDioryId22' },
          },
        ],
      ]

      graphFilterReturnsExpected.forEach(([grid, returns, expectedDioryIds]) => {
        describe(`given grid filter ${grid}`, () => {
          beforeEach(() => {
            mockState.filters = {
              active: { grid: true },
              filters: { grid },
            }
          })

          it(`returns ${returns}`, () => {
            expect(useGraphFilteredDiorys()).toEqual(expectedDioryIds)
          })
        })
      })
    })

    describe('given no focus', () => {
      beforeEach(() => {
        mockState.navigation = { focus: undefined }
      })

      describe('given grid filter', () => {
        beforeEach(() => {
          mockState.filters.filter = { grid: 1 }
        })

        it('returns false', () => {
          expect(useGraphFilteredDiorys()).toEqual(false)
        })
      })

      describe('given no grid filter', () => {
        beforeEach(() => {
          mockState.filters.filters = {}
        })

        it('returns false', () => {
          expect(useGraphFilteredDiorys()).toEqual(false)
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
          mockState.filters.filters = { grid: 3 }
        })

        it('returns diory only once', () => {
          expect(useGraphFilteredDiorys()).toEqual({
            otherDioryId: {
              id: 'otherDioryId',
            },
            someDioryId: {
              id: 'someDioryId',
            },
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
          mockState.filters.filters = { grid: 1 }
        })

        it('returns false', () => {
          expect(useGraphFilteredDiorys()).toEqual(false)
        })
      })
    })
  })
})
