import { useDispatchActions } from '../../../../store'
import { updateDiory } from '../../../diograph/diographActions'
import { clearSelectedDiories } from '../../toolsActions'
import { useSelectedDiories } from '../../utils/useSelectedDiories'

export const useUpdateSelectedDiories = () => {
  const { selectedDiories } = useSelectedDiories()
  const { dispatch } = useDispatchActions()
  return {
    updateSelectedDiories: (updatedDiory) => {
      selectedDiories.forEach((diory) => {
        dispatch(updateDiory({ ...diory, ...updatedDiory }))
      })
      dispatch(clearSelectedDiories())
    },
  }
}
