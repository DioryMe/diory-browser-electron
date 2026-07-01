import { GET_HOME_DIOGRAPH, SAVE_HOME_DIOGRAPH, SET_IS_HOME } from './homeActionTypes'
import { createReducer, promiseReducers } from '../../store'

const initialState = {
  diograph: null,
  isHome: true,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
}

export const getHomeDiograph = (state, { payload: { diograph } }) => ({
  ...state,
  diograph,
})

export const setIsHome = (state, { payload: { isHome } }) => ({
  ...state,
  isHome,
})

export default createReducer(initialState, {
  ...promiseReducers(GET_HOME_DIOGRAPH, 'loading', 'loaded', 'error', getHomeDiograph),
  ...promiseReducers(SAVE_HOME_DIOGRAPH, 'saving', 'saved', 'error', getHomeDiograph),
  [SET_IS_HOME]: setIsHome,
})
