import { useEffect } from 'react'

import { useDispatchActions } from '../../store'

import { initialiseHome } from './homeActions'

export const useInitialiseHome = () => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(initialiseHome())
  }, [dispatch])
}
