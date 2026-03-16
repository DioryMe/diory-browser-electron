import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../store'

import { getHomeAddress } from './homeActions'
import { getDiograph, setDiographAddress } from '../diograph/diographActions'

export const useGetHomeEffect = () => {
  const {
    address: homeAddress,
    loading: homeLoading,
    loaded: homeLoaded,
  } = useSelector((state) => state.home)
  const { loading, loaded } = useSelector((state) => state.diograph)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (!homeAddress) {
      dispatch(getHomeAddress())
    }
  }, [dispatch, homeAddress])

  useEffect(() => {
    if (homeAddress) {
      dispatch(setDiographAddress(homeAddress))
      dispatch(getDiograph(homeAddress))
    }
  }, [dispatch, homeAddress])

  return {
    loading: homeLoading || loading[homeAddress],
    loaded: homeLoaded && loaded[homeAddress],
  }
}
