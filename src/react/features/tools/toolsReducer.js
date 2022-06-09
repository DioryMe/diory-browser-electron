import {
  ADD_DIORY_TO_HAND_SUCCESS,
  SELECT_TOOL,
  DESELECT_TOOL,
  SET_IMPORT_FOLDER_PATH,
  TOOLS_SELECT_STORY,
  TOOLS_ADD_DIOGRAPH,
} from './toolsActionTypes'
import { createReducer } from '../../store'

const initialState = {
  selectedTool: null,
  importFolderPath: null,
  selectedStoryId: null,
  diograph: {},
  hand: [],
}

const addDioryToHandSuccess = (state, { payload }) => ({
  ...state,
  hand: [payload.diory, ...state.hand.filter(({ id }) => id !== payload.diory.id)],
})

const selectTool = (state, { payload }) => ({
  ...state,
  selectedTool: payload.toolId,
})

const deselectTool = (state) => ({
  ...state,
  selectedTool: null,
})

const setImportFolderPath = (state, { payload }) => ({
  ...state,
  importFolderPath: payload.path,
})

const addDiograph = (state, { payload }) => ({
  ...state,
  diograph: payload.diograph,
})

const selectStoryId = (state, { payload }) => ({
  ...state,
  selectedStoryId: payload.id,
})

export default createReducer(initialState, {
  [ADD_DIORY_TO_HAND_SUCCESS]: addDioryToHandSuccess,
  [SELECT_TOOL]: selectTool,
  [DESELECT_TOOL]: deselectTool,
  [SET_IMPORT_FOLDER_PATH]: setImportFolderPath,
  [TOOLS_ADD_DIOGRAPH]: addDiograph,
  [TOOLS_SELECT_STORY]: selectStoryId,
})
