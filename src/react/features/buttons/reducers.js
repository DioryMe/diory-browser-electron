import { ADD_BUTTONS, REMOVE_BUTTONS, SET_OPEN, SET_ACTIVE, SET_INACTIVE } from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  buttons: {},
  active: null,
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
    const { [button.id]: remove, ...buttons } = initialButtons
    return buttons
  }, state.buttons),
})

const setOpen = (state, { payload }) => ({
  ...state,
  open: payload.open,
})

export const setActive = (state, { payload }) => ({
  ...state,
  active: payload.active,
})

export const setInactive = (state) => ({
  ...state,
  active: null,
})

export default createReducer({
  [ADD_BUTTONS]: addButtons,
  [REMOVE_BUTTONS]: removeButtons,
  [SET_OPEN]: setOpen,
  [SET_ACTIVE]: setActive,
  [SET_INACTIVE]: setInactive,
})
