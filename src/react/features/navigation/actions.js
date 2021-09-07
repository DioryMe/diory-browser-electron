import {
  ENTER_ROOM,
  GO_FORWARD,
  GO_BACKWARD,
  SET_FOCUS,
  GO_HOME,
  GO_SIDE,
  SET_SELECTED_DIORY,
} from './actionsTypes'

export const enterRoom = ({ id }) => ({
  type: ENTER_ROOM,
  payload: { id },
})

export const setFocus = ({ focusId }) => ({
  type: SET_FOCUS,
  payload: { focusId },
})

export const goBackward = () => ({ type: GO_BACKWARD })

export const goForward = () => ({ type: GO_FORWARD })

export const goHome = () => ({ type: GO_HOME })

export const goSide = ({ focusId }) => ({
  type: GO_SIDE,
  payload: { focusId },
})

export const setSelectedDiory = (diory = {}) => ({
  type: SET_SELECTED_DIORY,
  payload: { diory },
})
