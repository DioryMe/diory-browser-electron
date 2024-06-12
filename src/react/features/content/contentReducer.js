import {
  ADD_CONTENT,
  REMOVE_CONTENT,
  ACTIVATE_CONTENT,
  INACTIVATE_CONTENT,
  TOGGLE_CONTENT,
  SET_CONTENT_URL,
} from './contentActionTypes'
import { createReducer } from '../../store'

const initialState = {
  contentUrl: undefined,
  active: false,
  content: null,
}

const setContentUrl = (state, { payload }) => ({
  ...state,
  contentUrl: payload.contentUrl,
})

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
  [SET_CONTENT_URL]: setContentUrl,
  [ADD_CONTENT]: addContent,
  [REMOVE_CONTENT]: removeContent,
  [ACTIVATE_CONTENT]: activateContent,
  [INACTIVATE_CONTENT]: inactivateContent,
  [TOGGLE_CONTENT]: toggleContent,
})
