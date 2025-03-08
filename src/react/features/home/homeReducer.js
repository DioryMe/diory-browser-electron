import { GET_HOME_CONNECTION, SAVE_HOME_CONNECTION } from './homeActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  address: undefined,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
}

export const setHomeConnection = (state, { payload: { address } }) => ({
  ...state,
  address,
})

export default createReducer(initialState, {
  ...promiseReducers(GET_HOME_CONNECTION, 'loading', 'loaded', 'error', setHomeConnection),
  ...promiseReducers(SAVE_HOME_CONNECTION, 'saving', 'saved', 'error', setHomeConnection),
})
