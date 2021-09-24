import { useEffect } from 'react'
import { useDispatch } from '../../../store'

import { setRooms } from '../actions'
import { enterRoom, setFocus } from '../../navigation/actions'
import { setConnections } from '../../connectors/actions'

import { invokeChannel } from '../../../client/client'
import { channels } from '../../../../shared/constants'
import { invokeAlertDialog } from '../../../client/alertDialog'
/*
 * Requests home & focus info via GET_HOME and sets the focus for room & diory
 * - saves the response to the store
 * - invoke an alert for each error
 */
export const useGetHomeEffect = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    invokeChannel(channels.GET_HOME).then(({ rooms, connections, focus, errors }) => {
      errors.forEach((error) => {
        invokeAlertDialog(
          `Couldn't connect to room ${error.connectionURI}, path didn't exist. Please remove and re-add the room to reconnect.`
        )
      })
      dispatch(setRooms(rooms))
      dispatch(setConnections(connections))
      dispatch(enterRoom({ id: focus.roomId }))
      dispatch(setFocus({ id: focus.dioryId }))
    })
  }, [dispatch])
}
