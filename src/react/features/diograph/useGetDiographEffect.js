import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { getDiograph } from './diographActions'

export const useGetDiographEffect = () => {
  const { connections } = useSelector((state) => state.room)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (connections.length) {
      dispatch(getDiograph(connections))
    }
  }, [dispatch, connections])
}
