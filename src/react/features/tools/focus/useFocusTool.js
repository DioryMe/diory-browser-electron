import { useDispatch, useStore } from '../../../store'
import { setFocus, setSelectedLink } from '../../navigation/actions'
import { addDioryToHand } from '../actions'

export const useFocusTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const [{ link }] = useStore((state) => state.navigation)
  const dispatch = useDispatch()
  return (clickedDiory) => {
    if (!active) {
      if (link === clickedDiory.id) {
        dispatch(addDioryToHand(clickedDiory.id))
        dispatch(setFocus({ focusId: clickedDiory.id }))
      } else {
        dispatch(setSelectedLink(clickedDiory))
      }
    }
  }
}
