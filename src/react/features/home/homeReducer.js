import { SET_STORE, GET_HOME_CONNECTION, SAVE_HOME_CONNECTION } from './homeActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  store: 'diory',
  client: undefined,
  address: undefined,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
}

export const setHomeConnection = (state, { payload }) => ({
  ...state,
  client: payload.client,
  address: payload.address,
})

export const setStore = (state, { payload: { store } }) => ({
  ...state,
  store,
})

export default createReducer(initialState, {
  ...promiseReducers(GET_HOME_CONNECTION, 'loading', 'loaded', 'error', setHomeConnection),
  ...promiseReducers(SAVE_HOME_CONNECTION, 'saving', 'saved', 'error', setHomeConnection),
  [SET_STORE]: setStore,
})
