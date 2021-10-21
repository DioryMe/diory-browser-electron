import { ADD_LENS_BUTTONS, REMOVE_LENS_BUTTONS, SELECT_LENS } from './actionsTypes'
import { createReducer } from '../../store'

const DEFAULT_LENS = 'grid'

export const initialState = {
  selectedLensId: DEFAULT_LENS,
  buttons: {},
}

const selectLens = (state, { payload }) => ({
  ...state,
  selectedLensId: payload.id || DEFAULT_LENS,
})

const addLensButtons = (state, { payload }) => ({
  ...state,
  buttons: payload.buttons.reduce(
    (initialButtons, button) => ({
      ...initialButtons,
      [button.id]: button,
    }),
    state.buttons
  ),
})

const removeLensButtons = (state, { payload }) => ({
  ...state,
  buttons: payload.buttons.reduce((initialButtons, button) => {
    // eslint-disable-next-line no-unused-vars
    const { [button.id]: omit, ...buttons } = initialButtons
    return buttons
  }, state.buttons),
})

export default createReducer({
  [SELECT_LENS]: selectLens,
  [ADD_LENS_BUTTONS]: addLensButtons,
  [REMOVE_LENS_BUTTONS]: removeLensButtons,
})
