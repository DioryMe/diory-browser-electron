import { useDispatch, useStore } from '../../../store'
import { useButtons } from '../../buttons'

import { setSelectedDiory } from '../../navigation/actions'
import { buttons, DELETE_TOOL_BUTTON } from './buttons'

export const useDeleteTool = () => {
  useButtons(buttons)

  const [{ active }] = useStore((state) => state.buttons)

  const dispatch = useDispatch()
  return (clickedDiory) => {
    if (DELETE_TOOL_BUTTON === active) {
      dispatch(setSelectedDiory(clickedDiory))
    }
  }
}
