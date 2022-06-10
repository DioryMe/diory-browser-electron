import { GET_DIOGRAPH_SUCCESS, SAVE_DIOGRAPH, UPDATE_DIOGRAPH } from './diographActionTypes'
import { promiseReducers, createReducer } from '../../store'

const initialState = {
  rootId: undefined,
  diograph: {},
  loaded: false,
  updated: false,
}

export const getDiographSuccess = (state, { payload: { diograph, rootId } }) => ({
  ...state,
  rootId,
  diograph,
  loaded: true,
  updated: false,
})

export const updateDiograph = (state, { payload: { diograph } }) => ({
  ...state,
  diograph,
  updated: true,
})

export default createReducer(initialState, {
  [UPDATE_DIOGRAPH]: updateDiograph,
  [GET_DIOGRAPH_SUCCESS]: getDiographSuccess,
  ...promiseReducers(SAVE_DIOGRAPH, 'updated', 'saving', 'saved', 'error'),
})
