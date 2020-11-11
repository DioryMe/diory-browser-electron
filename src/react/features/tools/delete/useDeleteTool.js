import { useDispatch, useStore } from '../../../store'
import { setInactive } from '../../buttons/actions'
import { goBackward } from '../../navigation/actions'
import { deleteDiory, deleteLink } from '../../diograph/actions'
import { useFocusDiory } from '../../diograph/hooks'
import { DELETE_BUTTON } from './buttons'

export const useDeleteTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { diory } = useFocusDiory()
  const dispatch = useDispatch()
  return ({ diory: clickedDiory }) => {
    if (DELETE_BUTTON === active) {
      if (diory.id !== clickedDiory.id) {
        dispatch(deleteLink(diory, clickedDiory))
      } else {
        dispatch(goBackward())
        dispatch(deleteDiory(clickedDiory))
      }
      dispatch(setInactive())
    }
  }
}
