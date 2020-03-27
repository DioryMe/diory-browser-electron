import { useCallback } from 'react'
import { useDispatch } from '../../../store'

import { addRoom } from '../../home/actions'
import { addPath } from '../actions'

import { connect } from '../client'
import { channels } from '../../../../shared/constants'

export const useAddRoom = () => {
  const dispatch = useDispatch()

  const addNewRoom = useCallback(() => {
    window.nativeFileDialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
      const path = result.filePaths[0]
      connect(channels.ADD_ROOM, path).then(room => {
        dispatch(addPath(room.id, path))
        dispatch(addRoom(room))
      })
    })
  }, [dispatch])

  return {
    addNewRoom,
  }
}
