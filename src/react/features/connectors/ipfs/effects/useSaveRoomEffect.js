import { useEffect } from 'react'
import { useStore, promiseDispatch, useDispatch } from '../../../../store'
import { debounce } from '../../../../utils'

import { saveRoom } from '../../../room/actions'
import { useConnections } from '../../useConnections'
import { useIpfsFactory } from '../client/useIpfsFactory'

import { saveDiograph } from '../client/client'

const debouncePromiseDispatch = debounce(promiseDispatch, 1000)

const saveRoomToIpfs = async (ipfs, { id, diograph }) => {
  const address = await saveDiograph(ipfs, diograph)
  return {
    room: id,
    address,
  }
}

export const useSaveRoomEffect = () => {
  const [{ id, diograph, updated }] = useStore((state) => state.room)
  const { ipfs } = useIpfsFactory()
  const { connections } = useConnections('ipfs')
  const [connected] = connections.map(({ connected }) => connected)

  const dispatch = useDispatch()
  useEffect(() => {
    if (updated && ipfs && connected) {
      debouncePromiseDispatch(dispatch, saveRoomToIpfs(ipfs, { id, diograph }), saveRoom)
    }
  }, [updated, connected, ipfs, id, diograph, dispatch])
}
