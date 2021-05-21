import { useStore } from '../../../store'
import { initialState } from '../../../store/initialState'

import { useGenerateMapFilter } from './useGenerateMapFilter'

jest.mock('../../../store')

describe('useGenerateMapFilter', () => {
  let mockState
  beforeEach(() => {
    mockState = { ...initialState }
    useStore.mockImplementation((selector) => [selector(mockState)])
  })

  it('executes with initial state', () => {
    expect(useGenerateMapFilter()).toBeDefined()
  })

  describe('given map filter is active and has bounds', () => {
    beforeEach(() => {
      mockState.filters = {
        filters: {
          map: {
            active: true,
            bounds: [
              [0, 0],
              [10, 10],
            ],
          },
        },
      }
    })

    describe('given diory is inside bounds', () => {
      it('returns true', () => {
        const mapFilter = useGenerateMapFilter()
        expect(mapFilter({ latlng: '5, 5' })).toEqual(true)
      })
    })

    describe('given diory is on bounds', () => {
      it('returns true', () => {
        const mapFilter = useGenerateMapFilter()
        expect(mapFilter({ latlng: '0, 10' })).toEqual(true)
      })
    })

    describe('given diory is outside bounds', () => {
      it('returns false', () => {
        const mapFilter = useGenerateMapFilter()
        expect(mapFilter({ latlng: '15, 15' })).toEqual(false)
      })

      describe('given map filter is inactive', () => {
        beforeEach(() => {
          mockState.filters.filters.map.active = false
        })

        it('returns true', () => {
          const mapFilter = useGenerateMapFilter()
          expect(mapFilter({ latlng: '15, 15' })).toEqual(true)
        })
      })
    })
  })

  describe('given map filter is active and does not have bounds', () => {
    beforeEach(() => {
      mockState.filters = {
        filters: {
          map: {
            active: true,
          },
        },
      }
    })

    it('returns true', () => {
      const mapFilter = useGenerateMapFilter()
      expect(mapFilter({ latlng: '5, 5' })).toEqual(true)
    })
  })
})
