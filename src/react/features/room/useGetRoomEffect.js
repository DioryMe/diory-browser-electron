import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { getRoom } from './roomActions'

export const useGetRoomEffect = () => {
  const { connections } = useSelector((state) => state.room)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (connections.length) {
      dispatch(getRoom(connections))
    }
  }, [dispatch, connections])
}
