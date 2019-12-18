import { useEffect } from 'react'
import { channels } from '../../../shared/constants'
import { useStore } from '../../store'
import  { setRooms } from './actions'

const { ipcRenderer } = window

export const useHomeChannel = () => {
  const dispatch = useStore()[1]
  useEffect(() => {
    ipcRenderer.send(channels.HOME)
    ipcRenderer.on(channels.HOME, (event, { rooms }) => dispatch(setRooms(rooms)))
    return () => ipcRenderer.removeAllListeners(channels.HOME)
  },[ dispatch])
}
