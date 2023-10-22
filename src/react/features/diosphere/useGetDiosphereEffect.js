import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { getDiosphere } from './diosphereActions'

export const useGetDiosphereEffect = () => {
  const { address } = useSelector((state) => state.home)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (address) {
      dispatch(getDiosphere(address))
    }
  }, [dispatch, address])
}
