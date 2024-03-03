import { GET_DIOSPHERE, SAVE_DIOSPHERE, UPDATE_DIOSPHERE } from './diosphereActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  rooms: {},
  updated: false,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  error: null,
}

export const updateDiosphere = (state, { payload: { rooms } }) => ({
  ...state,
  rooms,
})

export default createReducer(initialState, {
  [UPDATE_DIOSPHERE]: updateDiosphere,
  ...promiseReducers(GET_DIOSPHERE, 'loading', 'loaded', 'error', updateDiosphere),
  ...promiseReducers(SAVE_DIOSPHERE, 'saving', 'saved', 'error'),
})
