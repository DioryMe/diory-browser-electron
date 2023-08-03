import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../store'

import { saveRoom } from './roomActions'

export const useSaveRoomEffect = () => {
  const { updated, connections } = useSelector((state) => state.room)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (updated && connections.length) {
      dispatch(saveRoom(connections))
    }
  }, [dispatch, updated, connections])
}
