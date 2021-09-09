import { useDispatch, useStore } from '../../../store'
import { setFocus, setSelectedDiory } from '../../navigation/actions'
import { addDioryToHand } from '../actions'

export const useFocusTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const [{ selectedDioryId }] = useStore((state) => state.navigation)
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const dispatch = useDispatch()
  return (clickedDiory) => {
    if (selectedLensId === 'fullscreen') {
      dispatch(setFocus(clickedDiory))
    } else if (!active) {
      if (selectedDioryId === clickedDiory.id) {
        dispatch(addDioryToHand(clickedDiory.id))
        dispatch(setFocus(clickedDiory))
        dispatch(setSelectedDiory({ id: null }))
      } else {
        dispatch(setSelectedDiory(clickedDiory))
      }
    }
  }
}
