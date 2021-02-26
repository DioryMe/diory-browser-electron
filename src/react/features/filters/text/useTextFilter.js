import { useDispatchActions } from '../../../store'
import { useFilter } from '../hooks/useFilter'
import { useGenerateTextFilter } from './useGenerateTextFilter'

import { activateFilter, setFilter } from '../actions'

export const useTextFilter = () => {
  const { active, query = '' } = useFilter('text')

  const { dispatch } = useDispatchActions()
  return {
    value: active ? query : '',
    placeholder: 'Search your diory',
    onFocus: ({ target: { value: query } }) => {
      dispatch(setFilter('text', { query }))
      dispatch(activateFilter('text', !!query.length))
    },
    onChange: ({ target: { value: query } }) => {
      dispatch(setFilter('text', { query }))
      dispatch(activateFilter('text', !!query.length))
    },
    textFilter: useGenerateTextFilter(),
  }
}
