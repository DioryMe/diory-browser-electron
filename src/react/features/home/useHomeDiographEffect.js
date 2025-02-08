import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../store'

import { getDiograph } from '../diograph/diographActions'

export const useHomeDiographEffect = () => {
  const { homeConnection } = useSelector((state) => state.home)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (homeConnection) {
      dispatch(getDiograph(homeConnection))
    }
  }, [dispatch, homeConnection])
}
