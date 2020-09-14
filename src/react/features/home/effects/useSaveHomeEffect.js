import { useEffect } from 'react'
import { channels } from '../../../../shared/constants'
import { openChannel } from '../../../client/client'

import { useDispatchActions, useStore } from '../../../store'

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
  const [{ rooms }] = useStore((state) => state.home)
  const [{ connections, updated: connectionsUpdated }] = useStore((state) => state.connectors)
  const [{ roomId, focus: dioryId }] = useStore((state) => state.navigation)
  const home = {
    rooms,
    connections: transformConnections(connections),
    focus: { roomId, dioryId },
  }
  const { debounceDispatchPromiseAction } = useDispatchActions()
  useEffect(() => {
    if (connectionsUpdated) {
      debounceDispatchPromiseAction(() => openChannel(channels.SAVE_HOME, home), saveHome)
    }
  }, [connectionsUpdated, home, debounceDispatchPromiseAction])
}
