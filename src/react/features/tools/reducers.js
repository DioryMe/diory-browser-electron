import { SET_ACTIVE, SET_INACTIVE } from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  active: null,
}

export const setActive = (state, { payload }) => ({
  ...state,
  active: payload.active,
})

export const setInactive = (state) => ({
  ...state,
  active: null,
})

export default createReducer({
  [SET_ACTIVE]: setActive,
  [SET_INACTIVE]: setInactive,
})
