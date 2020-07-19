import { ADD_BUTTONS, REMOVE_BUTTONS } from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  buttons: {},
}

export const addButtons = (state, { payload }) => ({
  ...state,
  buttons: payload.buttons.reduce(
    (initialButtons, button) => ({
      ...initialButtons,
      [button.id]: button,
    }),
    state.buttons
  ),
})

export const removeButtons = (state, { payload }) => ({
  ...state,
  buttons: payload.buttons.reduce((initialButtons, button) => {
    const { [button.id]: remove, ...buttons } = initialButtons
    return buttons
  }, state.buttons),
})

export default createReducer({
  [ADD_BUTTONS]: addButtons,
  [REMOVE_BUTTONS]: removeButtons,
})
