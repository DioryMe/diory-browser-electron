import { useStore } from '../../../store'
import { useMapFilteredDiorys } from './useMapFilteredDiorys'
import { initialState } from '../../../store/initialState'

jest.mock('../../../store')
const mockState = { ...initialState }
useStore.mockImplementation((selector) => [selector(mockState)])

describe('useMapFilteredDiorys', () => {
  it('executes with initial state', () => {
    expect(useMapFilteredDiorys()).toBeDefined()
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
        expect(useMapFilteredDiorys()).toEqual({ insideDioryId: { id: 'insideDioryId' } })
      })
    })
  })
})
