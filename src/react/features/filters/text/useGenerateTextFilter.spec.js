import { useStore } from '../../../store'
import { initialState } from '../../../store/initialState'

import { useGenerateTextFilter } from './useGenerateTextFilter'

jest.mock('../../../store')

describe('useGenerateTextFilter', () => {
  let mockState
  beforeEach(() => {
    mockState = { ...initialState }
    useStore.mockImplementation((selector) => [selector(mockState)])
  })

  it('executes with initial state', () => {
    expect(useGenerateTextFilter()).toBeDefined()
  })

  describe('given text filter is active and has query in lower case', () => {
    beforeEach(() => {
      mockState.filters = {
        filters: {
          text: {
            active: true,
            query: 'some',
          },
        },
      }
    })

    describe('given diory text includes query', () => {
      it('returns true', () => {
        const mapFilter = useGenerateTextFilter()
        expect(mapFilter({ text: 'some-text' })).toEqual(true)
      })
    })

    describe('given diory text includes query in uppercase', () => {
      it('returns true', () => {
        const mapFilter = useGenerateTextFilter()
        expect(mapFilter({ text: 'SOME-text' })).toEqual(true)
      })
    })

    describe('given diory have empty text', () => {
      it('returns false', () => {
        const mapFilter = useGenerateTextFilter()
        expect(mapFilter({ text: '' })).toEqual(false)
      })
    })

    describe('given diory do not have text', () => {
      it('returns false', () => {
        const mapFilter = useGenerateTextFilter()
        expect(mapFilter({})).toEqual(false)
      })
    })

    describe('given diory text does not include query', () => {
      it('returns false', () => {
        const mapFilter = useGenerateTextFilter()
        expect(mapFilter({ text: 'other-text' })).toEqual(false)
      })

      describe('given text filter is inactive', () => {
        beforeEach(() => {
          mockState.filters.filters.text.active = false
        })

        it('returns true', () => {
          const mapFilter = useGenerateTextFilter()
          expect(mapFilter({ text: 'some-text' })).toEqual(true)
        })
      })
    })
  })

  describe('given text filter is active and has query in UPPERCASE', () => {
    beforeEach(() => {
      mockState.filters = {
        filters: {
          text: {
            active: true,
            query: 'SOME',
          },
        },
      }
    })

    describe('given diory text includes query in lower case', () => {
      it('returns true', () => {
        const mapFilter = useGenerateTextFilter()
        expect(mapFilter({ text: 'some-text' })).toEqual(true)
      })
    })

    describe('given diory text includes query in uppercase', () => {
      it('returns true', () => {
        const mapFilter = useGenerateTextFilter()
        expect(mapFilter({ text: 'SOME-text' })).toEqual(true)
      })
    })
  })

  describe('given text filter is active and does not have query', () => {
    beforeEach(() => {
      mockState.filters = {
        filters: {
          text: {
            active: true,
          },
        },
      }
    })

    it('returns true', () => {
      const mapFilter = useGenerateTextFilter()
      expect(mapFilter({ text: 'some-text' })).toEqual(true)
    })
  })
})
