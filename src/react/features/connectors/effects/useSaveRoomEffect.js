import { useEffect } from 'react'
import { useStore, useDispatchActions } from '../../../store'

import { saveRoom } from '../../room/actions'
import { useConnections } from '../useConnections'

export const useSaveRoomEffect = (saveRoomClient, connectorId) => {
  const [{ diograph, updated }] = useStore((state) => state.room)
  const { connections } = useConnections(connectorId)

  const { debounceDispatchPromiseAction } = useDispatchActions()
  useEffect(() => {
    if (updated) {
      connections
        .filter(({ connected }) => connected)
        .forEach(({ address, room }) => {
          if (updated) {
            debounceDispatchPromiseAction(() => saveRoomClient(address, { diograph }), saveRoom)
          }
        })
    }
  }, [updated, connections, diograph, debounceDispatchPromiseAction, saveRoomClient])
}
