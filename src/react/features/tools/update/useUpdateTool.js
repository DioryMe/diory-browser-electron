import { useDispatchActions, useSelector } from '../../../store'
import { useButtons } from '../../buttons/useButtons'
import { selectMemory } from '../../navigation/navigationActions'
import { buttons, UPDATE_TOOL_BUTTON } from './buttons'

export const useUpdateTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const { dispatch } = useDispatchActions()
  return (clickedDiory) => {
    if (UPDATE_TOOL_BUTTON === active) {
      dispatch(selectMemory(clickedDiory))
    }
  }
}
