import {
  SELECT_LENS,
  ADD_LENS_BUTTON,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  SELECT_PERIOD,
} from './lensesActionTypes'

export const selectLens = (id) => ({ type: SELECT_LENS, payload: { id } })

export const addLensButton = (button) => ({
  type: ADD_LENS_BUTTON,
  payload: { button },
})

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: { query },
})

export const setSearchResults = (query, results) => ({
  type: SET_SEARCH_RESULTS,
  payload: { query, results },
})

export const searchDiories = (query, resultDiograph) => (dispatch) => {
  dispatch(setSearchResults(query, resultDiograph))
  dispatch(setSearchQuery(query))
}

export const selectPeriod = ({ id }) => ({
  type: SELECT_PERIOD,
  payload: { id },
})
