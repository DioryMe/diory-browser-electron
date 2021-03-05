import { useDispatch, useStore } from '../../../store'
import { useButtons } from '../../buttons'

import { setSelectedLink } from '../../navigation/actions'
import { buttons, DELETE_TOOL_BUTTON } from './buttons'
// import { useFocus } from '../../diograph/hooks'

export const useDeleteTool = () => {
  useButtons(buttons)

  const [{ active }] = useStore((state) => state.buttons)

  // const { diory } = useFocus()
  const dispatch = useDispatch()
  return (clickedDiory) => {
    if (DELETE_TOOL_BUTTON === active) {
      dispatch(setSelectedLink(clickedDiory))
    }
  }
}
