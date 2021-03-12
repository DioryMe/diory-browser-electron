import { useDispatch } from '../../../store'
import { setInactive } from '../../buttons/actions'
import { goBackward } from '../../navigation/actions'
import { deleteDiory, deleteLink } from '../../diograph/actions'

export const useDeleteDioryAndLinks = (diory, clickedDiory) => {
  const dispatch = useDispatch()
  return {
    deleteDioryAndLinks: () => {
      if (diory.id !== clickedDiory.id) {
        dispatch(deleteLink(diory, clickedDiory))
      } else {
        dispatch(goBackward())
        dispatch(deleteDiory(clickedDiory))
      }
      dispatch(setInactive())
    },
  }
}
