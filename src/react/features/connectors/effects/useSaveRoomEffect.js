import { useEffect } from 'react'
import { useStore, promiseDispatch, useDispatch } from '../../../store'
import { debounce } from '../../../utils'

import { saveRoom } from '../../room/actions'
import { useConnections } from '../useConnections'

const debouncePromiseDispatch = debounce(promiseDispatch, 1000)

export const useSaveRoomEffect = (saveRoomClient, connectorId) => {
  const [{ diograph, updated }] = useStore((state) => state.room)
  const { connections } = useConnections(connectorId)

  const dispatch = useDispatch()
  useEffect(() => {
    if (updated) {
      connections
        .filter(({ connected }) => connected)
        .forEach(({ address, room }) => {
          if (updated) {
            debouncePromiseDispatch(dispatch, saveRoomClient(address, { diograph }), saveRoom)
          }
        })
    }
  }, [updated, connections, diograph, dispatch, saveRoomClient])
}
