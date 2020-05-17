import { SELECT_LENS } from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  selectedLensId: undefined,
  lenses: [],
}

export const selectLens = (state, { payload }) => ({
  ...state,
  selectedLensId: payload.id,
})

export default createReducer({
  [SELECT_LENS]: selectLens,
})
