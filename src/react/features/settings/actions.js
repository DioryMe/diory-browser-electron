import { SET_DIORY_LOCATION, TOGGLE_SETTINGS_BAR } from './actionsTypes'

export const setDioryFolderLocation = (dioryFolderLocation) => ({
  type: SET_DIORY_LOCATION,
  payload: { dioryFolderLocation },
})

export const toggleSettingsBar = () => ({
  type: TOGGLE_SETTINGS_BAR,
})
