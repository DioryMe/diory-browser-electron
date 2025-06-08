import { useDispatchActions } from '../../../store'
import { goBackward, selectMemory } from '../../navigation/navigationActions'
import { deleteDiory, deleteLinks } from '../../diograph/diographActions'
import { inactivateButton } from '../../buttons/buttonsActions'
import { useDeletedDiories } from './view/useDeletedDiories'

export const useDeleteActions = () => {
  const { diory, links } = useDeletedDiories()
  const { dispatch } = useDispatchActions()

  return {
    onDone: () => {
      dispatch(deleteLinks(links))

      if (diory) {
        dispatch(deleteDiory(diory))
        dispatch(goBackward())
        dispatch(inactivateButton())
      }

      dispatch(selectMemory())
    },
    onCancel: () => dispatch(selectMemory()),
  }
}
