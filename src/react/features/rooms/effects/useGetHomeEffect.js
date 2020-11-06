import { useEffect } from 'react'
import { useDispatch } from '../../../store'

import { setRooms } from '../actions'
import { enterRoom, setFocus } from '../../navigation/actions'
import { setConnections } from '../../connectors/actions'

import { openChannel } from '../../../client/client'
import { channels } from '../../../../shared/constants'

export const useGetHomeEffect = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    openChannel(channels.GET_HOME).then(({ rooms, connections, focus }) => {
      dispatch(setRooms(rooms))
      dispatch(setConnections(connections))
      dispatch(enterRoom({ id: focus.roomId }))
      dispatch(setFocus({ focus: focus.dioryId }))
    })
  }, [dispatch])
}
