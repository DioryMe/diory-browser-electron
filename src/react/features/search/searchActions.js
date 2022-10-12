import { SET_SEARCH_QUERY, SET_SEARCH_RESULTS, TOGGLE_SEARCH_BAR } from './searchActionTypes'

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: { query },
})

export const setSearchResults = (query, results) => ({
  type: SET_SEARCH_RESULTS,
  payload: { query, results },
})

export const toggleSearchBar = () => ({
  type: TOGGLE_SEARCH_BAR,
})

export const searchDiories =
  (query) =>
  (dispatch, getState, { client }) => {
    const { diograph } = getState().diograph
    const diories = client.searchDiories({ text: query }, diograph)
    dispatch(setSearchResults(query, diories))
    dispatch(setSearchQuery(query))
  }
