import { useCallback, useEffect } from 'react'
import { channels } from '../../../shared/constants'
import { fetchData } from '../../lib/ipcClient'
import { useStore } from '../../store'
import { addRoom, setRooms } from './actions'

export const useHomeChannel = () => {
  const dispatch = useStore()[1]
  useEffect(() => {
    fetchData(channels.GET_HOME).then(({ rooms }) =>
      dispatch(setRooms(rooms))
    )
  }, [dispatch])
}

export const useAddRoom = () => {
  const dispatch = useStore()[1]

  const addNewRoom = useCallback(() => {
    window.nativeFileDialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
      let filePath = result.filePaths[0]
      fetchData(channels.CREATE_ROOM, filePath).then(room => {
        dispatch(addRoom(room))
      })
    })
  }, [dispatch])

  return {
    addNewRoom
  }
}
