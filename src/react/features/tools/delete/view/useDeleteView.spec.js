import { useSelector, useDispatchActions } from '../../../../store'

import { deleteDiory, deleteLinks } from '../../../diograph/diographActions'
import { goBackward, selectMemory } from '../../../navigation/navigationActions'
import { useDiories } from '../../../diograph/utils/useDiories'
import { useContextDiories } from '../../../diograph/utils/useContextDiories'
import { inactivateButton } from '../../../buttons/buttonsActions'

import deleteViewFixtureDiograph from '../__fixtures__/deleteViewFixtureDiograph'

import { useDeleteView } from './useDeleteView'

jest.mock('../../../../store')
jest.mock('../../../diograph/utils/useDiories')
jest.mock('../../../diograph/utils/useContextDiories')
jest.mock('../../../diograph/diographActions')

describe('useDeleteView', () => {
  let mockState
  const mockDispatch = jest.fn()
  beforeEach(() => {
    mockState = {}
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
      useDiories.mockImplementation(() => ({ story: focusDiory, memory: linkDiory }))
      useContextDiories.mockImplementation(() => ({}))

      useDeleteView().onDone()

      expect(deleteLinks).toHaveBeenCalledWith([{ fromDiory: focusDiory, toDiory: linkDiory }])
      expect(mockDispatch).toHaveBeenCalledWith(selectMemory())
      expect(mockDispatch).toHaveBeenCalledTimes(2)
    })

    it('delete focusDiory and all its links', () => {
      const focusDiory = deleteViewFixtureDiograph.someDioryId
      const linkDiory = deleteViewFixtureDiograph.linkedDioryId1
      const context1 = deleteViewFixtureDiograph.reverseLinkedDioryId2
      const context2 = deleteViewFixtureDiograph.bidirectionalLinkedDioryId3
      useDiories.mockImplementation(() => ({
        story: focusDiory,
        memory: focusDiory,
        memories: [linkDiory, context2],
      }))
      useContextDiories.mockImplementation(() => ({
        contexts: [context1, context2],
      }))

      useDeleteView().onDone()

      const { linkedDioryId1, bidirectionalLinkedDioryId3, reverseLinkedDioryId2 } =
        mockState.diograph.diograph
      const expectedDeleteLinksArguments = [
        { fromDiory: focusDiory, toDiory: linkedDioryId1 },
        { fromDiory: focusDiory, toDiory: bidirectionalLinkedDioryId3 },
        { fromDiory: reverseLinkedDioryId2, toDiory: focusDiory },
        { fromDiory: bidirectionalLinkedDioryId3, toDiory: focusDiory },
      ]
      expect(deleteDiory).toHaveBeenCalledWith(focusDiory)
      expect(deleteLinks).toHaveBeenCalledWith(expectedDeleteLinksArguments)
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      expect(mockDispatch).toHaveBeenCalledWith(selectMemory())
      expect(mockDispatch).toHaveBeenCalledWith(inactivateButton())
      expect(mockDispatch).toHaveBeenCalledTimes(5)
    })

    it('delete focusDiory without links', () => {
      const focusDiory = deleteViewFixtureDiograph.dioryWithoutLinks
      useDiories.mockImplementation(() => ({ story: focusDiory, memory: focusDiory }))
      useContextDiories.mockImplementation(() => ({}))

      useDeleteView().onDone()

      expect(deleteDiory).toHaveBeenCalledWith(focusDiory)
      expect(deleteLinks).toHaveBeenCalledWith([])
      expect(mockDispatch).toHaveBeenCalledWith(goBackward())
      expect(mockDispatch).toHaveBeenCalledWith(selectMemory())
      expect(mockDispatch).toHaveBeenCalledWith(inactivateButton())
      expect(mockDispatch).toHaveBeenCalledTimes(5)
    })
  })
})
