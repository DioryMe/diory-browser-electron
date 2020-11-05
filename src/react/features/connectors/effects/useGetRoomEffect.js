import { useEffect } from 'react'
import { useDispatchActions } from '../../../store'
import { updateConnection } from '../actions'
import { useConnections } from '../useConnections'

import { getRoom } from '../../room/actions'

export const useGetRoomEffect = (getRoomClient, connectorId) => {
  const { connect, disconnect } = useConnections(connectorId)

  const { dispatch, dispatchPromiseAction } = useDispatchActions()
  useEffect(() => {
    connect.forEach(({ address }) => {
      dispatchPromiseAction(
        () => getRoomClient({ address }),
        () => getRoom({ address })
      )
    })
    disconnect.forEach(({ address }) => {
      dispatch(updateConnection({ address, connected: false }))
    })
  }, [connect, disconnect, dispatchPromiseAction, dispatch, getRoomClient])
}
