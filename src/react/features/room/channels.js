import { useEffect } from 'react'
import { channels } from '../../../shared/constants'
import { setDiograph } from './actions'
import { useStore } from '../../store'

const { ipcRenderer } = window

const useRoomChannel = () => {
  const [{ room }, dispatch] = useStore(state => state.navigation)
  useEffect(() => {
    if (room) {
      ipcRenderer.send(channels.ROOM, room)
      ipcRenderer.on(channels.ROOM, (event, data) => {
        console.log(data)
        const { diograph } = data
        dispatch(setDiograph(diograph))
      })
    }
    return () => ipcRenderer.removeAllListeners(channels.ROOM)
  },[room, dispatch])
}

export default useRoomChannel
