import { useEffect } from 'react'
import { channels } from '../../../shared/constants'
import { useStore } from '../../store'
import { setRooms } from './actions'

const { ipcRenderer } = window

export const useHomeChannel = () => {
  const dispatch = useStore()[1]
  useEffect(() => {
    ipcRenderer.send(channels.GET_HOME)
    ipcRenderer.on(channels.GET_HOME, (event, { rooms }) =>
      dispatch(setRooms(rooms))
    )
    return () => ipcRenderer.removeAllListeners(channels.HOME)
  }, [dispatch])
}

export const addNewRoom = () => {
  let filePath
  // FILE DIALOG IS NOT USED BECAUSE BACKEND USES DEFAULT EXAMPLE-FOLDER FILEPATH
  // window.nativeFileDialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
    // let filePath = result.filePaths[0]
    ipcRenderer.send(channels.CREATE_ROOM, filePath)
    ipcRenderer.on(channels.CREATE_ROOM, (event, diographData) => {
      console.log(diographData)
    })
  // })
}
