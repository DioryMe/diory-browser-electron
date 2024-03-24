import { useEffect } from 'react'

import { useDispatchActions, useSelector } from '../../store'

import { enterRoom } from './homeActions'

export const useEnterRoomEffect = () => {
  const { roomId } = useSelector((state) => state.navigation)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (roomId) {
      dispatch(enterRoom({ id: roomId }))
    }
  }, [dispatch, roomId])
}
