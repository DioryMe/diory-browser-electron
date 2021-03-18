import { useStore, useDispatch } from '../../../store'
import { initialState } from '../../../store/initialState'
import { useDeleteDioryAndLinks } from './useDeleteDioryAndLinks'

import { deleteDiory, deleteLink } from '../../diograph/actions'
import { setInactive } from '../../buttons/actions'
import { goBackward } from '../../navigation/actions'

import deleteViewFixtureDiograph from './deleteViewFixtureDiograph'

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
        diograph: deleteViewFixtureDiograph,
      }
    })

    it('delete link between diory and clickedDiory', () => {
      const diory = mockState.diograph.diograph.someDioryId
      const clickedDiory = mockState.diograph.diograph.linkedDioryId1
      useDeleteDioryAndLinks(diory, clickedDiory).deleteDioryAndLinks()

      expect(mockDispatch).toHaveBeenCalledTimes(2)
      expect(mockDispatch).toHaveBeenCalledWith(deleteLink(diory, clickedDiory))
      expect(mockDispatch).toHaveBeenCalledWith(setInactive())
    })

    // Currently it's not possible to delete bidirectional link with one click
    // - both links have to be deleted individually
    // it('delete bidirectional link between diory and clickedDiory', () => {
    //   const diory = mockState.diograph.diograph.bidirectionalLinkedDioryId3
    //   const clickedDiory = mockState.diograph.diograph.someDioryId
    //   useDeleteDioryAndLinks(diory, clickedDiory).deleteDioryAndLinks()

    //   expect(mockDispatch).toHaveBeenCalledTimes(2)
    //   expect(mockDispatch).toHaveBeenCalledWith(deleteLink(diory, clickedDiory))
    //   expect(mockDispatch).toHaveBeenCalledWith(deleteLink(clickedDiory, diory))
    //   expect(mockDispatch).toHaveBeenCalledWith(setInactive())
    // })

    it('delete diory in focus and all its links', () => {
      const diory = mockState.diograph.diograph.someDioryId
      const {
        linkedDioryId1,
        bidirectionalLinkedDioryId3,
        reverseLinkedDioryId2,
      } = mockState.diograph.diograph
      useDeleteDioryAndLinks(diory, diory).deleteDioryAndLinks()

      expect(mockDispatch).toHaveBeenCalledTimes(7)
      expect(mockDispatch).toHaveBeenCalledWith(deleteDiory(diory))
      expect(mockDispatch).toHaveBeenCalledWith(deleteLink(diory, linkedDioryId1))
      expect(mockDispatch).toHaveBeenCalledWith(deleteLink(diory, bidirectionalLinkedDioryId3))
      expect(mockDispatch).toHaveBeenCalledWith(deleteLink(reverseLinkedDioryId2, diory))
      expect(mockDispatch).toHaveBeenCalledWith(deleteLink(bidirectionalLinkedDioryId3, diory))
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      expect(mockDispatch).toHaveBeenCalledWith(setInactive())
    })

    it('delete diory in focus without links', () => {
      const diory = mockState.diograph.diograph.dioryWithoutLinks
      useDeleteDioryAndLinks(diory, diory).deleteDioryAndLinks()

      expect(mockDispatch).toHaveBeenCalledTimes(3)
      expect(mockDispatch).toHaveBeenCalledWith(deleteDiory(diory))
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      expect(mockDispatch).toHaveBeenCalledWith(setInactive())
    })
  })
})
