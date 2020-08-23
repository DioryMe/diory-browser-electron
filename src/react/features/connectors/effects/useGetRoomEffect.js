import { useEffect } from 'react'
import { useDispatchAction } from '../../../store'
import { useConnections } from '../useConnections'

import { updateConnection } from '../actions'
import { getRoom } from '../../room/actions'

export const useGetRoomEffect = (getRoomClient, connectorId) => {
  const { connections } = useConnections(connectorId)

  const { dispatch, dispatchAction } = useDispatchAction()
  useEffect(() => {
    connections
      .filter(({ connecting, connected }) => !connecting && !connected)
      .forEach(({ address }) => {
        dispatch(updateConnection({ address, connecting: true }))
        getRoomClient({ address })
          .then(dispatchAction(getRoom))
          .then(() => dispatch(updateConnection({ address, connecting: false, connected: true })))
      })
  }, [connections, dispatchAction, dispatch, getRoomClient])
}
