import { useEffect } from 'react'
import { useDispatchActions } from '../../../store'
import { updateConnection } from '../actions'
import { useConnections } from '../useConnections'

import { getRoom } from '../../diograph/actions'
import { invokeChannel } from '../../../client/client'
import { channels } from '../../../../shared/constants'

export const useGetRoomEffect = (connectorId) => {
  const { connect, disconnect } = useConnections(connectorId)

  const { dispatch, dispatchPromiseAction } = useDispatchActions()
  useEffect(() => {
    connect.forEach(({ rootId, diograph, address }) => {
      // *_BEGIN , *_SUCCESS, *_FAILURE
      dispatchPromiseAction(
        // Mitä haluan laittaa storeen => solvaa promisen
        () => invokeChannel(channels.GET_ROOM, { address }),
        // Minne kohtaan storea se laitetaan
        // - tallennetaan invokeChannelin payload getDiograph reducerilla diograph-kohtaan storea
        () => getRoom({ rootId, diograph, address })
      )
    })
    disconnect.forEach(({ address }) => {
      dispatch(updateConnection({ address, connected: false }))
    })
  }, [connect, disconnect, dispatchPromiseAction, dispatch])
}
