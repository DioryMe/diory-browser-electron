import { useEffect } from 'react'
import { channels } from '../../../../shared/constants'
import { openChannel } from '../../../client/client'
import { promiseDispatch, useDispatch, useStore } from '../../../store'
import { debounce } from '../../../utils'
import { saveHome } from '../actions'

const debouncePromiseDispatch = debounce(promiseDispatch, 1000)

const transformConnections = (connections) =>
  Object.entries(connections).reduce(
    (obj, [address, { connected, ...connection }]) => ({
      ...obj,
      [address]: {
        ...connection,
        connect: connected,
      },
    }),
    {}
  )

export const useSaveHomeEffect = () => {
  const [{ connections, updated: connectionsUpdated }] = useStore((state) => state.connectors)
  const [{ rooms, updated: homeUpdated }] = useStore((state) => state.home)
  const [{ roomId, focus: dioryId }] = useStore((state) => state.navigation)
  const home = {
    connections: transformConnections(connections),
    rooms,
    focus: { roomId, dioryId },
  }
  const dispatch = useDispatch()
  useEffect(() => {
    if (connectionsUpdated || homeUpdated) {
      debouncePromiseDispatch(dispatch, openChannel(channels.SAVE_HOME, home), saveHome)
    }
  }, [connectionsUpdated, homeUpdated, home, dispatch])
}
