import { useDispatchActions } from '../../../store'
import { useFilter } from '../hooks/useFilter'
import { useGenerateTextFilter } from './useGenerateTextFilter'

import { activateFilter, setFilter } from '../actions'

export const useTextFilter = () => {
  const { query = '' } = useFilter('text')

  const { dispatch } = useDispatchActions()
  return {
    query,
    setTextFilter: (query) => {
      dispatch(setFilter('text', { query }))
      dispatch(activateFilter('text', !!query.length))
    },
    turnOn: (query = '') => {
      dispatch(setFilter('text', { query }))
      dispatch(activateFilter('text', !!query.length))
    },
    textFilter: useGenerateTextFilter(),
  }
}
