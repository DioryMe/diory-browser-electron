import { SET_SEARCH_QUERY, SET_SEARCH_RESULTS } from './searchActionTypes'
import { createReducer } from '../../store'

const initialState = {
  query: '',
  resultsByQuery: {},
}

export const setSearchQuery = (state, { payload }) => ({
  ...state,
  query: payload.query,
})

export const setSearchResults = (state, { payload }) => ({
  ...state,
  resultsByQuery: {
    ...state.resultsByQuery,
    [payload.query]: payload.results,
  },
})

export default createReducer(initialState, {
  [SET_SEARCH_QUERY]: setSearchQuery,
  [SET_SEARCH_RESULTS]: setSearchResults,
})
