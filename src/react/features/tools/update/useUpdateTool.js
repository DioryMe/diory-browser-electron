import { useDispatch, useStore } from '../../../store'
import { useFocusDiory } from '../../room/hooks'

import { updateDiory } from '../../room/actions'
import { UPDATE_TOOL_BUTTON } from './buttons'

export const useUpdateTool = () => {
  const [{ active }] = useStore((state) => state.tools)
  const { diory } = useFocusDiory()

  const dispatch = useDispatch()
  return {
    isShown: UPDATE_TOOL_BUTTON === active,
    onDone: (updatedFields) => {
      dispatch(updateDiory({ id: diory.id, ...updatedFields }))
    },
  }
}
