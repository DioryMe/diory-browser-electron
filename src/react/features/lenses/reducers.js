import * as types from './actionsTypes'
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
  [types.SELECT_LENS]: selectLens,
})
