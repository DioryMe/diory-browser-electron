import { useEffect } from 'react'
import { channels } from '../../../../shared/constants'
import { invokeChannel } from '../../../client/client'

import { useDispatchActions, useStore, getUntrackedObject } from '../../../store'

import { saveHome } from '../actions'

const transformConnections = (connections) =>
  Object.entries(connections).reduce(
    (obj, [address, { room, connector }]) => ({
      ...obj,
      [address]: { room, connector },
    }),
    {}
  )

export const useSaveHomeEffect = () => {
  const [{ rooms, updated: homeUpdated }] = useStore((state) => state.rooms)
  const [{ connections, updated: connectionsUpdated }] = useStore((state) => state.connectors)
  const [{ roomId, focus: dioryId }] = useStore((state) => state.navigation)
  const home = {
    rooms: getUntrackedObject(rooms),
    connections: transformConnections(connections),
    focus: { roomId, dioryId },
  }
  const { debounceDispatchPromiseAction } = useDispatchActions()
  useEffect(() => {
    if (connectionsUpdated || homeUpdated) {
      debounceDispatchPromiseAction(() => invokeChannel(channels.SAVE_HOME, home), saveHome)
    }
  }, [connectionsUpdated, homeUpdated, home, debounceDispatchPromiseAction])
}
