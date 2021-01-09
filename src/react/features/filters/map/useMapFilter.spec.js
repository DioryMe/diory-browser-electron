import { useStore } from '../../../store'
import { useMapFilter } from './useMapFilter'
import { initialState } from '../../../store/initialState'

jest.mock('../../../store')
const mockState = { ...initialState }
useStore.mockImplementation((selector) => [selector(mockState)])

describe('useMapFilter', () => {
  it('executes with initial state', () => {
    expect(useMapFilter()).toBeDefined()
  })

  describe('given diograph', () => {
    beforeEach(() => {
      mockState.diograph = {
        diograph: {
          insideDioryId: {
            id: 'insideDioryId',
            latitude: 5,
            longitude: 5,
          },
          outsideDioryId1: {
            id: 'outsideDioryId1',
            latitude: 15,
            longitude: 15,
          },
        },
      }
    })

    describe('given map filter is active and diory is inside bounds', () => {
      beforeEach(() => {
        mockState.filters = {
          active: { map: true },
          filters: {
            map: [
              [0, 0],
              [10, 10],
            ],
          },
        }
      })

      it('returns diory inside bounds', () => {
        expect(useMapFilter()).toEqual({ insideDioryId: { id: 'insideDioryId' } })
      })
    })
  })
})
