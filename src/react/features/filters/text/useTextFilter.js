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
      dispatch(activateFilter('text', query.length > 1))
      dispatch(setFilter('text', { query }))
    },
    turnOn: (query = '') => {
      dispatch(activateFilter('text', query.length > 1))
      dispatch(setFilter('text', { query }))
    },
    textFilter: useGenerateTextFilter(),
  }
}
