import { SELECT_TOOL, DESELECT_TOOL } from './toolsActionTypes'

export const selectTool = (toolId) => ({
  type: SELECT_TOOL,
  payload: { toolId },
})

export const deselectTool = () => ({
  type: DESELECT_TOOL,
})
