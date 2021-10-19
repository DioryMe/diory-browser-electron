import { useEffect } from 'react'
import { useDispatchActions } from '../../../store'

import { enterRoom, setFocus } from '../../navigation/actions'
import { getRoom } from '../../diograph/actions'

import { invokeChannel } from '../../../client/client'
import { channels } from '../../../../shared/constants'
// import { invokeAlertDialog } from '../../../client/alertDialog'
/*
 * Requests home & focus info via GET_HOME and sets the focus for room & diory
 * - saves the response to the store
 * - invoke an alert for each error
 */
export const useGetHomeEffect = () => {
  const { dispatch, dispatchPromiseAction } = useDispatchActions()

  useEffect(() => {
    invokeChannel(channels.GET_HOME).then(({ diographFolderPath, focus }) => {
      invokeChannel(channels.GET_ROOM, { address: diographFolderPath }).then(
        ({ rootId, diograph }) => {
          dispatchPromiseAction(
            () => invokeChannel(channels.GET_ROOM, { address: diographFolderPath }),
            () => getRoom({ rootId, diograph, address: diographFolderPath })
          ).then((yx, kax) => {
            dispatch(enterRoom({ id: focus.roomId }))
            dispatch(setFocus({ id: focus.dioryId }))
          })
        }
      )
    })
  }, [dispatch])
}
