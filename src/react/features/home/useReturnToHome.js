import { useDispatchActions, useSelector } from '../../store'

import { setIsHome } from './homeActions'
import { setDiographAddress } from '../diograph/diographActions'

export const useReturnToHome = () => {
  const { address } = useSelector((state) => state.home)
  const { dispatch } = useDispatchActions()
  return () => {
    dispatch(setDiographAddress(address))
    dispatch(setIsHome(true))
  }
}
