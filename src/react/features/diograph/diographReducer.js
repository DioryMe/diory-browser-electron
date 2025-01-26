import { GET_DIOGRAPH, GENERATE_DIOGRAPH, UPDATE_DIOGRAPH } from './diographActionTypes'

import { createReducer, promiseReducers } from '../../store'

const initialState = {
  loading: false,
  loaded: false,
  error: false,
}

export const updateDiograph = (state, { payload: { diograph }, storeId }) => ({
  ...state,
  [storeId]: diograph,
})

export default createReducer(initialState, {
  ...promiseReducers(GET_DIOGRAPH, 'loading', 'loaded', 'error'),
  ...promiseReducers(GENERATE_DIOGRAPH, 'generating', 'generated', 'error'),
  [UPDATE_DIOGRAPH]: updateDiograph,
})
