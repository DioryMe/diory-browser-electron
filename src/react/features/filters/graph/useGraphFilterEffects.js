import { useEffect } from 'react'
import { useDispatchActions } from '../../../store'
import { useFilterEffects } from '../hooks/useFilterEffects'

import { setFilter } from '../actions'

const INITIAL_PATH_LENGTH = 1

const useInitialGraphZoom = () => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(setFilter('grid', { zoom: INITIAL_PATH_LENGTH }))
  }, [dispatch])
}

export const useGraphFilterEffects = () => {
  useInitialGraphZoom()
  useFilterEffects('grid')
}
