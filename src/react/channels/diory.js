import { useEffect } from 'react'
import { channels } from '../../shared/constants'
import { useStore } from '../store'
import  { addDiory } from '../actions/diograph'

const { ipcRenderer } = window

const useDioryChannel = () => {
  const [, dispatch] = useStore(state => state.diograph)
  useEffect(() => {
    ipcRenderer.send(channels.DIORY)
    ipcRenderer.on(channels.DIORY, (event, data) => {
      const { diory } = data
      dispatch(addDiory(diory))
    })
    return () => ipcRenderer.removeAllListeners(channels.DIORY)
  },[dispatch])
}

export default useDioryChannel
