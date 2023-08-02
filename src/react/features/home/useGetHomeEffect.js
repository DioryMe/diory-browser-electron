import { useEffect } from 'react'

import { useDispatchActions } from '../../store'

import { getHome } from './homeActions'

export const useGetHomeEffect = () => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(getHome())
  }, [dispatch])
}
