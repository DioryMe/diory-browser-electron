import { useEffect } from 'react'

import { useDispatchActions } from '../../store'

import { getHomeConnection } from './homeActions'

export const useGetHomeConnection = () => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(getHomeConnection())
  }, [dispatch])
}
