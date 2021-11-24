import { SET_QUERY, TOGGLE_SEARCH_BAR } from './searchActionTypes'

export const setQuery = (query) => ({
  type: SET_QUERY,
  payload: { query },
})

export const toggleSearchBar = () => ({
  type: TOGGLE_SEARCH_BAR,
})
