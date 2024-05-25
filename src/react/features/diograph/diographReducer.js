import { UPDATE_DIOGRAPH, GET_DIOGRAPH } from './diographActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  diograph: {},
}

export const updateDiograph = (state, { payload: { diograph } }) => ({
  ...state,
  diograph,
})

export default createReducer(initialState, {
  [UPDATE_DIOGRAPH]: updateDiograph,
  ...promiseReducers(GET_DIOGRAPH, 'loading', 'loaded', 'error'),
})
