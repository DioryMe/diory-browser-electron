import { ADD_DIORY_TO_HAND, SELECT_TOOL, DESELECT_TOOL } from './toolsActionTypes'

export const addDioryToHand = (diory) => ({
  type: ADD_DIORY_TO_HAND,
  payload: { diory },
})

export const selectTool = (toolId) => ({
  type: SELECT_TOOL,
  payload: { toolId },
})

export const deselectTool = () => ({
  type: DESELECT_TOOL,
})
