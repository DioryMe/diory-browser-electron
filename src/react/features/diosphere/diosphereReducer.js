import { UPDATE_DIOSPHERE, ENTER_ROOM } from './diosphereActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  rooms: {},
  updated: false,
}

export const updateDiosphere = (state, { payload: { diosphere } }) => ({
  ...state,
  rooms: diosphere.rooms,
  updated: false,
})

export default createReducer(initialState, {
  [UPDATE_DIOSPHERE]: updateDiosphere,
  ...promiseReducers(ENTER_ROOM, 'loading', 'loaded', 'error'),
})
