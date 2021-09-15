import { useDispatch, useStore } from '../../../store'
import { setFocus, setSelectedDiory } from '../../navigation/actions'
import { useFocus } from '../../diograph/hooks'
import { addDioryToHand } from '../actions'

export const useFocusTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const [{ focusId, selectedDioryId }] = useStore((state) => state.navigation)
  const { reverseDiorys } = useFocus()
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const dispatch = useDispatch()
  return (clickedDiory) => {
    if (selectedLensId === 'fullscreen') {
      // Fullscreen top row click when blue border
      if (focusId === clickedDiory.id) {
        if (reverseDiorys.length > 0) {
          dispatch(setFocus(reverseDiorys[0]))
          dispatch(setSelectedDiory(clickedDiory))
        }
      } else {
        // Fullscreen bottom row click & top row without blue border
        dispatch(setFocus(clickedDiory))
      }
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
