import { SELECT_LENS } from './actionsTypes'
import { createReducer } from '../../store'

const DEFAULT_LENS = 'grid'

export const initialState = {
  selectedLensId: DEFAULT_LENS,
  lenses: [],
}

export const selectLens = (state, { payload }) => ({
  ...state,
  selectedLensId: payload.id || DEFAULT_LENS,
})

export default createReducer({
  [SELECT_LENS]: selectLens,
})
