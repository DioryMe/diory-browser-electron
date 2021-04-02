import { useDispatch, useStore } from '../../../store'
import { setFocus } from '../../navigation/actions'
import { selectLens } from '../../lenses/actions'

export const useFocusTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const dispatch = useDispatch()
  return (clickedDiory) => {
    if (!active) {
      dispatch(setFocus({ focus: clickedDiory.id }))
      if (!clickedDiory.links || Object.keys(clickedDiory.links).length === 0) {
        dispatch(selectLens('fullscreen'))
      }
    }
  }
}
