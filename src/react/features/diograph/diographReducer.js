import { GET_DIOGRAPH, SAVE_DIOGRAPH, UPDATE_DIOGRAPH } from './diographActionTypes'
import { promiseReducers, createReducer } from '../../store'

const initialState = {
  diograph: {},
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
}

export const getDiograph = (state, { payload: { diograph } }) => ({
  ...state,
  diograph,
})

export const updateDiograph = (state, { payload: { diograph } }) => ({
  ...state,
  diograph,
  updated: true,
})

export const saveDiograph = (state) => ({
  ...state,
  updated: false,
})

export default createReducer(initialState, {
  [UPDATE_DIOGRAPH]: updateDiograph,
  ...promiseReducers(GET_DIOGRAPH, 'loading', 'loaded', 'error', getDiograph),
  ...promiseReducers(SAVE_DIOGRAPH, 'saving', 'saved', 'error', saveDiograph),
})
