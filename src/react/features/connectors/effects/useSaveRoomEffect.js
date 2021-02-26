import { useEffect } from 'react'
import { useStore, useDispatchActions, getUntrackedObject } from '../../../store'

import { saveRoom } from '../../diograph/actions'
import { useConnections } from '../useConnections'

import { invokeChannel } from '../../../client/client'
import { channels } from '../../../../shared/constants'

// Makes a copy of storeDiograph and deeply resolves the Proxy objects
function getUntrackedDiograph(diograph) {
  const untrackedDiograph = { ...getUntrackedObject(diograph) }
  if (untrackedDiograph) {
    Object.entries(untrackedDiograph).forEach(([key, value]) => {
      const untrackedLinks = getUntrackedObject(untrackedDiograph[key].links)
      if (untrackedLinks) {
        untrackedDiograph[key].links = { ...untrackedLinks }
      }
    })
  }
  return untrackedDiograph
}

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
              room: { rootId, diograph: getUntrackedDiograph(diograph) },
            }),
          saveRoom
        )
      })
    }
  }, [rootId, updated, connected, diograph, debounceDispatchPromiseAction])
}
