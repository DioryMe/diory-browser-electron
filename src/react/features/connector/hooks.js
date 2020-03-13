import { useCallback, useEffect } from 'react'
import { channels } from '../../../shared/constants'
import { debounceDispatchActionPromise } from '../../utils'
import * as homeActionTypes from '../home/actionsTypes'
import * as roomActionTypes from '../room/actionsTypes'
import { addPath, setPaths } from './actions'
import { connect } from './client'

import { useDispatch, useStore } from '../../store'
import { addRoom, setRooms } from '../home/actions'
import { getRoom } from '../room/actions'

const useGetHome = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    connect(channels.GET_HOME).then(({ rooms }) => {
      dispatch(setPaths(rooms))
      dispatch(setRooms(rooms))
    })
  }, [dispatch])
}

const useSaveHome = () => {
  const [{ rooms, updated }] = useStore(state => state.home)
  const dispatch = useDispatch()
  useEffect(() => {
    if (updated) {
      debounceDispatchActionPromise(dispatch, homeActionTypes.SAVE_HOME, () =>
        connect(channels.SAVE_HOME, { rooms })
      )
    }
  }, [updated, rooms, dispatch])
}

export const useAddRoom = () => {
  const dispatch = useDispatch()

  const addNewRoom = useCallback(() => {
    window.nativeFileDialog
      .showOpenDialog({ properties: ['openDirectory'] })
      .then(result => {
        let filePath = result.filePaths[0]
        connect(channels.ADD_ROOM, filePath).then(room => {
          dispatch(addPath(room.id, filePath))
          dispatch(addRoom(room))
        })
      })
  }, [dispatch])

  return {
    addNewRoom,
  }
}

const useGetRoom = () => {
  const [{ roomId }] = useStore(state => state.navigation)
  const [{ paths }] = useStore(state => state.connector)
  const path = paths[roomId]

  const dispatch = useDispatch()
  useEffect(() => {
    if (roomId) {
      connect(channels.GET_ROOM, path).then(room => dispatch(getRoom(room)))
    }
  }, [roomId, path, dispatch])
}

const useSaveRoom = () => {
  const [{ id, diograph, updated }] = useStore(state => state.room)
  const [{ paths }] = useStore(state => state.connector)
  const path = paths[id]

  const dispatch = useDispatch()
  useEffect(() => {
    if (updated) {
      debounceDispatchActionPromise(dispatch, roomActionTypes.SAVE_ROOM, () =>
        connect(channels.SAVE_ROOM, { path, room: { id, diograph } })
      )
    }
  }, [updated, path, id, diograph, dispatch])
}

export const useChannel = () => {
  useGetHome()
  useSaveHome()
  useGetRoom()
  useSaveRoom()
}
