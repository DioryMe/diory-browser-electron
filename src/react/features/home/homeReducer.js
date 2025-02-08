import {
  GET_HOME_CONNECTION,
  SAVE_HOME_CONNECTION,
  SET_DIOGRAPH_CONNECTION,
} from './homeActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  homeConnection: undefined,
  connection: undefined,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
}

export const setHomeConnection = (state, { payload: { connection } }) => ({
  ...state,
  homeConnection: connection,
  connection,
})

export const setDiographConnection = (state, { payload: { connection } }) => ({
  ...state,
  connection,
})

export default createReducer(initialState, {
  ...promiseReducers(GET_HOME_CONNECTION, 'loading', 'loaded', 'error', setHomeConnection),
  ...promiseReducers(SAVE_HOME_CONNECTION, 'saving', 'saved', 'error', setHomeConnection),
  [SET_DIOGRAPH_CONNECTION]: setDiographConnection,
})
