import { ADD_LENS_BUTTON, SELECT_LENS } from './actionsTypes'
import { createReducer } from '../../store'

const DEFAULT_LENS = 'grid'

export const initialState = {
  selectedLensId: DEFAULT_LENS,
  lensButtons: [],
}

const addLensButton = (state, { payload }) => ({
  ...state,
  lensButtons: [...state.lensButtons, payload.diory],
})

const selectLens = (state, { payload }) => ({
  ...state,
  selectedLensId: payload.id || DEFAULT_LENS,
})

export default createReducer({
  [ADD_LENS_BUTTON]: addLensButton,
  [SELECT_LENS]: selectLens,
})
