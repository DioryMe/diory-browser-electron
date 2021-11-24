import { SELECT_LENS, ADD_LENS_BUTTON } from './lensesActionTypes'

export const selectLens = (id) => ({ type: SELECT_LENS, payload: { id } })

export const addLensButton = (button) => ({
  type: ADD_LENS_BUTTON,
  payload: { button },
})
