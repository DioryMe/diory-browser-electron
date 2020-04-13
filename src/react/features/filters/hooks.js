import { useDispatch, useStore } from '../../store'
import { setTextFilter } from './actions'

export const useTextFilter = () => {
  const [{ textFilter }] = useStore((state) => state.filters)

  const dispatch = useDispatch()
  return {
    textFilter,
    setTextFilter: (value) => dispatch(setTextFilter(value)),
  }
}
