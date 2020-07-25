import { ADD_BUTTONS, REMOVE_BUTTONS, SET_OPEN } from './actionsTypes'

export const addButtons = (buttons) => ({
  type: ADD_BUTTONS,
  payload: { buttons },
})

export const removeButtons = (buttons) => ({
  type: REMOVE_BUTTONS,
  payload: { buttons },
})

export const setOpen = (open) => ({
  type: SET_OPEN,
  payload: { open },
})
