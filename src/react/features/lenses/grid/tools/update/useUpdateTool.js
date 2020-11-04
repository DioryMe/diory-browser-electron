import { useDispatch, useStore } from '../../../../../store'
import { setLink } from '../../../../navigation/actions'
import { UPDATE_TOOL_BUTTON } from './buttons'

export const useUpdateTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const dispatch = useDispatch()
  return {
    onUpdateDiory: ({ diory: clickedDiory }) => {
      if (UPDATE_TOOL_BUTTON === active) {
        dispatch(setLink(clickedDiory))
      }
    }
  }
}