import { useEffect } from 'react'

import { useDispatch, useStore } from '../../../../store'

import { useConnections } from '../../useConnections'

import { setConnection } from '../../actions'
import { getRoom } from '../../../room/actions'
import Ipfs from '../client/client'

async function getRoomFromIpfs({ address, root }) {
  const diograph = await Ipfs.getDiograph(address)

  return {
    root,
    diograph,
  }
}

export const useGetRoomEffect = (isIpfsReady) => {
  const { connections } = useConnections('ipfs')
  const [{ updated }] = useStore((state) => state.room)

  const dispatch = useDispatch()
  useEffect(() => {
    if (isIpfsReady && !updated) {
      connections
        .filter(({ connect }) => connect)
        .forEach(({ address, root }) => {
          dispatch(setConnection({ address, connect: false }))
          getRoomFromIpfs({ address, root })
            .then((room) => dispatch(getRoom(room)))
            .then(() => dispatch(setConnection({ address, connected: true })))
        })
    }
  }, [isIpfsReady, updated, connections, dispatch])
}
