import { useDispatch, useStore } from '../../../store'
import { useButtons } from '../../buttons'
import { setInactive } from '../../buttons/actions'
import { goBackward } from '../../navigation/actions'
import { deleteDiory, deleteLink } from '../../diograph/actions'
import { useFocus } from '../../diograph/hooks'
import { buttons, DELETE_TOOL_BUTTON } from './buttons'

export const useDeleteTool = () => {
  useButtons(buttons)

  const [{ active }] = useStore((state) => state.buttons)
  const { diory } = useFocus()
  const dispatch = useDispatch()
  return (clickedDiory) => {
    if (DELETE_TOOL_BUTTON === active) {
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
