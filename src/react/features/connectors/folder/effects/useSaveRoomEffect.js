import { useEffect } from 'react'
import { useStore, promiseDispatch, useDispatch } from '../../../../store'
import { debounce } from '../../../../utils'

import { saveRoom } from '../../../room/actions'
import { useConnections } from '../../useConnections'

import { saveRoomClient } from '../client/client'

const debouncePromiseDispatch = debounce(promiseDispatch, 1000)

export const useSaveRoomEffect = () => {
  const [{ id, diograph, updated }] = useStore((state) => state.room)
  const { connections } = useConnections('file')
  const [address] = connections.map(({ address }) => address)
  const [connected] = connections.map(({ connected }) => connected)

  const dispatch = useDispatch()
  useEffect(() => {
    if (updated && connected) {
      debouncePromiseDispatch(dispatch, saveRoomClient(address, { id, diograph }), saveRoom)
    }
  }, [updated, connected, address, id, diograph, dispatch])
}
