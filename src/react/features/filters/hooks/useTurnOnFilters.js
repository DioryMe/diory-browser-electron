import { useDispatch, useStore } from '../../../store'

import { setFocus } from '../../navigation/actions'
import { addDiory } from '../../room/actions'

const SEARCH_TOOL_ID = 'SEARCH_TOOL_ID'

export const useTurnOnFilters = () => {
  const [{ diograph }] = useStore((state) => state.room)
  const [{ focus }] = useStore((state) => state.navigation)

  const dispatch = useDispatch()
  const turnOnFilters = () => {
    if (!diograph[SEARCH_TOOL_ID]) {
      dispatch(addDiory({ id: SEARCH_TOOL_ID }))
    }
    if (SEARCH_TOOL_ID !== focus) {
      dispatch(setFocus({ focus: SEARCH_TOOL_ID }))
    }
  }

  return { turnOnFilters }
}
