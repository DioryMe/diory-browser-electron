import { useEffect } from 'react'
import { useDispatchActions } from '../../../store'

import { enterRoom, setFocus } from '../../navigation/actions'

import { invokeChannel } from '../../../client/client'
import { channels } from '../../../../shared/constants'
import { invokeAlertDialog } from '../../../client/alertDialog'

export const useGetHomeEffect = () => {
  const { dispatch } = useDispatchActions()

  useEffect(() => {
    invokeChannel(channels.GET_DIOGRAPH).then(({ rootId, diograph }) => {
      if (!rootId) {
        invokeAlertDialog('Error getting diograph')
      }

      // TODO: PUT DIOGRAPH IN STORE => needs own store action (GET_ROOM used to do this)

      dispatch(enterRoom({ id: rootId }))
      dispatch(setFocus({ id: rootId }))
    })
  }, [dispatch])
}
