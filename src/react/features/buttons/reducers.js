import {
  ADD_BUTTONS,
  REMOVE_BUTTONS,
  OPEN_BUTTONS,
  ACTIVATE_BUTTON,
  INACTIVATE_BUTTON,
} from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  buttons: {},
  active: null,
  open: false,
}

const addButtons = (state, { payload: { addedButtons } }) => ({
  ...state,
  buttons: addedButtons.reduce(
    (initialButtons, button) => ({
      ...initialButtons,
      [button.id]: button,
    }),
    state.buttons
  ),
})

const removeButtons = (state, { payload: { removedButtons } }) => ({
  ...state,
  buttons: removedButtons.reduce((initialButtons, button) => {
    // eslint-disable-next-line no-unused-vars
    const { [button.id]: omit, ...buttons } = initialButtons
    return buttons
  }, state.buttons),
})

const openButtons = (state) => ({
  ...state,
  open: true,
})

const activateButton = (state, { payload: { buttonId } }) => ({
  ...state,
  active: buttonId,
})

const inactivateButton = (state) => ({
  ...state,
  active: null,
  open: false,
})

export default createReducer({
  [ADD_BUTTONS]: addButtons,
  [REMOVE_BUTTONS]: removeButtons,
  [OPEN_BUTTONS]: openButtons,
  [ACTIVATE_BUTTON]: activateButton,
  [INACTIVATE_BUTTON]: inactivateButton,
})
