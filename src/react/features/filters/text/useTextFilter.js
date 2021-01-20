import { useEffect } from 'react'
import { useDispatchActions, useStore } from '../../../store'

import { activateFilter, setFilter } from '../actions'

export const useTextFilter = () => {
  const [{ text: query }] = useStore((state) => state.filters.filters)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(activateFilter({ text: true }))
  }, [dispatch])

  return {
    value: query,
    setTextFilter: (value) => dispatch(setFilter({ text: value })),
    turnOn: (value) => {
      dispatch(setFilter({ text: value }))
    },
  }
}
