import { useEffect } from 'react'
import { channels } from '../../shared/constants'
import { useStore } from '../store'
import  { setRooms } from '../actions/home'

const { ipcRenderer } = window

const useHomeChannel = () => {
  const [{}, dispatch] = useStore()
  useEffect(() => {
    ipcRenderer.send(channels.HOME)
    ipcRenderer.on(channels.HOME, (event, { rooms }) => dispatch(setRooms(rooms)))
    return () => ipcRenderer.removeAllListeners(channels.HOME)
  },[ dispatch])
}

export default useHomeChannel
