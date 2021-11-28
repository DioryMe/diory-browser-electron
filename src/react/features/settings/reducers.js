import { SET_DIORY_LOCATION } from './actionsTypes'
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

export default createReducer({
  [SET_DIORY_LOCATION]: setDioryFolderLocation,
})
