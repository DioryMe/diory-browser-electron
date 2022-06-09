import {
  ADD_DIORY_TO_HAND_SUCCESS,
  SELECT_TOOL,
  DESELECT_TOOL,
  SET_IMPORT_FOLDER_PATH,
  TOOLS_SELECT_STORY,
  TOOLS_ADD_DIOGRAPH,
} from './toolsActionTypes'
import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

export const addDioryToHand =
  (dioryId) =>
  async (dispatch, getState, { client }) => {
    const { diograph } = getState().diograph
    const [diory] = await client.getDiories(dioryId, false, diograph)
    dispatch(addDioryToHandSuccess({ diory }))
  }

export const addDioryToHandSuccess = (payload) => ({
  type: ADD_DIORY_TO_HAND_SUCCESS,
  payload,
})

export const selectTool = (toolId) => ({
  type: SELECT_TOOL,
  payload: { toolId },
})

export const deselectTool = () => ({
  type: DESELECT_TOOL,
})

export function selectFolderPath() {
  return async (dispatch) => {
    const { filePaths } = await invokeChannel('showOpenDialog')
    dispatch(setImportFolderPath(filePaths[0]))
  }
}

export const setImportFolderPath = (path) => ({
  type: SET_IMPORT_FOLDER_PATH,
  payload: { path },
})

export function generateDiograph(importFolderPath) {
  return async (dispatch, getState) => {
    const { dioryFolderLocation } = getState().settings
    const { rootId, diograph = {} } = await invokeChannel(channels.IMPORT_FOLDER, {
      importFolderPath,
      dioryFolderLocation,
    })
    dispatch(addDiograph(diograph))
    dispatch(selectStory(rootId))
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
