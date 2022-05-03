import { ADD_DIORY_TO_HAND, SELECT_TOOL } from './toolsActionTypes'

export const addDioryToHand = (dioryId) => ({
  type: ADD_DIORY_TO_HAND,
  payload: { dioryId },
})

export const selectTool = (toolId) => ({
  type: SELECT_TOOL,
  payload: { toolId },
})
