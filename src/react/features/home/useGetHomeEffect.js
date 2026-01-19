import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../store'

import { getHomeAddress } from './homeActions'
import { getDiograph, setDiographAddress } from '../diograph/diographActions'

export const useGetHomeEffect = () => {
  const { address: homeAddress } = useSelector((state) => state.home)
  const { address: diographAddress } = useSelector((state) => state.diograph)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (!homeAddress) {
      dispatch(getHomeAddress())
    }
  }, [dispatch, homeAddress])

  useEffect(() => {
    if (homeAddress && !diographAddress) {
      dispatch(setDiographAddress(homeAddress))
      dispatch(getDiograph(homeAddress))
    }
  }, [dispatch, homeAddress, diographAddress])
}
