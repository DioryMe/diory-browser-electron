import { useStore, useDispatch } from '../../../store'
import { initialState } from '../../../store/initialState'
import { useDeleteView } from './useDeleteView'

import { deleteDiory, deleteLinks } from '../../diograph/actions'
import { useLinkDiory, useFocus } from '../../diograph/hooks'
import { inactivateButton } from '../../buttons/actions'
import { goBackward, setSelectedLink } from '../../navigation/actions'

import deleteViewFixtureDiograph from './deleteViewFixtureDiograph'

jest.mock('../../../store')
jest.mock('../../diograph/hooks')

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

    it('delete link between focusDiory and linkDiory', () => {
      const focusDiory = deleteViewFixtureDiograph.someDioryId
      const linkDiory = deleteViewFixtureDiograph.linkedDioryId1
      useFocus.mockImplementation(() => ({ diory: focusDiory }))
      useLinkDiory.mockImplementation(() => ({ diory: linkDiory }))

      useDeleteView().onDone()

      expect(mockDispatch).toHaveBeenCalledTimes(2)
      expect(mockDispatch).toHaveBeenCalledWith(
        deleteLinks([{ fromDiory: focusDiory, toDiory: linkDiory }])
      )
      expect(mockDispatch).toHaveBeenCalledWith(setSelectedLink())
    })

    it('delete focusDiory and all its links', () => {
      const focusDiory = deleteViewFixtureDiograph.someDioryId
      useFocus.mockImplementation(() => ({ diory: focusDiory }))
      useLinkDiory.mockImplementation(() => ({ diory: focusDiory }))

      useDeleteView().onDone()

      const {
        linkedDioryId1,
        bidirectionalLinkedDioryId3,
        reverseLinkedDioryId2,
      } = mockState.diograph.diograph
      const expectedDeleteLinksArguments = [
        { fromDiory: focusDiory, toDiory: linkedDioryId1 },
        { fromDiory: focusDiory, toDiory: bidirectionalLinkedDioryId3 },
        { fromDiory: reverseLinkedDioryId2, toDiory: focusDiory },
        { fromDiory: bidirectionalLinkedDioryId3, toDiory: focusDiory },
      ]
      expect(mockDispatch).toHaveBeenCalledTimes(5)
      expect(mockDispatch).toHaveBeenCalledWith(deleteDiory(focusDiory))
      expect(mockDispatch).toHaveBeenCalledWith(deleteLinks(expectedDeleteLinksArguments))
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      expect(mockDispatch).toHaveBeenCalledWith(setSelectedLink())
      expect(mockDispatch).toHaveBeenCalledWith(inactivateButton())
    })

    it('delete focusDiory without links', () => {
      const focusDiory = deleteViewFixtureDiograph.dioryWithoutLinks
      useFocus.mockImplementation(() => ({ diory: focusDiory }))
      useLinkDiory.mockImplementation(() => ({ diory: focusDiory }))

      useDeleteView().onDone()

      expect(mockDispatch).toHaveBeenCalledTimes(5)
      expect(mockDispatch).toHaveBeenCalledWith(deleteDiory(focusDiory))
      expect(mockDispatch).toHaveBeenCalledWith(deleteLinks([]))
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      expect(mockDispatch).toHaveBeenCalledWith(setSelectedLink())
      expect(mockDispatch).toHaveBeenCalledWith(inactivateButton())
    })
  })
})
