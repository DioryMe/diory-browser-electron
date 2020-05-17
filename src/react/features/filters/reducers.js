import { SET_TEXT_FILTER } from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  textFilter: undefined,
}

export const setTextFilter = (state, { payload }) => ({
  ...state,
  textFilter: payload.textFilter,
})

export default createReducer({
  [SET_TEXT_FILTER]: setTextFilter,
})
