import * as types from './actionsTypes'
import createReducer from '../../store/createReducer'

export const initialState = {
  active: null,
}

export const setActive = (state, { payload }) => ({
  ...state,
  active: payload.active,
})

export const setInactive = (state, { payload }) => ({
  ...state,
  active: null,
})

export default createReducer({
  [types.SET_ACTIVE]: setActive,
  [types.SET_INACTIVE]: setInactive,
})
