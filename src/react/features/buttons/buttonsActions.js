import {
  ADD_BUTTONS,
  REMOVE_BUTTONS,
  OPEN_BUTTONS,
  ACTIVATE_BUTTON,
  INACTIVATE_BUTTON,
} from './buttonsActionTypes'

export const addButtons = (addedButtons) => ({
  type: ADD_BUTTONS,
  payload: { addedButtons },
})

export const removeButtons = (removedButtons) => ({
  type: REMOVE_BUTTONS,
  payload: { removedButtons },
})

export const openButtons = (open) => ({
  type: OPEN_BUTTONS,
  payload: { open },
})

export const activateButton = (buttonId) => ({
  type: ACTIVATE_BUTTON,
  payload: { buttonId },
})

export const inactivateButton = () => ({
  type: INACTIVATE_BUTTON,
})
