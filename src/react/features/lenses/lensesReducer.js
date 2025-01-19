import {
  ADD_LENS_BUTTON,
  SELECT_LENS,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
} from './lensesActionTypes'
import { createReducer } from '../../store'
import { DEFAULT_LENS } from './Lenses'

const initialState = {
  selectedLensId: DEFAULT_LENS,
  buttons: {},
  query: '',
  resultsByQuery: {},
}

const selectLens = (state, { payload }) => ({
  ...state,
  selectedLensId: payload.id,
})

const addLensButton = (state, { payload }) => ({
  ...state,
  buttons: {
    ...state.buttons,
    [payload.button.id]: payload.button,
  },
})

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
  [SELECT_LENS]: selectLens,
  [ADD_LENS_BUTTON]: addLensButton,
  [SET_SEARCH_QUERY]: setSearchQuery,
  [SET_SEARCH_RESULTS]: setSearchResults,
})
