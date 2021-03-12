import { useStore, useDispatch } from '../../../store'
import { initialState } from '../../../store/initialState'
import { useDeleteDioryAndLinks } from './useDeleteDioryAndLinks'

import { deleteDiory, deleteLink } from '../../diograph/actions'
import { setInactive } from '../../buttons/actions'
import { goBackward } from '../../navigation/actions'

jest.mock('../../../store')

describe('useDeleteDioryAndLinks', () => {
  let mockState
  const mockDispatch = jest.fn()
  beforeEach(() => {
    mockState = { ...initialState }
    useStore.mockImplementation((selector) => [selector(mockState)])
    useDispatch.mockImplementation(() => mockDispatch)

    const mockedDate = jest.fn(() => ({
      toISOString: () => 'mocked ISO string',
    }))
    jest.spyOn(global, 'Date').mockImplementation(mockedDate)
  })

  // it('executes with initial state', () => {
  //   expect(useDeleteDioryAndLinks()).toBeDefined()
  // })

  describe('given diograph', () => {
    beforeEach(() => {
      mockState.diograph = {
        diograph: {
          someDioryId: {
            id: 'someDioryId',
            links: {
              1: { id: 'linkedDioryId1' },
              2: { id: 'bidirectionalLinkedDioryId3' },
            },
          },
          linkedDioryId1: {
            id: 'linkedDioryId1',
          },
          reverseLinkedDioryId2: {
            id: 'reverseLinkedDioryId2',
            links: {
              1: { id: 'someDioryId' },
            },
          },
          bidirectionalLinkedDioryId3: {
            id: 'bidirectionalLinkedDioryId3',
            links: {
              1: { id: 'someDioryId' },
            },
          },
        },
      }
    })

    it('delete link between diory and clickedDiory', () => {
      const diory = { id: 'someDioryId' }
      const clickedDiory = { id: 'linkedDioryId1' }
      useDeleteDioryAndLinks(diory, clickedDiory).deleteDioryAndLinks()

      expect(mockDispatch).toHaveBeenCalledTimes(2)
      expect(mockDispatch).toHaveBeenCalledWith(deleteLink(diory, clickedDiory))
      expect(mockDispatch).toHaveBeenCalledWith(setInactive())
    })

    it('delete bidirectional link between diory and clickedDiory', () => {
      const diory = { id: 'bidirectionalLinkedDioryId3' }
      const clickedDiory = { id: 'someDioryId' }
      useDeleteDioryAndLinks(diory, clickedDiory).deleteDioryAndLinks()

      expect(mockDispatch).toHaveBeenCalledTimes(2)
      expect(mockDispatch).toHaveBeenCalledWith(deleteLink(diory, clickedDiory))
      expect(mockDispatch).toHaveBeenCalledWith(setInactive())
    })

    it('delete diory in focus and all its links', () => {
      const diory = { id: 'someDioryId' }
      useDeleteDioryAndLinks(diory, diory).deleteDioryAndLinks()

      expect(mockDispatch).toHaveBeenCalledTimes(3)
      // expect(mockDispatch).toHaveBeenCalledTimes(5)
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      expect(mockDispatch).toHaveBeenCalledWith(deleteDiory(diory))
      // expect(mockDispatch).toHaveBeenCalledWith(deleteLink(linkedDiory1, diory))
      // expect(mockDispatch).toHaveBeenCalledWith(deleteLink(bidirectionalLinkedDioryId3, diory))
      expect(mockDispatch).toHaveBeenCalledWith(setInactive())
    })

    it('delete diory in focus without links', () => {
      const diory = { id: 'linkedDioryId1' }
      useDeleteDioryAndLinks(diory, diory).deleteDioryAndLinks()

      expect(mockDispatch).toHaveBeenCalledTimes(3)
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      expect(mockDispatch).toHaveBeenCalledWith(deleteDiory(diory))
      expect(mockDispatch).toHaveBeenCalledWith(setInactive())
    })
  })
})
