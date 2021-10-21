import { SELECT_LENS, ADD_LENS_BUTTONS, REMOVE_LENS_BUTTONS } from './actionsTypes'

export const selectLens = (id) => ({ type: SELECT_LENS, payload: { id } })

export const addLensButtons = (buttons) => ({
  type: ADD_LENS_BUTTONS,
  payload: { buttons },
})

export const removeLensButtons = (buttons) => ({
  type: REMOVE_LENS_BUTTONS,
  payload: { buttons },
})
