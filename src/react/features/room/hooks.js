import { useEffect } from 'react'
import { debounceDispatchActionPromise } from '../../utils'
import { channels } from '../../../shared/constants'
import { useDispatch, useStore } from '../../store'
import { useDiorys } from '../../hooks'

import * as types from './actionsTypes'

import { fetchData } from '../../lib/ipcClient'

export const useGetRoom = () => {
  const [{ roomId }, dispatch] = useStore(state => state.navigation)
  useEffect(() => {
    if (roomId) {
      fetchData(channels.GET_ROOM, roomId).then(({ id, diograph }) =>
        dispatch({
          type: types.GET_ROOM,
          payload: { id, diograph },
        })
      )
    }
  }, [roomId, dispatch])
}

export const useSaveRoom = () => {
  const [{ id, diograph, updated }] = useStore(state => state.room)
  const dispatch = useDispatch()
  useEffect(() => {
    if (updated) {
      debounceDispatchActionPromise(dispatch, types.SAVE_ROOM, () => fetchData(channels.SAVE_ROOM, { id, diograph }))
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
