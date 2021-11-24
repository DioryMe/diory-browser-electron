import { SET_DIORY_LOCATION } from './settingsActionTypes'

export const setDioryFolderLocation = (dioryFolderLocation) => ({
  type: SET_DIORY_LOCATION,
  payload: { dioryFolderLocation },
})
