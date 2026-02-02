import {
  ADD_LENS_BUTTON,
  SELECT_LENS,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  SELECT_PERIOD,
  SELECT_FOLDER,
  SET_SHOW_PERIOD_MEMORIES,
} from './lensesActionTypes'
import { createReducer } from '../../store'

const initialState = {
  buttons: {},
  selectedLensId: 'timeline',
  selectedPeriod: null,
  selectedFolderKey: null,
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

export const selectPeriod = (state, { payload }) => ({
  ...state,
  selectedPeriod: payload.id,
})

export const selectFolder = (state, { payload }) => ({
  ...state,
  selectedFolderKey: payload.key,
})

export default createReducer(initialState, {
  [SELECT_LENS]: selectLens,
  [ADD_LENS_BUTTON]: addLensButton,
  [SET_SEARCH_QUERY]: setSearchQuery,
  [SET_SEARCH_RESULTS]: setSearchResults,
  [SELECT_PERIOD]: selectPeriod,
  [SELECT_FOLDER]: selectFolder,
})
