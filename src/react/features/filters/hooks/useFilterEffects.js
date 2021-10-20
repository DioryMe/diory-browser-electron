import { useEffect } from 'react'
import { useDispatchActions, useStore } from '../../../store'
import { activateFilter } from '../actions'

const useInactivateFilterOnFocusChange = (filterId) => {
  const [{ storyId }] = useStore((state) => state.navigation)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (storyId) {
      dispatch(activateFilter(filterId, false))
    }
  }, [storyId, filterId, dispatch])
}

export const useFilterEffects = (filterId) => {
  useInactivateFilterOnFocusChange(filterId)
}
