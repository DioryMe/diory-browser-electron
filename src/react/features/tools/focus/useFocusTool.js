import { useDispatch, useStore } from '../../../store'
import { setFocus } from '../../navigation/actions'
import { selectLens } from '../../lenses/actions'

export const useFocusTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const dispatch = useDispatch()
  return (clickedDiory) => {
    if (!active) {
      if (!clickedDiory.links || Object.keys(clickedDiory.links).length === 0) {
        dispatch(selectLens('fullscreen'))
        dispatch(setFocus({ focus: clickedDiory.id, lens: 'fullscreen' }))
      } else {
        dispatch(setFocus({ focus: clickedDiory.id }))
      }
    }
  }
}
