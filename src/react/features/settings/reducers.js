import { SET_DIORY_LOCATION, TOGGLE_SETTINGS_BAR } from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  initializing: true,
  dioryLocation: undefined,
  showSettingsBar: false,
}

export const setDioryLocation = (state, { payload }) => ({
  ...state,
  initializing: false,
  dioryLocation: payload.dioryLocation,
})

export const toggleSettingsBar = (state) => ({
  ...state,
  showSettingsBar: !state.showSettingsBar,
})

export default createReducer({
  [SET_DIORY_LOCATION]: setDioryLocation,
  [TOGGLE_SETTINGS_BAR]: toggleSettingsBar,
})
