import { SET_DIORY_LOCATION, TOGGLE_SETTINGS_BAR } from './actionsTypes'

export const setDioryLocation = (dioryLocation) => ({
  type: SET_DIORY_LOCATION,
  payload: { dioryLocation },
})

export const toggleSettingsBar = () => ({
  type: TOGGLE_SETTINGS_BAR,
})
