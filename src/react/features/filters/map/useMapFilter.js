import { useCallback } from 'react'
import { useDispatchActions } from '../../../store'
import { useFilter } from '../hooks/useFilter'
import { useGenerateMapFilter } from './useGenerateMapFilter'

import { setFilter } from '../actions'

const useOnBoundsChange = () => {
  const { active: triggerInitialBoundsOnChange } = useFilter('map')
  const { dispatch } = useDispatchActions()
  const dispatchSetFilter = useCallback(
    (bounds) => dispatch(setFilter('map', { bounds })),
    [dispatch]
  )

  return triggerInitialBoundsOnChange && dispatchSetFilter
}

export const useMapFilter = () => {
  const { active } = useFilter('map')
  return {
    active,
    onBoundsChange: useOnBoundsChange(),
    mapFilter: useGenerateMapFilter(),
  }
}
