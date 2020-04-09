import { useEffect } from 'react'
import { useStore, useDispatch } from '../../../store'

import { getRoom } from '../../room/actions'

import { connect } from '../client'
import { channels } from '../../../../shared/constants'

export const useGetRoom = () => {
  const [{ roomId }] = useStore((state) => state.navigation)
  const [{ paths }] = useStore((state) => state.connector)
  const path = paths[roomId]

  const dispatch = useDispatch()
  useEffect(() => {
    if (roomId) {
      connect(channels.GET_ROOM, path).then((room) => dispatch(getRoom(room)))
    }
  }, [roomId, path, dispatch])
}
