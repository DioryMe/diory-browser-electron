import { useDispatchActions, useSelector } from '../../../store'

import { selectMemory } from '../../navigation/navigationActions'
import { DELETE_TOOL_BUTTON } from './buttons'

export const useDeleteTool = () => {
  const { active } = useSelector((state) => state.buttons)
  const { dispatch } = useDispatchActions()
  return (clickedDiory) => {
    if (DELETE_TOOL_BUTTON === active) {
      dispatch(selectMemory(clickedDiory))
    }
  }
}
