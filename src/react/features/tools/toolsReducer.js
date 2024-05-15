import { ADD_DIORY_TO_HAND, CLEAR_HAND, SELECT_TOOL, DESELECT_TOOL } from './toolsActionTypes'
import { createReducer } from '../../store'

const initialState = {
  selectedTool: null,
  hand: [],
}

const addDioryToHand = (state, { payload }) => ({
  ...state,
  hand: [payload.diory, ...state.hand.filter((diory) => diory !== payload.diory)],
})

const clearHand = (state) => ({
  ...state,
  hand: [],
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
  [CLEAR_HAND]: clearHand,
  [SELECT_TOOL]: selectTool,
  [DESELECT_TOOL]: deselectTool,
})
