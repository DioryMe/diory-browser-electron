import {
  ADD_CONTENT,
  REMOVE_CONTENT,
  ACTIVATE_CONTENT,
  INACTIVATE_CONTENT,
  TOGGLE_CONTENT,
  SET_CONTENT_URL,
} from './contentActionTypes'

export const addContent = () => ({
  type: ADD_CONTENT,
})

export const removeContent = () => ({
  type: REMOVE_CONTENT,
})

export const activateContent = () => ({
  type: ACTIVATE_CONTENT,
})

export const inactivateContent = () => ({
  type: INACTIVATE_CONTENT,
})

export const toggleContent = () => ({
  type: TOGGLE_CONTENT,
})

export const setContentUrl = (contentUrl) => ({
  type: SET_CONTENT_URL,
  payload: { contentUrl },
})
