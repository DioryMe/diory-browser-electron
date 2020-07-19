import { ADD_BUTTONS, REMOVE_BUTTONS } from './actionsTypes'

export const addButtons = (buttons) => ({
  type: ADD_BUTTONS,
  payload: { buttons },
})

export const removeButtons = (buttons) => ({
  type: REMOVE_BUTTONS,
  payload: { buttons },
})
