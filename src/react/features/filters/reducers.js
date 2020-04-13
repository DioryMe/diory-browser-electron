import * as types from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  textFilter: undefined,
}

export const setTextFilter = (state, { payload }) => ({
  ...state,
  textFilter: payload.textFilter,
})

export default createReducer({
  [types.SET_TEXT_FILTER]: setTextFilter,
})
