import { GET_HOME, SAVE_HOME } from './homeActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  address: undefined,
  initializing: true,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
}

export const setHome = (state, { payload }) => ({
  ...state,
  address: payload.address,
  initializing: false,
})

export default createReducer(initialState, {
  ...promiseReducers(GET_HOME, 'loading', 'loaded', 'error', setHome),
  ...promiseReducers(SAVE_HOME, 'saving', 'saved', 'error', setHome),
})
