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
            text: 'someDioryId',
            links: {
              linkedDioryId1: { id: 'linkedDioryId1' },
              bidirectionalLinkedDioryId3: { id: 'bidirectionalLinkedDioryId3' },
            },
          },
          linkedDioryId1: {
            id: 'linkedDioryId1',
            text: 'linkedDioryId1',
          },
          reverseLinkedDioryId2: {
            id: 'reverseLinkedDioryId2',
            text: 'reverseLinkedDioryId2',
            links: {
              someDioryId: { id: 'someDioryId' },
            },
          },
          bidirectionalLinkedDioryId3: {
            id: 'bidirectionalLinkedDioryId3',
            text: 'bidirectionalLinkedDioryId3',
            links: {
              someDioryId: { id: 'someDioryId' },
            },
          },
        },
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

    it('delete bidirectional link between diory and clickedDiory', () => {
      const diory = mockState.diograph.diograph.bidirectionalLinkedDioryId3
      const clickedDiory = mockState.diograph.diograph.someDioryId
      useDeleteDioryAndLinks(diory, clickedDiory).deleteDioryAndLinks()

      expect(mockDispatch).toHaveBeenCalledTimes(2)
      expect(mockDispatch).toHaveBeenCalledWith(deleteLink(diory, clickedDiory))
      expect(mockDispatch).toHaveBeenCalledWith(setInactive())
    })

    it.only('delete diory in focus and all its links', () => {
      const diory = mockState.diograph.diograph.someDioryId
      const { linkedDioryId1 } = mockState.diograph.diograph
      const { bidirectionalLinkedDioryId3 } = mockState.diograph.diograph
      useDeleteDioryAndLinks(diory, diory).deleteDioryAndLinks()

      expect(mockDispatch).toHaveBeenCalledTimes(5)
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      // expect(mockDispatch).toHaveBeenCalledWith(deleteDiory(diory))
      expect(mockDispatch).toHaveBeenCalledWith(deleteLink(diory, linkedDioryId1))
      expect(mockDispatch).toHaveBeenCalledWith(deleteLink(diory, bidirectionalLinkedDioryId3))
      // expect(mockDispatch).toHaveBeenCalledWith(deleteLink(bidirectionalLinkedDioryId3, diory))
      expect(mockDispatch).toHaveBeenCalledWith(setInactive())
    })

    it('delete diory in focus without links', () => {
      const diory = mockState.diograph.diograph.linkedDioryId1
      useDeleteDioryAndLinks(diory, diory).deleteDioryAndLinks()

      expect(mockDispatch).toHaveBeenCalledTimes(3)
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      expect(mockDispatch).toHaveBeenCalledWith(deleteDiory(diory))
      expect(mockDispatch).toHaveBeenCalledWith(setInactive())
    })
  })
})
