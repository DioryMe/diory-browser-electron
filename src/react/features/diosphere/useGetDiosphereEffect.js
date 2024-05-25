import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { getDiosphere } from './diosphereActions'

export const useGetDiosphereEffect = () => {
  const { connection } = useSelector((state) => state.home)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (connection) {
      dispatch(getDiosphere([connection]))
    }
  }, [dispatch, connection])
}
