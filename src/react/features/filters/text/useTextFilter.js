import { useDispatch, useStore } from '../../../store'

import { setFocus } from '../../navigation/actions'
import { createDiory } from '../../diograph/actions'
import { setTextFilter } from '../actions'

import { TEXT_FILTER_DIORY_ID } from './textFilterDioryId'

export const useTextFilter = () => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ textFilter }] = useStore((state) => state.filters)

  const dispatch = useDispatch()
  return {
    value: TEXT_FILTER_DIORY_ID === focus ? textFilter : '',
    setTextFilter: (value) => dispatch(setTextFilter(value)),
    turnOn: (value) => {
      if (!diograph[TEXT_FILTER_DIORY_ID]) {
        dispatch(createDiory({ id: TEXT_FILTER_DIORY_ID }))
      }
      if (TEXT_FILTER_DIORY_ID !== focus) {
        dispatch(setFocus({ focus: TEXT_FILTER_DIORY_ID }))
      }
      dispatch(setTextFilter(value))
    },
  }
}
