import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { getDiograph } from './diographActions'

export const useDiographEffect = () => {
  const { connection } = useSelector((state) => state.home)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (connection) {
      dispatch(getDiograph(connection))
    }
  }, [dispatch, connection])
}
