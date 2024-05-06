import { ADD_DIORY_TO_HAND, SELECT_TOOL, DESELECT_TOOL } from './toolsActionTypes'
import { createReducer } from '../../store'

const initialState = {
  selectedTool: null,
  hand: [],
}

const addDioryToHand = (state, { payload }) => ({
  ...state,
  hand: [payload.dioryId, ...state.hand.filter((dioryId) => dioryId !== payload.dioryId)],
})

const selectTool = (state, { payload }) => ({
  ...state,
  selectedTool: payload.toolId,
})

const deselectTool = (state) => ({
  ...state,
  selectedTool: null,
})

export default createReducer(initialState, {
  [ADD_DIORY_TO_HAND]: addDioryToHand,
  [SELECT_TOOL]: selectTool,
  [DESELECT_TOOL]: deselectTool,
})
