import { SET_QUERY, SET_SEARCH_RESULTS } from './actionsTypes'

export const setQuery = (query) => ({
  type: SET_QUERY,
  payload: { query },
})

export const setSearchResults = (searchResults) => ({
  type: SET_SEARCH_RESULTS,
  payload: { searchResults },
})
