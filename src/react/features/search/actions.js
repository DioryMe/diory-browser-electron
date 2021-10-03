import { SET_QUERY, SET_SEARCH_RESULTS, TOGGLE_SEARCH_BAR } from './actionsTypes'

export const setQuery = (query) => ({
  type: SET_QUERY,
  payload: { query },
})

export const setSearchResults = (searchResults) => ({
  type: SET_SEARCH_RESULTS,
  payload: { searchResults },
})

export const toggleSearchBar = () => ({
  type: TOGGLE_SEARCH_BAR,
})
