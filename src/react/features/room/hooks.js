import { useEffect } from 'react'
import { channels } from '../../../shared/constants'
import { useStore } from '../../store'
import { useDiorys } from '../../hooks'

import { setFocus } from '../navigation/actions'
import { setDiograph } from './actions'

const { ipcRenderer } = window

export const useRoomChannel = () => {
  const [{ room }, dispatch] = useStore(state => state.navigation)
  useEffect(() => {
    if (room) {
      ipcRenderer.send(channels.ROOM, room)
      ipcRenderer.on(channels.ROOM, (event, data) => {
        const { diograph } = data
        dispatch(setDiograph(diograph))
      })
    }
    return () => ipcRenderer.removeAllListeners(channels.ROOM)
  },[room, dispatch])
}

export const useFocusDiory = () => {
  const [{ focus }, dispatch] = useStore((state) => state.navigation)
  const [{ diograph }] = useStore((state) => state.room)
  const diory = diograph[focus]
  return {
    diory,
    diorys: useDiorys(diory && diory.links),
    setFocus: (props) => dispatch(setFocus(props))
  }
}
