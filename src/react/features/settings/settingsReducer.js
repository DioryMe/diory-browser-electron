import { SET_DIORY_LOCATION } from './settingsActionTypes'
import { createReducer } from '../../store'

export const initialState = {
  initializing: true,
  dioryFolderLocation: undefined,
}

export const setDioryFolderLocation = (state, { payload }) => ({
  ...state,
  initializing: false,
  dioryFolderLocation: payload.dioryFolderLocation,
})

export default createReducer(initialState, {
  [SET_DIORY_LOCATION]: setDioryFolderLocation,
})
