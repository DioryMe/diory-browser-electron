import { SET_DIORY_LOCATION, TOGGLE_SETTINGS_BAR } from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  initializing: true,
  dioryFolderLocation: undefined,
  showSettingsBar: false,
}

export const setDioryFolderLocation = (state, { payload }) => ({
  ...state,
  initializing: false,
  dioryFolderLocation: payload.dioryFolderLocation,
})

export const toggleSettingsBar = (state) => ({
  ...state,
  showSettingsBar: !state.showSettingsBar,
})

export default createReducer({
  [SET_DIORY_LOCATION]: setDioryFolderLocation,
  [TOGGLE_SETTINGS_BAR]: toggleSettingsBar,
})
