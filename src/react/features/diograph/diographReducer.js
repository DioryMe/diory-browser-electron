import { GET_DIOGRAPH, SAVE_DIOGRAPH, UPDATE_DIOGRAPH } from './diographActionTypes'
import { promiseReducers, createReducer } from '../../store'

const initialState = {
  rootId: undefined,
  diograph: {},
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
}

export const getDiograph = (state, { payload: { diograph, rootId } }) => ({
  ...state,
  rootId,
  diograph,
})

export const updateDiograph = (state, { payload: { diograph } }) => ({
  ...state,
  diograph,
})

export default createReducer(initialState, {
  [UPDATE_DIOGRAPH]: updateDiograph,
  ...promiseReducers(GET_DIOGRAPH, 'loading', 'loaded', 'error', getDiograph),
  ...promiseReducers(SAVE_DIOGRAPH, 'saving', 'saved', 'error'),
})
