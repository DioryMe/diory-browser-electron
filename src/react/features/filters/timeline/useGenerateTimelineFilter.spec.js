import { useStore } from '../../../store'
import { initialState } from '../../../store/initialState'

import { useGenerateTimelineFilter } from './useGenerateTimelineFilter'

jest.mock('../../../store')

describe('useGenerateTimelineFilter', () => {
  let mockState
  beforeEach(() => {
    mockState = { ...initialState }
    useStore.mockImplementation((selector) => [selector(mockState)])
  })

  it('executes with initial state', () => {
    expect(useGenerateTimelineFilter()).toBeDefined()
  })

  describe('given timeline filter is active and has dates', () => {
    beforeEach(() => {
      mockState.filters = {
        filters: {
          timeline: {
            active: true,
            dates: {
              startDate: 10,
              endDate: 20,
            },
          },
        },
      }
    })

    describe('given diory is inside dates', () => {
      it('returns true', () => {
        const timelineFilter = useGenerateTimelineFilter()
        expect(timelineFilter({ date: 15 })).toEqual(true)
      })
    })

    describe('given diory is on start date', () => {
      it('returns true', () => {
        const timelineFilter = useGenerateTimelineFilter()
        expect(timelineFilter({ date: 10 })).toEqual(true)
      })
    })

    describe('given diory is on end date', () => {
      it('returns true', () => {
        const timelineFilter = useGenerateTimelineFilter()
        expect(timelineFilter({ date: 20 })).toEqual(true)
      })
    })

    describe('given diory is before dates', () => {
      it('returns false', () => {
        const timelineFilter = useGenerateTimelineFilter()
        expect(timelineFilter({ date: 5 })).toEqual(false)
      })
    })

    describe('given diory is after dates', () => {
      it('returns false', () => {
        const timelineFilter = useGenerateTimelineFilter()
        expect(timelineFilter({ date: 25 })).toEqual(false)
      })
    })

    describe('given diory do not have date', () => {
      it('returns true', () => {
        const timelineFilter = useGenerateTimelineFilter()
        expect(timelineFilter({})).toEqual(false)
      })
    })

    describe('given timeline filter is inactive', () => {
      beforeEach(() => {
        mockState.filters.filters.timeline.active = false
      })

      it('returns true', () => {
        const timelineFilter = useGenerateTimelineFilter()
        expect(timelineFilter({ date: 25 })).toEqual(true)
      })
    })
  })

  describe('given timeline filter is active and does not have dates', () => {
    beforeEach(() => {
      mockState.filters = {
        filters: {
          timeline: {
            active: true,
          },
        },
      }
    })

    it('returns true', () => {
      const timelineFilter = useGenerateTimelineFilter()
      expect(timelineFilter({ date: 5 })).toEqual(true)
    })
  })
})
