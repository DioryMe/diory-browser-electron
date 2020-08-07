import { useEffect } from 'react'
import { useDispatch } from '../../../../store'
import { enterRoom } from '../../../navigation/actions'
import { updateConnection } from '../../actions'
import { useConnections } from '../../useConnections'

import { getRoom } from '../../../room/actions'

import { getRoomClient } from '../client/client'

export const useGetRoomEffect = () => {
  const { connections } = useConnections('file')

  const dispatch = useDispatch()
  useEffect(() => {
    connections
      .filter(({ connect }) => connect)
      .forEach(({ address }) => {
        dispatch(updateConnection({ address, connect: false }))
        getRoomClient({ address })
          .then((room) => dispatch(getRoom(room)))
          .then((room) => dispatch(enterRoom(room)))
          .then(() => dispatch(updateConnection({ address, connected: true })))
      })
  }, [connections, dispatch])
}
