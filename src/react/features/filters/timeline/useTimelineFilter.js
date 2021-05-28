import { useCallback } from 'react'
import { useDispatchActions } from '../../../store'

import { useFilter } from '../hooks/useFilter'
import { useGenerateTimelineFilter } from './useGenerateTimelineFilter'

import { setFilter } from '../actions'

const useOnBoundsChange = () => {
  const { active } = useFilter('timeline')
  const { dispatch } = useDispatchActions()
  const dispatchSetFilter = useCallback((dates) => dispatch(setFilter('timeline', { dates })), [
    dispatch,
  ])
  return active && dispatchSetFilter
}
export const useTimelineFilter = () => {
  const { active } = useFilter('timeline')
  return {
    active,
    onBoundsChange: useOnBoundsChange(),
    timelineFilter: useGenerateTimelineFilter(),
  }
}
