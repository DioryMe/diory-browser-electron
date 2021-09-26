import { SET_QUERY, SET_SEARCH_RESULTS } from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  query: '',
  searchResults: [],
}

export const setQuery = (state, { payload }) => ({
  ...state,
  query: payload.query,
})

export const setSearchResults = (state, { payload }) => ({
  ...state,
  searchResults: payload.searchResults,
})

export default createReducer({
  [SET_QUERY]: setQuery,
  [SET_SEARCH_RESULTS]: setSearchResults,
})
