import * as types from '../actions/actionTypes'
import createReducer from './createReducer'

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
