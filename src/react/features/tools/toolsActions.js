import {
  ADD_DIORY_TO_HAND,
  SELECT_TOOL,
  DESELECT_TOOL,
  SET_IMPORT_FOLDER_PATH,
  TOOLS_SELECT_STORY,
  TOOLS_ADD_DIOGRAPH,
} from './toolsActionTypes'
import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const addDioryToHand = (dioryId) => ({
  type: ADD_DIORY_TO_HAND,
  payload: { dioryId },
})

export const selectTool = (toolId) => ({
  type: SELECT_TOOL,
  payload: { toolId },
})

export const deselectTool = () => ({
  type: DESELECT_TOOL,
})

export const setImportFolderPath = (path) => ({
  type: SET_IMPORT_FOLDER_PATH,
  payload: { path },
})

export function selectFolderPath() {
  return async (dispatch) => {
    const { filePaths } = await invokeChannel('showOpenDialog')
    dispatch(setImportFolderPath(filePaths[0]))
  }
}

export const addDiograph = (diograph) => ({
  type: TOOLS_ADD_DIOGRAPH,
  payload: { diograph },
})

export const selectStory = (id) => ({
  type: TOOLS_SELECT_STORY,
  payload: { id },
})

export function generateDiograph(importFolderPath) {
  return async (dispatch, getState) => {
    const { address } = getState().room
    const { rootId, diograph = {} } = await invokeChannel(channels.IMPORT_FOLDER, {
      importFolderPath,
      address,
    })
    dispatch(addDiograph(diograph))
    dispatch(selectStory(rootId))
  }
}
