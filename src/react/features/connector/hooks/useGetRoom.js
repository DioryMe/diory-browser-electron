import { useEffect } from 'react'
import { useDispatch } from '../../../store'

import { getRoom } from '../../room/actions'
import { setPaths } from '../actions'
import { enterRoom } from '../../navigation/actions'

import { connect } from '../client'
import { channels } from '../../../../shared/constants'

export const useGetRoom = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    connect(channels.GET_ROOM).then(({ roomId, path, diograph }) => {
      if (!diograph) {
        throw new Error(`Couldn't load diograph from path ${path}`)
      }

      // Convert path & roomId to a format that setPaths understand
      const rooms = {
        [path]: {
          id: roomId,
        },
      }

      dispatch(setPaths(rooms))
      dispatch(enterRoom(roomId))
      dispatch(getRoom({ id: roomId, diograph }))
    })
  }, [dispatch])
}
