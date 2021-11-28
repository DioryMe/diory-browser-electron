import { SET_DIORY_LOCATION } from './actionsTypes'

export const setDioryFolderLocation = (dioryFolderLocation) => ({
  type: SET_DIORY_LOCATION,
  payload: { dioryFolderLocation },
})
