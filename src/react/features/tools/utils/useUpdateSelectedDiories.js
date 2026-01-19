import { useDispatchActions } from '../../../store'
import { updateDiory } from '../../diograph/diographActions'
import { clearSelectedDiories } from '../toolsActions'
import { useSelectedDiories } from './useSelectedDiories'

export const useUpdateSelectedDiories = () => {
  const { selectedDiories } = useSelectedDiories()
  const { dispatch } = useDispatchActions()
  return {
    updateSelectedDiories: ({ latlng }) => {
      selectedDiories.forEach((diory) => {
        dispatch(updateDiory({ ...diory, latlng }))
      })
      dispatch(clearSelectedDiories())
    },
  }
}
