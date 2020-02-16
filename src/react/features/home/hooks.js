import { useCallback, useEffect } from 'react'
import { channels } from '../../../shared/constants'
import { fetchData } from '../../lib/ipcClient'
import { useStore } from '../../store'
import { addRoom, setRooms } from './actions'

export const useHomeChannel = () => {
  const dispatch = useStore()[1]
  useEffect(() => {
    // FIXME: For some reason this doesn't work...
    fetchData(channels.GET_HOME).then(({ rooms }) => {
      dispatch(setRooms(rooms))
    })
    // ...but with this cucumber tests pass but build or localhost:3300 doesn't work...
    // ipcRenderer.send(channels.GET_HOME)
    // ipcRenderer.on(channels.GET_HOME, (event, { rooms }) =>
    //   dispatch(setRooms(rooms))
    // )
    // return () => ipcRenderer.removeAllListeners(channels.HOME)
    // end of FIXME
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
