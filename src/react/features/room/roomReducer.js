import { SET_ROOM_ADDRESS, GET_ROOM, SAVE_ROOM } from './roomActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  initializing: true,
  address: undefined,
  connections: [],
  history: [],
}

export const setRoomAddress = (state, { payload }) => ({
  ...state,
  initializing: false,
  address: payload.address,
})

export const getRoom = (state, { payload }) => ({
  ...state,
  connections: payload.connections,
})

export default createReducer(initialState, {
  [SET_ROOM_ADDRESS]: setRoomAddress,
  ...promiseReducers(GET_ROOM, 'loading', 'loaded', 'error', getRoom),
  ...promiseReducers(SAVE_ROOM, 'saving', 'saved', 'error'),
})
