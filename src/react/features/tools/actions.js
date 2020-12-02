import { ADD_DIORY_TO_HAND } from './actionsTypes'

export const addDioryToHand = (dioryId) => ({
  type: ADD_DIORY_TO_HAND,
  payload: { dioryId },
})
