import { SET_QUERY, TOGGLE_SEARCH_BAR } from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  query: '',
  showSearchBar: false,
}

export const setQuery = (state, { payload }) => ({
  ...state,
  query: payload.query,
})

export const toggleSearchBar = (state) => ({
  ...state,
  query: '',
  showSearchBar: !state.showSearchBar,
})

export default createReducer({
  [SET_QUERY]: setQuery,
  [TOGGLE_SEARCH_BAR]: toggleSearchBar,
})
