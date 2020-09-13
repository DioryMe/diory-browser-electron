import { ADD_BUTTONS, REMOVE_BUTTONS, SET_OPEN } from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  buttons: {},
  open: false,
}

const addButtons = (state, { payload }) => ({
  ...state,
  buttons: payload.buttons.reduce(
    (initialButtons, button) => ({
      ...initialButtons,
      [button.id]: button,
    }),
    state.buttons
  ),
})

const removeButtons = (state, { payload }) => ({
  ...state,
  buttons: payload.buttons.reduce((initialButtons, button) => {
    // eslint-disable-next-line no-unused-vars
    const { [button.id]: remove, ...buttons } = initialButtons
    return buttons
  }, state.buttons),
})

const setOpen = (state, { payload }) => ({
  ...state,
  open: payload.open,
})

export default createReducer({
  [ADD_BUTTONS]: addButtons,
  [REMOVE_BUTTONS]: removeButtons,
  [SET_OPEN]: setOpen,
})
