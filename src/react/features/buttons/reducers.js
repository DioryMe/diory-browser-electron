import { ADD_BUTTONS, REMOVE_BUTTONS, SET_OPEN, SET_ACTIVE, SET_INACTIVE } from './actionsTypes'
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

const setOpen = (state, { payload: { open } }) => ({
  ...state,
  open,
})

export const setActive = (state, { payload: { buttonId } }) => ({
  ...state,
  active: buttonId,
})

export const setInactive = (state) => ({
  ...state,
  active: null,
  open: false,
})

export default createReducer({
  [ADD_BUTTONS]: addButtons,
  [REMOVE_BUTTONS]: removeButtons,
  [SET_OPEN]: setOpen,
  [SET_ACTIVE]: setActive,
  [SET_INACTIVE]: setInactive,
})
