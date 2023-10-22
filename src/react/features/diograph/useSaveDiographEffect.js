import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../store'

import { saveDiograph } from './diographActions'
import { useDiosphere } from '../diosphere/useDiosphere'

export const useSaveDiographEffect = () => {
  const { room = {} } = useDiosphere()
  const { connections } = room
  const { updated } = useSelector((state) => state.diosphere)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (updated && connections) {
      dispatch(saveDiograph(connections))
    }
  }, [dispatch, updated, connections])
}
