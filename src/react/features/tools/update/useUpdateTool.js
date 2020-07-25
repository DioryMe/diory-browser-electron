import { useDispatch } from '../../../store'
import { useFocusDiory } from '../../room/hooks'

import { updateDiory } from '../../room/actions'

export const useUpdateTool = () => {
  const { diory } = useFocusDiory()

  const dispatch = useDispatch()
  return {
    diory,
    onDone: (updatedFields) => {
      dispatch(updateDiory({ id: diory.id, ...updatedFields }))
    },
  }
}
