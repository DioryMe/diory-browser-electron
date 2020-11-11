import { useDispatch, useStore } from '../../../store'
import { setFocus } from '../../navigation/actions'

export const useFocusTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const dispatch = useDispatch()
  return ({ diory: clickedDiory }) => {
    if (!active) {
      dispatch(setFocus({ focus: clickedDiory.id }))
    }
  }
}
