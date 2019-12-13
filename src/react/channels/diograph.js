import { useEffect } from 'react'
import { channels } from '../../shared/constants'
import { useStore } from '../store'
import  { setDiograph } from '../actions/diograph'
import { setFocus } from '../actions/navigation'

const { ipcRenderer } = window

const useDiographChannel = () => {
  const [, dispatch] = useStore(state => state.diograph)
  useEffect(() => {
    ipcRenderer.send(channels.DIOGRAPH)
    ipcRenderer.on(channels.DIOGRAPH, (event, data) => {
      const { id, diograph } = data
      dispatch(setDiograph(diograph))
      dispatch(setFocus(id))
    })
    return () => ipcRenderer.removeAllListeners(channels.DIOGRAPH)
  },[dispatch])
}

export default useDiographChannel
