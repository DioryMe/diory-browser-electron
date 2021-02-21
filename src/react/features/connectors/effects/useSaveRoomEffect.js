import { useEffect } from 'react'
import { useStore, useDispatchActions, getUntrackedObject } from '../../../store'

import { saveRoom } from '../../diograph/actions'
import { useConnections } from '../useConnections'

import { invokeChannel } from '../../../client/client'
import { channels } from '../../../../shared/constants'

export const useSaveRoomEffect = (connectorId) => {
  const [{ rootId, diograph, updated }] = useStore((state) => state.diograph)
  const { connected } = useConnections(connectorId)

  const { debounceDispatchPromiseAction } = useDispatchActions()
  useEffect(() => {
    if (updated) {
      connected.forEach(({ address }) => {
        debounceDispatchPromiseAction(
          () =>
            invokeChannel(channels.SAVE_ROOM, {
              path: address,
              room: { rootId, diograph: getUntrackedObject(diograph) },
            }),
          saveRoom
        )
      })
    }
  }, [rootId, updated, connected, diograph, debounceDispatchPromiseAction])
}
