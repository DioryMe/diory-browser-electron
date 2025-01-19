import { queryDiograph } from '@diograph/diograph/dist/utils/queryDiograph'
import {
  SELECT_LENS,
  ADD_LENS_BUTTON,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
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

export const searchDiories = (query) => (dispatch, getState) => {
  const { diograph } = getState().diory
  const resultDiograph = queryDiograph({ text: query }, diograph)
  dispatch(setSearchResults(query, Object.values(resultDiograph)))
  dispatch(setSearchQuery(query))
}
