import {
  ENTER_ROOM,
  GO_FORWARD,
  GO_BACKWARD,
  SET_FOCUS,
  SET_LENS,
  GO_HOME,
  GO_SIDE,
  SET_SELECTED_LINK,
} from './actionsTypes'

export const enterRoom = ({ id }) => ({
  type: ENTER_ROOM,
  payload: { id },
})

export const setLens = ({ lens }) => ({
  type: SET_LENS,
  payload: { lens },
})

export const setFocus = ({ focus, lens }) => ({
  type: SET_FOCUS,
  payload: { focus, lens },
})

export const goBackward = () => ({ type: GO_BACKWARD })

export const goForward = () => ({ type: GO_FORWARD })

export const goHome = () => ({ type: GO_HOME })

export const goSide = ({ focus }) => ({
  type: GO_SIDE,
  payload: { focus },
})

export const setSelectedLink = (link = {}) => ({
  type: SET_SELECTED_LINK,
  payload: { link },
})
