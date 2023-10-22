import { useEffect } from 'react'

import { useDispatchActions } from '../../store'

import { useDiosphere } from '../diosphere/useDiosphere'
import { getDiograph } from './diographActions'

export const useGetDiographEffect = () => {
  const { room = {} } = useDiosphere()
  const { connections } = room
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (connections) {
      dispatch(getDiograph(connections))
    }
  }, [dispatch, connections])
}
