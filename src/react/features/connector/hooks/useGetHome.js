import { useEffect } from 'react'
import { useDispatch } from '../../../store'

import { enterRoom } from '../../navigation/actions'
import { setRooms } from '../../home/actions'
import { setPaths } from '../actions'

import { connect } from '../client'
import { channels } from '../../../../shared/constants'

export const useGetHome = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    connect(channels.GET_HOME).then(({ rooms, data }) => {
      dispatch(setPaths(rooms))
      dispatch(setRooms(rooms))
      dispatch(enterRoom(data.focus.room))
    })
  }, [dispatch])
}
