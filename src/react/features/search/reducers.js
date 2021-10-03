import { SET_QUERY, SET_SEARCH_RESULTS, TOGGLE_SEARCH_BAR } from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  query: '',
  searchResults: [],
  active: false,
}

export const setQuery = (state, { payload }) => ({
  ...state,
  query: payload.query,
})

export const setSearchResults = (state, { payload }) => ({
  ...state,
  searchResults: payload.searchResults,
})

export const toggleSearchBar = (state) => ({
  ...state,
  query: '',
  searchResults: [],
  active: !state.active,
})

export default createReducer({
  [SET_QUERY]: setQuery,
  [SET_SEARCH_RESULTS]: setSearchResults,
  [TOGGLE_SEARCH_BAR]: toggleSearchBar,
})
