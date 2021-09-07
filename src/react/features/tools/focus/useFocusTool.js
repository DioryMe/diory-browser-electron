import { useDispatch, useStore } from '../../../store'
import { setFocus, setSelectedDiory } from '../../navigation/actions'
import { addDioryToHand } from '../actions'

export const useFocusTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const [{ selectedDioryId }] = useStore((state) => state.navigation)
  const dispatch = useDispatch()
  return (clickedDiory) => {
    if (!active) {
      if (selectedDioryId === clickedDiory.id) {
        dispatch(addDioryToHand(clickedDiory.id))
        dispatch(setFocus({ focusId: clickedDiory.id }))
      } else {
        dispatch(setSelectedDiory(clickedDiory))
      }
    }
  }
}
