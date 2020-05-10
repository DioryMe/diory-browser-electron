import { useDispatch, useStore } from '../../../store'

import { setFocus } from '../../navigation/actions'
import { addDiory } from '../../room/actions'
import { setTextFilter } from '../actions'

import { TEXT_FILTER_DIORY_ID } from './textFilterDioryId'

export const useTextFilter = () => {
  const [{ diograph }] = useStore((state) => state.room)
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ textFilter }] = useStore((state) => state.filters)

  const dispatch = useDispatch()
  return {
    value: TEXT_FILTER_DIORY_ID === focus ? textFilter : '',
    setTextFilter: (value) => dispatch(setTextFilter(value)),
    turnOn: (value) => {
      if (!diograph[TEXT_FILTER_DIORY_ID]) {
        dispatch(addDiory({ id: TEXT_FILTER_DIORY_ID }))
      }
      if (TEXT_FILTER_DIORY_ID !== focus) {
        dispatch(setFocus({ focus: TEXT_FILTER_DIORY_ID }))
      }
      dispatch(setTextFilter(value))
    },
  }
}
