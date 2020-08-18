import { useEffect } from 'react'
import { useDispatch } from '../../../../store'
import { setConnection } from '../../actions'
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
        dispatch(setConnection({ address, connect: false }))
        getRoomClient(address)
          .then((room) => dispatch(getRoom(room)))
          .then(() => dispatch(setConnection({ address, connected: true })))
      })
  }, [connections, dispatch])
}
