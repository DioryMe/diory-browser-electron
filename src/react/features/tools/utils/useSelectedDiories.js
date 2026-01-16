import { useDispatchActions, useSelector } from '../../../store'
import { updateDiory } from '../../diograph/diographActions'
import { clearSelectedDiories } from '../toolsActions'

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

export const useSelectedDiories = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { selectedDiories } = useSelector((state) => state.tools)
  const selectedDioriesWithKey = Object.entries(selectedDiories || {})
    .filter(([, selected]) => selected)
    .map(([key]) => ({ key, ...diograph[key] }))

  return {
    selectedDiories: selectedDioriesWithKey,
  }
}
