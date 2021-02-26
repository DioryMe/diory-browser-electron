import { useDispatch, useStore } from '../../../store'
import { setFocus } from '../../navigation/actions'
import { activateFilter, setFilter } from '../../filters/actions'

export const useFocusTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const textFilter = useStore((state) => state.filters.filters.text)

  const dispatch = useDispatch()
  return (clickedDiory) => {
    if (!active) {
      dispatch(setFocus({ focus: clickedDiory.id }))
    }
    if (textFilter) {
      dispatch(setFilter('text', { query: '' }))
      dispatch(activateFilter('text', false))
    }
  }
}
