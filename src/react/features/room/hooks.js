import { useEffect } from 'react'
import { channels } from '../../../shared/constants'
import { useStore } from '../../store'
import { useDiorys } from '../../hooks'

import * as types from './actionsTypes'

import { fetchData } from '../../lib/ipcClient'

export const useGetRoom = () => {
  const [{ roomId }, dispatch] = useStore(state => state.navigation)
  useEffect(() => {
    if (roomId) {
      console.log(roomId)
      fetchData(channels.GET_ROOM, roomId)
        .then(({ id, diograph }) => dispatch({
          type: types.GET_ROOM,
          payload: { id, diograph },
        }))
    }
  }, [roomId, dispatch])
}

export const useSaveRoom = () => {
  const [{ id, diograph, updated }, dispatch] = useStore(state => state.room)
  useEffect(() => {
    if (updated) {
      dispatch({ type: types.SAVE_ROOM_BEGIN })
      fetchData(channels.SAVE_ROOM, { id, diograph })
        .then(() => dispatch({ type: types.SAVE_ROOM_SUCCESS }))
        .catch(() => dispatch({ type: types.SAVE_ROOM_FAILURE }))
    }
  }, [updated, id, diograph, dispatch])
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
