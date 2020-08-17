import { useEffect } from 'react'
import { useDispatchAction } from '../../../store'
import { useConnections } from '../useConnections'

import { setConnection } from '../actions'
import { getRoom } from '../../room/actions'

export const useGetRoomEffect = (getRoomClient, connectorId) => {
  const { connections } = useConnections(connectorId)

  const { dispatch, dispatchAction } = useDispatchAction()
  useEffect(() => {
    connections
      .filter(({ connecting, connected }) => !connecting && !connected)
      .forEach(({ address }) => {
        dispatch(setConnection({ address, connecting: true }))
        getRoomClient({ address })
          .then(dispatchAction(getRoom))
          .then(() => dispatch(setConnection({ address, connecting: false, connected: true })))
      })
  }, [connections, dispatchAction, dispatch, getRoomClient])
}
