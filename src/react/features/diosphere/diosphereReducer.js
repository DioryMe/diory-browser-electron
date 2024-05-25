import { GET_DIOSPHERE, UPDATE_DIOSPHERE } from './diosphereActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  rooms: {},
}

export const updateDiosphere = (state, { payload: { diosphere } }) => ({
  ...state,
  rooms: diosphere.rooms,
})

export default createReducer(initialState, {
  [UPDATE_DIOSPHERE]: updateDiosphere,
  ...promiseReducers(GET_DIOSPHERE, 'loading', 'loaded', 'error'),
})
