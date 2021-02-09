import { useEffect } from 'react'
import { useDispatchActions, useStore } from '../../../store'

import { setFilter } from '../actions'

const INITIAL_PATH_LENGTH = 1

const useInitialGraphZoom = () => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(setFilter({ grid: INITIAL_PATH_LENGTH }))
  }, [dispatch])
}

export const useGraphFilter = () => {
  useInitialGraphZoom()

  const [{ grid: zoom }] = useStore((state) => state.filters.filters)
  const { dispatch } = useDispatchActions()
  return {
    buttons: [
      {
        id: 'plus',
        data: {
          icon: 'plus',
        },
        onClick: () => dispatch(setFilter({ grid: Math.min(zoom + 1, 3) })),
      },
      {
        id: 'minus',
        data: {
          icon: 'minus',
        },
        onClick: () => dispatch(setFilter({ grid: Math.max(zoom - 1, 0) })),
      },
    ],
  }
}
