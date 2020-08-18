import { useEffect } from 'react'
import { useStore, promiseDispatch, useDispatch } from '../../../../store'
import { debounce } from '../../../../utils'

import { saveRoom } from '../../../room/actions'
import { useConnections } from '../../useConnections'

import Ipfs from '../client/client'

const debouncePromiseDispatch = debounce(promiseDispatch, 1000)

const saveRoomToIpfs = async ({ id, root, diograph }) => {
  const address = await Ipfs.saveDiograph(diograph)
  return {
    room: id,
    address,
  }
}

export const useSaveRoomEffect = (isIpfsReady) => {
  const [{ id, root, diograph, updated }] = useStore((state) => state.room)
  const { connections } = useConnections('ipfs')
  const [connected] = connections.map(({ connected }) => connected)

  const dispatch = useDispatch()
  useEffect(() => {
    if (isIpfsReady && updated && connected) {
      debouncePromiseDispatch(dispatch, saveRoomToIpfs({ id, root, diograph }), saveRoom)
    }
  }, [updated, connected, isIpfsReady, id, root, diograph, dispatch])
}
