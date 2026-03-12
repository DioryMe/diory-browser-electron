import { useDispatchActions } from '../../store'

import { setIsHome } from './homeActions'

export const useReturnToHome = () => {
  const { dispatch } = useDispatchActions()
  return () => {
    dispatch(setIsHome(true))
  }
}
