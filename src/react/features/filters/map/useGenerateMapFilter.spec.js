import { useStore, useDispatchActions } from '../../../store'
import { initialState } from '../../../store/initialState'
import { useGenerateMapFilter } from './useGenerateMapFilter'

jest.mock('../../../store')

const mockState = { ...initialState }
useStore.mockImplementation((selector) => [selector(mockState)])
useDispatchActions.mockReturnValue({})

describe('useGenerateMapFilter', () => {
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
        expect(mapFilter({ latitude: 5, longitude: 5 }))
          .toEqual(true)
      })
    })

    describe('given diory is on bounds', () => {
      it('returns true', () => {
        const mapFilter = useGenerateMapFilter()
        expect(mapFilter({ latitude: 0, longitude: 10 }))
          .toEqual(true)
      })
    })

    describe('given diory is outside bounds', () => {
      it('returns false', () => {
        const mapFilter = useGenerateMapFilter()
        expect(mapFilter({ latitude: 15, longitude: 15 }))
          .toEqual(false)
      })

      describe('given map filter is inactive', () => {
        beforeEach(() => {
          mockState.filters.filters.map.active = false
        })

        it('returns true', () => {
          const mapFilter = useGenerateMapFilter()
          expect(mapFilter({ latitude: 15, longitude: 15 }))
            .toEqual(true)
        })
      })
    })

    describe('given diory do not have latitude', () => {
      it('returns true', () => {
        const mapFilter = useGenerateMapFilter()
        expect(mapFilter({ longitude: 15 }))
          .toEqual(false)
      })
    })

    describe('given diory do not have longitude', () => {
      it('returns true', () => {
        const mapFilter = useGenerateMapFilter()
        expect(mapFilter({ latitude: 15 }))
          .toEqual(false)
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
      expect(mapFilter({ latitude: 5, longitude: 5 }))
        .toEqual(true)
    })
  })
})