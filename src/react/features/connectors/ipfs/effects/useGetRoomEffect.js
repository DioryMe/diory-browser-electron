import { useEffect } from 'react'

import { promiseDispatch, useDispatch } from '../../../../store'

import { useConnections } from '../../useConnections'
import { useIpfsFactory } from '../client/useIpfsFactory'

import { getRoom } from '../../../room/actions'
import { enterRoom } from '../../../navigation/actions'

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
      connections.forEach((connection) => {
        promiseDispatch(
          dispatch,
          getRoomFromIpfs(ipfs, connection),
          getRoom
        ).then(({ id }) => dispatch(enterRoom({ id })))

      })
    }
  }, [ipfs, dispatch])
}
