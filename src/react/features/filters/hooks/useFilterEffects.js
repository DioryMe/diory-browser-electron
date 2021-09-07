import { useEffect } from 'react'
import { useDispatchActions, useStore } from '../../../store'
import { activateFilter } from '../actions'

const useInactivateFilterOnFocusChange = (filterId) => {
  const [{ focusId }] = useStore((state) => state.navigation)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (focusId) {
      dispatch(activateFilter(filterId, false))
    }
  }, [focusId, filterId, dispatch])
}

export const useFilterEffects = (filterId) => {
  useInactivateFilterOnFocusChange(filterId)
}
