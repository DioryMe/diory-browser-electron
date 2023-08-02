import { GET_HOME, SAVE_HOME } from './homeActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  id: undefined,
  connections: [],
  initializing: true,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
}

export const getHome = (state, { payload }) => ({
  ...state,
  id: payload.id,
  connections: payload.connections,
  initializing: false,
})

export default createReducer(initialState, {
  ...promiseReducers(GET_HOME, 'loading', 'loaded', 'error', getHome),
  ...promiseReducers(SAVE_HOME, 'saving', 'saved', 'error', getHome),
})
