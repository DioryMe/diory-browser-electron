import { UPDATE_DIOSPHERE } from './diosphereActionTypes'
import { createReducer } from '../../store'

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
})
