import { ADD_BUTTONS, REMOVE_BUTTONS, SET_OPEN, SET_ACTIVE } from './actionsTypes'

export const addButtons = (addedButtons) => ({
  type: ADD_BUTTONS,
  payload: { addedButtons },
})

export const removeButtons = (removedButtons) => ({
  type: REMOVE_BUTTONS,
  payload: { removedButtons },
})

export const setOpen = (open) => ({
  type: SET_OPEN,
  payload: { open },
})

export const setActive = (buttonId) => ({
  type: SET_ACTIVE,
  payload: { buttonId },
})
