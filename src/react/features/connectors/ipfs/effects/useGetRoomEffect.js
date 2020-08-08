import { useEffect } from 'react'

import { promiseDispatch, useDispatch, useStore } from '../../../../store'

import { useConnections } from '../../useConnections'
import { useIpfsFactory } from '../client/useIpfsFactory'

import { updateConnection } from '../../actions'
import { getRoom } from '../../../room/actions'
import { getDiograph } from '../client/client'

async function getRoomFromIpfs(ipfs, { address, room }) {
  console.log('GET_ROOM', { address, room })
  const diograph = await getDiograph(ipfs, address)

  return {
    id: room,
    diograph,
  }
}

export const useGetRoomEffect = () => {
  const { connections } = useConnections('ipns')
  const { ipfs } = useIpfsFactory()

  const dispatch = useDispatch()
  useEffect(() => {
    if (ipfs) {
      connections
        .filter(({ connected }) => !connected)
        .forEach((connection) => {
          dispatch(updateConnection({ ...connection, connected: true }))
          promiseDispatch(
            dispatch,
            getRoomFromIpfs(ipfs, connection),
            getRoom
          )
        })
    }
  }, [ipfs, connections, dispatch])
}
