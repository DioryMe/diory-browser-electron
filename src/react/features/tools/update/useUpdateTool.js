import { useDispatchActions, useSelector } from '../../../store'
import { selectMemory } from '../../navigation/navigationActions'
import { UPDATE_TOOL_BUTTON } from './buttons'

export const useUpdateTool = () => {
  const { active } = useSelector((state) => state.buttons)
  const { dispatch } = useDispatchActions()
  return (clickedDiory) => {
    if (UPDATE_TOOL_BUTTON === active) {
      // TODO Activate tool in store
      dispatch(selectMemory(clickedDiory))
    }
  }
}
