import { GET_HOME, SAVE_HOME } from './homeActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  homeId: undefined,
  initializing: true,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
}

export const getHome = (state, { payload }) => ({
  ...state,
  homeId: payload.id,
  initializing: false,
})

export default createReducer(initialState, {
  ...promiseReducers(GET_HOME, 'loading', 'loaded', 'error', getHome),
  ...promiseReducers(SAVE_HOME, 'saving', 'saved', 'error', getHome),
})
