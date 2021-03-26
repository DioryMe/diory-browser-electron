import { useStore, useDispatch } from '../../../store'
import { initialState } from '../../../store/initialState'
import { useDeleteView } from './useDeleteView'

import { deleteDiory, deleteLinks } from '../../diograph/actions'
import { setOpen, setInactive } from '../../buttons/actions'
import { goBackward, setSelectedLink } from '../../navigation/actions'

import deleteViewFixtureDiograph from './deleteViewFixtureDiograph'

jest.mock('../../../store')

describe('useDeleteView', () => {
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

  describe('given diograph', () => {
    beforeEach(() => {
      mockState.diograph = {
        diograph: deleteViewFixtureDiograph,
      }
    })

    it('delete link between diory and clickedDiory', () => {
      const diory = mockState.diograph.diograph.someDioryId
      const clickedDiory = mockState.diograph.diograph.linkedDioryId1
      useDeleteView(diory, clickedDiory).deleteDioryAndLinks()

      expect(mockDispatch).toHaveBeenCalledTimes(4)
      expect(mockDispatch).toHaveBeenCalledWith(
        deleteLinks([{ fromDiory: diory, toDiory: clickedDiory }])
      )
      expect(mockDispatch).toHaveBeenCalledWith(setInactive())
      expect(mockDispatch).toHaveBeenCalledWith(setSelectedLink())
      expect(mockDispatch).toHaveBeenCalledWith(setOpen(false))
    })

    // Currently it's not possible to delete bidirectional link with one click
    // - both links have to be deleted individually
    // it('delete bidirectional link between diory and clickedDiory', () => {
    //   const diory = mockState.diograph.diograph.bidirectionalLinkedDioryId3
    //   const clickedDiory = mockState.diograph.diograph.someDioryId
    //   useDeleteView(diory, clickedDiory).deleteDioryAndLinks()

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
      useDeleteView(diory, diory).deleteDioryAndLinks()

      const expectedDeleteLinksArguments = [
        { fromDiory: diory, toDiory: linkedDioryId1 },
        { fromDiory: diory, toDiory: bidirectionalLinkedDioryId3 },
        { fromDiory: reverseLinkedDioryId2, toDiory: diory },
        { fromDiory: bidirectionalLinkedDioryId3, toDiory: diory },
      ]

      expect(mockDispatch).toHaveBeenCalledTimes(6)
      expect(mockDispatch).toHaveBeenCalledWith(deleteDiory(diory))
      expect(mockDispatch).toHaveBeenCalledWith(deleteLinks(expectedDeleteLinksArguments))
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      expect(mockDispatch).toHaveBeenCalledWith(setInactive())
      expect(mockDispatch).toHaveBeenCalledWith(setSelectedLink())
      expect(mockDispatch).toHaveBeenCalledWith(setOpen(false))
    })

    it('delete diory in focus without links', () => {
      const diory = mockState.diograph.diograph.dioryWithoutLinks
      useDeleteView(diory, diory).deleteDioryAndLinks()

      expect(mockDispatch).toHaveBeenCalledTimes(6)
      expect(mockDispatch).toHaveBeenCalledWith(deleteDiory(diory))
      expect(mockDispatch).toHaveBeenCalledWith(deleteLinks([]))
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      expect(mockDispatch).toHaveBeenCalledWith(setInactive())
      expect(mockDispatch).toHaveBeenCalledWith(setSelectedLink())
      expect(mockDispatch).toHaveBeenCalledWith(setOpen(false))
    })
  })
})
