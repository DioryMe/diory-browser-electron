import { useEffect } from 'react'
import { channels } from '../../../shared/constants'
import { useStore } from '../../store'
import { useDiorys } from '../../hooks'

import * as types from './actionsTypes'

import { fetchData } from '../../lib/ipcClient'

export const useRoomChannel = () => {
  const [{ roomId }, dispatch] = useStore(state => state.navigation)
  useEffect(() => {
    if (roomId) {
      console.log(roomId)
      fetchData(channels.GET_ROOM, roomId)
        .then(({ diograph }) => dispatch({
          type: types.SET_DIOGRAPH,
          payload: { diograph },
        }))
    }
  }, [roomId, dispatch])
}

export const useDiograph = () => {
  const [{ diograph, updated }, dispatch] = useStore(state => state.room)
  const [{ roomId }] = useStore(state => state.navigation)
  useEffect(() => {
    if (updated) {
      dispatch({ type: types.SAVE_ROOM_BEGIN })
      fetchData(channels.SAVE_ROOM, { id: roomId, diograph })
        .then(() => dispatch({ type: types.SAVE_ROOM_SUCCESS }))
        .catch(() => dispatch({ type: types.SAVE_ROOM_FAILURE }))
    }
  }, [updated, roomId, diograph, dispatch])
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
