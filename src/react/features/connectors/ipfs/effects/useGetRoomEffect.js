import { useEffect } from 'react'

import { useDispatch } from '../../../../store'

import { useConnections } from '../../useConnections'
import { useIpfsFactory } from '../client/useIpfsFactory'

import { updateConnection } from '../../actions'
import { getRoom } from '../../../room/actions'
import { getDiograph } from '../client/client'

async function getRoomFromIpfs(ipfs, { address, room }) {
  const diograph = await getDiograph(ipfs, address)

  return {
    id: room,
    diograph,
  }
}

export const useGetRoomEffect = () => {
  const { connections } = useConnections('ipfs')
  const { ipfs } = useIpfsFactory()

  const dispatch = useDispatch()
  useEffect(() => {
    connections
      .filter(({ connect }) => connect)
      .forEach(({ address, room }) => {
        dispatch(updateConnection({ address, connect: false }))
        getRoomFromIpfs(ipfs, { address, room })
          .then((room) => dispatch(getRoom(room)))
          .then(() => dispatch(updateConnection({ address, connected: true })))
      })
  }, [connections, dispatch])
}
