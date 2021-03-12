import { useStore } from '../../../store'
import { initialState } from '../../../store/initialState'

import { useDeleteDioryAndLinks } from './useDeleteDioryAndLinks'

jest.mock('../../../store')

describe('useGraphFilter', () => {
  let mockState
  beforeEach(() => {
    mockState = { ...initialState }
    useStore.mockImplementation((selector) => [selector(mockState)])
  })

  it('executes with initial state', () => {
    expect(useDeleteDioryAndLinks()).toBeDefined()
  })
})
