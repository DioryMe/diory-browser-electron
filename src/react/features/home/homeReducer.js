import { GET_HOME_ADDRESS, SAVE_HOME_ADDRESS } from './homeActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  address: undefined,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
}

export const setHomeAddress = (state, { payload: { address } }) => ({
  ...state,
  address,
})

export default createReducer(initialState, {
  ...promiseReducers(GET_HOME_ADDRESS, 'loading', 'loaded', 'error', setHomeAddress),
  ...promiseReducers(SAVE_HOME_ADDRESS, 'saving', 'saved', 'error', setHomeAddress),
})
