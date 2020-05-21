import { useEffect } from 'react'
import { useDispatch } from '../../../store'

import { getRoom } from '../../room/actions'
import { addPath } from '../actions'
import { enterRoom } from '../../navigation/actions'

import { connect } from '../client'
import { channels } from '../../../../shared/constants'

export const useGetRoom = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    connect(channels.GET_ROOM).then(({ id, path, diograph }) => {
      if (!diograph) {
        throw new Error(`Couldn't load diograph from path ${path}`)
      }

      dispatch(addPath(id, path))
      dispatch(enterRoom(id))
      dispatch(getRoom({ id, diograph }))
    })
  }, [dispatch])
}
