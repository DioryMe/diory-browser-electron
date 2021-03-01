import { ADD_LENS_BUTTON, SELECT_LENS } from './actionsTypes'

export const addLensButton = (diory) => ({
  type: ADD_LENS_BUTTON,
  payload: { diory },
})

export const selectLens = (id) => ({
  type: SELECT_LENS,
  payload: { id },
})
