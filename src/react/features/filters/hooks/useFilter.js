import { useEffect } from 'react'
import { useDispatchActions, useStore } from '../../../store'
import { activateFilter } from '../actions'

const useInactivateFilterOnFocusChange = (filterId) => {
  const [{ focus }] = useStore((state) => state.navigation)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (focus) {
      dispatch(activateFilter(filterId, false))
    }
  }, [focus, filterId])
}

export const useFilter = (filterId) => {
  useInactivateFilterOnFocusChange(filterId)

  const [{ filters }] = useStore((state) => state.filters)
  return filters[filterId] || {}
}
