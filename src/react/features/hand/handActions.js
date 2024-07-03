import { ADD_DIORY_TO_HAND, CLEAR_HAND } from './handActionTypes'

export const addDioryToHand = (diory) => ({
  type: ADD_DIORY_TO_HAND,
  payload: { diory },
})

export const clearHand = () => ({
  type: CLEAR_HAND,
})
