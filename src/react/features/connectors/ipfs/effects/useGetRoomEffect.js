import { useEffect } from 'react'

import { useDispatch } from '../../../../store'

import { useConnections } from '../../useConnections'
import { useIpfsFactory } from '../client/useIpfsFactory'

import { setConnection } from '../../actions'
import { getRoom } from '../../../room/actions'
import { getDiograph } from '../client/client'

async function getRoomFromIpfs(ipfs, { address, root }) {
  const diograph = await getDiograph(ipfs, address)

  return {
    root,
    diograph,
  }
}

export const useGetRoomEffect = () => {
  const { connections } = useConnections('ipfs')
  const { ipfs } = useIpfsFactory()

  const dispatch = useDispatch()
  useEffect(() => {
    if (ipfs) {
      connections
        .filter(({ connect }) => connect)
        .forEach(({ address, root }) => {
          dispatch(setConnection({ address, connect: false }))
          getRoomFromIpfs(ipfs, { address, root })
            .then((room) => dispatch(getRoom(room)))
            .then(() => dispatch(setConnection({ address, connected: true })))
        })
    }
  }, [ipfs, connections, dispatch])
}
