import { useStore } from '../../../store'
import { useTimelineFilteredDiorys } from './useTimelineFilteredDiorys'
import { initialState } from '../../../store/initialState'

jest.mock('../../../store')
const mockState = { ...initialState }
useStore.mockImplementation((selector) => [selector(mockState)])

describe('useMapFilteredDiorys', () => {
  it('executes with initial state', () => {
    expect(useTimelineFilteredDiorys()).toBeDefined()
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
        expect(useTimelineFilteredDiorys()).toEqual({ insideDioryId: { id: 'insideDioryId' } })
      })
    })
  })
})
