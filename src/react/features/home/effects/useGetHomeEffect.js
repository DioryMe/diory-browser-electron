import { useEffect } from 'react'
import { useDispatch } from '../../../store'

import { enterRoom, setFocus } from '../../navigation/actions'
import { setRooms } from '../actions'
import { setConnections } from '../../connectors/actions'

import { openChannel } from '../../../client/client'
import { channels } from '../../../../shared/constants'

export const useGetHomeEffect = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    openChannel(channels.GET_HOME).then(({ rooms, connections, focus }) => {
      dispatch(setConnections(connections))
      dispatch(setRooms(rooms))
      dispatch(enterRoom({ id: focus.roomId }))
      dispatch(setFocus({ focus: rooms[focus.roomId].root }))
    })
  }, [dispatch])
}
