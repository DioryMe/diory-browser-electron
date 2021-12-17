import { ADD_LENS_BUTTON, SELECT_LENS } from './lensesActionTypes'
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

const addLensButton = (state, { payload }) => ({
  ...state,
  buttons: {
    ...state.buttons,
    [payload.button.id]: payload.button,
  },
})

export default createReducer(initialState, {
  [SELECT_LENS]: selectLens,
  [ADD_LENS_BUTTON]: addLensButton,
})
