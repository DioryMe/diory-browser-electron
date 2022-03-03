import { useSelector, useDispatchActions } from '../../../store'

import { deleteDiory, deleteLinks } from '../../diograph/diographActions'
import { useDiograph } from '../../diograph/useDiograph'
import { inactivateButton } from '../../buttons/buttonsActions'
import { goBackward, selectMemory } from '../../navigation/navigationActions'

import deleteViewFixtureDiograph from './deleteViewFixtureDiograph'

import { useDeleteView } from './useDeleteView'
import constants from '../../../../shared/constants'

window.channelsApi = {
  DELETE_THUMBNAIL: jest.fn(),
  DELETE_DATAOBJECT: jest.fn(),
}

jest.mock('../../../store')
jest.mock('../../diograph/useDiograph')

describe('useDeleteView', () => {
  let mockState
  let deleteThumbnailApiMock
  let deleteDataobjectApiMock
  const mockDispatch = jest.fn()
  beforeEach(() => {
    mockState = {}
    deleteThumbnailApiMock =
      window.channelsApi[constants.channels.DELETE_THUMBNAIL].mockResolvedValue(true)
    deleteDataobjectApiMock =
      window.channelsApi[constants.channels.DELETE_DATAOBJECT].mockResolvedValue(true)
    useSelector.mockImplementation((selector) => selector(mockState))
    useDispatchActions.mockImplementation(() => ({
      dispatch: mockDispatch,
    }))

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

    it('delete link between focusDiory and linkDiory', () => {
      const focusDiory = deleteViewFixtureDiograph.someDioryId
      const linkDiory = deleteViewFixtureDiograph.linkedDioryId1
      useDiograph.mockImplementation(() => ({ story: focusDiory, memory: linkDiory }))

      useDeleteView().onDone()

      expect(mockDispatch).toHaveBeenCalledWith(
        deleteLinks([{ fromDiory: focusDiory, toDiory: linkDiory }])
      )
      expect(mockDispatch).toHaveBeenCalledWith(selectMemory())
      expect(mockDispatch).toHaveBeenCalledTimes(2)
    })

    it('delete focusDiory and all its links', () => {
      const focusDiory = deleteViewFixtureDiograph.someDioryId
      useDiograph.mockImplementation(() => ({ story: focusDiory, memory: focusDiory }))

      useDeleteView().onDone()

      const { linkedDioryId1, bidirectionalLinkedDioryId3, reverseLinkedDioryId2 } =
        mockState.diograph.diograph
      const expectedDeleteLinksArguments = [
        { fromDiory: focusDiory, toDiory: linkedDioryId1 },
        { fromDiory: focusDiory, toDiory: bidirectionalLinkedDioryId3 },
        { fromDiory: reverseLinkedDioryId2, toDiory: focusDiory },
        { fromDiory: bidirectionalLinkedDioryId3, toDiory: focusDiory },
      ]
      expect(mockDispatch).toHaveBeenCalledWith(deleteDiory(focusDiory))
      expect(mockDispatch).toHaveBeenCalledWith(deleteLinks(expectedDeleteLinksArguments))
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      expect(mockDispatch).toHaveBeenCalledWith(selectMemory())
      expect(mockDispatch).toHaveBeenCalledWith(inactivateButton())
      expect(mockDispatch).toHaveBeenCalledTimes(5)

      expect(deleteThumbnailApiMock).toHaveBeenCalledTimes(1)
      expect(deleteThumbnailApiMock).toHaveBeenCalledWith(focusDiory.id)

      expect(deleteDataobjectApiMock).toHaveBeenCalledTimes(1)
      expect(deleteDataobjectApiMock).toHaveBeenCalledWith(focusDiory.data[0].contentUrl)
    })

    it('delete focusDiory without links', () => {
      const focusDiory = deleteViewFixtureDiograph.dioryWithoutLinks
      useDiograph.mockImplementation(() => ({ story: focusDiory, memory: focusDiory }))

      useDeleteView().onDone()

      expect(mockDispatch).toHaveBeenCalledWith(deleteDiory(focusDiory))
      expect(mockDispatch).toHaveBeenCalledWith(deleteLinks([]))
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      expect(mockDispatch).toHaveBeenCalledWith(selectMemory())
      expect(mockDispatch).toHaveBeenCalledWith(inactivateButton())
      expect(mockDispatch).toHaveBeenCalledTimes(5)

      expect(deleteThumbnailApiMock).toHaveBeenCalledTimes(1)
      expect(deleteThumbnailApiMock).toHaveBeenCalledWith(focusDiory.id)

      expect(deleteDataobjectApiMock).toHaveBeenCalledTimes(1)
      expect(deleteDataobjectApiMock).toHaveBeenCalledWith(focusDiory.data[0].contentUrl)
    })
  })
})
