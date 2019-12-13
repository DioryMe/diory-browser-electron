import * as types from '../actions'
import createReducer from './createReducer'

export const initialState = {
  selectedLensId: 'files',
  lenses: [],
}

export const selectLens = (state, { payload }) => ({
  ...state,
  selectedLensId: payload.id,
})

export default createReducer({
  [types.SELECT_LENS]: selectLens,
})
