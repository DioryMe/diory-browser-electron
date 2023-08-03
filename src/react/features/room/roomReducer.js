import { SET_ROOM_CONNECTIONS, GET_ROOM, SAVE_ROOM } from './roomActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  id: undefined,
  connections: [],
  doors: [],
  updated: false,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  error: null,
}

export const setRoomConnections = (state, { payload }) => ({
  ...state,
  connections: payload.connections,
})

export const getRoom = (state, { payload }) => ({
  ...state,
  id: payload.id,
  doors: payload.doors,
  connections: payload.connections,
})

export default createReducer(initialState, {
  [SET_ROOM_CONNECTIONS]: setRoomConnections,
  ...promiseReducers(GET_ROOM, 'loading', 'loaded', 'error', getRoom),
  ...promiseReducers(SAVE_ROOM, 'saving', 'saved', 'error'),
})
