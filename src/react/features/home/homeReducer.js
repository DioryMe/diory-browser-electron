import { GET_HOME_ADDRESS, SAVE_HOME_ADDRESS, SET_IS_HOME } from './homeActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  address: undefined,
  isHome: true,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
}

export const setHomeAddress = (state, { payload: { address } }) => ({
  ...state,
  address,
})

export const setIsHome = (state, { payload: { isHome } }) => ({
  ...state,
  isHome,
})

export default createReducer(initialState, {
  ...promiseReducers(GET_HOME_ADDRESS, 'loading', 'loaded', 'error', setHomeAddress),
  ...promiseReducers(SAVE_HOME_ADDRESS, 'saving', 'saved', 'error', setHomeAddress),
  [SET_IS_HOME]: setIsHome,
})
