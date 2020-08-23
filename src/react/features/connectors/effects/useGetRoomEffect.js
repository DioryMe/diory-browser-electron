import { useEffect } from 'react'
import { useDispatchActions } from '../../../store'
import { useConnections } from '../useConnections'

import { setConnection } from '../actions'
import { getRoom } from '../../room/actions'

export const useGetRoomEffect = (getRoomClient, connectorId) => {
  const { connections } = useConnections(connectorId)

  const { dispatchAction, dispatchPromiseAction } = useDispatchActions()
  useEffect(() => {
    connections
      .filter(({ connecting, connected }) => !connecting && !connected)
      .forEach(({ address }) => {
        dispatchPromiseAction(
          () => getRoomClient({ address }),
          () => getRoom({ address })
        )
      })
  }, [connections, dispatchPromiseAction, dispatchAction, getRoomClient])
}
