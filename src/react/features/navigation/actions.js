import {
  ENTER_ROOM,
  GO_FORWARD,
  GO_BACKWARD,
  SET_FOCUS,
  GO_HOME,
  SET_SELECTED_DIORY,
} from './actionsTypes'

export const enterRoom = ({ id }) => ({
  type: ENTER_ROOM,
  payload: { id },
})

export const setFocus = ({ id }) => ({
  type: SET_FOCUS,
  payload: { id },
})

export const goBackward = () => ({ type: GO_BACKWARD })

export const goForward = () => ({ type: GO_FORWARD })

export const goHome = () => ({ type: GO_HOME })

export const setSelectedDiory = (diory = {}) => ({
  type: SET_SELECTED_DIORY,
  payload: { diory },
})
