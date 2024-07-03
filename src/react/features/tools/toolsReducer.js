import { SELECT_TOOL, DESELECT_TOOL } from './toolsActionTypes'
import { createReducer } from '../../store'

const initialState = {
  selectedTool: null,
}

const selectTool = (state, { payload }) => ({
  ...state,
  selectedTool: payload.toolId,
})

const deselectTool = (state) => ({
  ...state,
  selectedTool: null,
})

export default createReducer(initialState, {
  [SELECT_TOOL]: selectTool,
  [DESELECT_TOOL]: deselectTool,
})
