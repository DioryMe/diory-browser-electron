import { useEffect } from 'react'
import { useStore, useDispatchActions } from '../../../store'

import { saveRoom } from '../../diograph/actions'
import { useConnections } from '../useConnections'

export const useSaveRoomEffect = (saveRoomClient, connectorId) => {
  const [{ diograph, updated }] = useStore((state) => state.diograph)
  const { connected } = useConnections(connectorId)

  const { debounceDispatchPromiseAction } = useDispatchActions()
  useEffect(() => {
    if (updated) {
      connected.forEach(({ address }) => {
        debounceDispatchPromiseAction(() => saveRoomClient(address, { diograph }), saveRoom)
      })
    }
  }, [updated, connected, diograph, debounceDispatchPromiseAction, saveRoomClient])
}
