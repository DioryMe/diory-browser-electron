import {
  ADD_CONTENT,
  REMOVE_CONTENT,
  ACTIVATE_CONTENT,
  INACTIVATE_CONTENT,
  TOGGLE_CONTENT,
} from './contentActionTypes'
import { createReducer } from '../../store'

const initialState = {
  active: false,
  content: null,
}

const addContent = (state, { payload }) => ({
  ...state,
  content: true,
})

const removeContent = (state) => ({
  ...state,
  content: false,
})

const activateContent = (state) => ({
  ...state,
  active: true,
})

const inactivateContent = (state) => ({
  ...state,
  active: false,
})

const toggleContent = (state) => ({
  ...state,
  active: !state.active,
})

export default createReducer(initialState, {
  [ADD_CONTENT]: addContent,
  [REMOVE_CONTENT]: removeContent,
  [ACTIVATE_CONTENT]: activateContent,
  [INACTIVATE_CONTENT]: inactivateContent,
  [TOGGLE_CONTENT]: toggleContent,
})
