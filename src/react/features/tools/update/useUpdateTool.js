import { useDispatch, useStore } from '../../../store'
import { useButtons } from '../../buttons'
import { setSelectedDiory } from '../../navigation/actions'
import { buttons, UPDATE_TOOL_BUTTON } from './buttons'

export const useUpdateTool = () => {
  useButtons(buttons)

  const [{ active }] = useStore((state) => state.buttons)
  const dispatch = useDispatch()
  return (clickedDiory) => {
    if (UPDATE_TOOL_BUTTON === active) {
      dispatch(setSelectedDiory(clickedDiory))
    }
  }
}
