import { GET_DIOSPHERE, SAVE_DIOSPHERE } from './diosphereActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  homeRoomId: undefined,
  rooms: {},
  updated: false,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  error: null,
}

export const getDiosphere = (state, { payload }) => ({
  ...state,
  homeRoomId: payload.homeRoomId,
  rooms: payload.rooms,
})

export default createReducer(initialState, {
  ...promiseReducers(GET_DIOSPHERE, 'loading', 'loaded', 'error', getDiosphere),
  ...promiseReducers(SAVE_DIOSPHERE, 'saving', 'saved', 'error'),
})
