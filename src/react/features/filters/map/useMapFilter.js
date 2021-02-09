import { useCallback } from 'react'
import { useDispatchActions, useStore } from '../../../store'

import { setFilter } from '../actions'

export const useMapFilter = () => {
  const [{ map: isActive }] = useStore((state) => state.filters.active)
  const { dispatch } = useDispatchActions()
  const dispatchSetFilter = useCallback((bounds) => (
    dispatch(setFilter({ map: bounds }))
  ),[dispatch])
  return {
    isActive,
    onBoundsChange: isActive && dispatchSetFilter,
  }
}
