import { ADD_DIORY_TO_HAND, SELECT_TOOL, DESELECT_TOOL } from './toolsActionTypes'

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
