import { SET_SEARCH_QUERY, SET_SEARCH_RESULTS } from './searchActionTypes'

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: { query },
})

export const setSearchResults = (query, results) => ({
  type: SET_SEARCH_RESULTS,
  payload: { query, results },
})

export const searchDiories =
  (query) =>
  (dispatch, getState, { dioryClient }) => {
    const diograph = dioryClient.diograph.queryDiograph({ text: query })
    dispatch(setSearchResults(query, Object.values(diograph.toObject())))
    dispatch(setSearchQuery(query))
  }
