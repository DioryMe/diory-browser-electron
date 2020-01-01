import { useEffect } from 'react'
import { channels } from '../../../shared/constants'
import { useStore } from '../../store'
import { useDiorys } from '../../hooks'

import { setDiograph } from './actions'
import * as types from './actionsTypes'

import { updateRoom } from '../../lib/ipcClient'

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
  }, [room, dispatch])
}

export const useDiograph = () => {
  const [{ diograph, updated }, dispatch] = useStore(state => state.room)
  const [{ room }] = useStore(state => state.navigation)
  useEffect(() => {
    if (updated) {
      dispatch({ type: types.UPDATE_ROOM_BEGIN })
      updateRoom({ id: room, diograph })
        .then(() => dispatch({ type: types.UPDATE_ROOM_SUCCESS }))
        .catch(() => dispatch({ type: types.UPDATE_ROOM_FAILURE }))
    }
  }, [updated, room, diograph, dispatch])
}

export const useFocusDiory = () => {
  const [{ focus }] = useStore(state => state.navigation)
  const [{ diograph }] = useStore(state => state.room)
  const diory = diograph[focus]
  return {
    diory,
    diorys: useDiorys(diory && diory.links),
  }
}
