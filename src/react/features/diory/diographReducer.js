import { GET_DIOGRAPH, UPDATE_DIOGRAPH } from './diographActionTypes'

import { createReducer, promiseReducers } from '../../store'

const initialState = {
  address: undefined,
  diograph: {},
}

export const updateDiograph = (state, { payload: { diograph } }) => ({
  ...state,
  diograph,
})

export default createReducer(initialState, {
  ...promiseReducers(GET_DIOGRAPH, 'loading', 'loaded', 'error'),
  [UPDATE_DIOGRAPH]: updateDiograph,
})
