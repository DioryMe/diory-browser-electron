import { SET_SEARCH_QUERY, SET_SEARCH_RESULTS, TOGGLE_SEARCH_BAR } from './searchActionTypes'
import { createReducer } from '../../store'

const initialState = {
  query: '',
  resultsByQuery: {},
  showSearchBar: false,
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

export const toggleSearchBar = (state) => ({
  ...state,
  query: '',
  showSearchBar: !state.showSearchBar,
})

export default createReducer(initialState, {
  [SET_SEARCH_QUERY]: setSearchQuery,
  [SET_SEARCH_RESULTS]: setSearchResults,
  [TOGGLE_SEARCH_BAR]: toggleSearchBar,
})
