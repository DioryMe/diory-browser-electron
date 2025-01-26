import { useDispatchActions, useSelector } from '../../../store'
import { useButtons } from '../../buttons/useButtons'

import { selectMemory } from '../../navigation/navigationActions'
import { buttons, DELETE_TOOL_BUTTON } from './buttons'

export const useDeleteTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)

  const { dispatch } = useDispatchActions()
  return (clickedDiory) => {
    if (DELETE_TOOL_BUTTON === active) {
      dispatch(selectMemory(clickedDiory))
    }
  }
}
