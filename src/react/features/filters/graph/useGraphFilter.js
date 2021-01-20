import { useEffect } from 'react'
import { useDispatchActions } from '../../../store'

import { setFilter } from '../actions'

export const useGraphFilter = () => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(setFilter({ grid: 1 }))
  }, [dispatch])

  return {
    setFilter: (zoom) => dispatch(setFilter({ grid: zoom })),
  }
}
