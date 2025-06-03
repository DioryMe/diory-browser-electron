import { useEffect } from 'react'

import { useDispatchActions } from '../../store'

import { getHomeAddress } from './homeActions'

export const useGetHomeAddressEffect = () => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(getHomeAddress())
  }, [dispatch])
}
