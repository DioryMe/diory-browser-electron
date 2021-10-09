import {
  ENTER_ROOM,
  GO_FORWARD,
  GO_BACKWARD,
  SELECT_STORY,
  SET_FOCUS,
  GO_HOME,
  GO_SIDE,
  SET_SELECTED_DIORY,
} from './actionsTypes'

export const enterRoom = ({ id }) => ({
  type: ENTER_ROOM,
  payload: { id },
})

export const selectStory = (story) => ({
  type: SELECT_STORY,
  payload: { story },
})

export const setFocus = ({ id }) => ({
  type: SET_FOCUS,
  payload: { id },
})

export const goBackward = () => ({ type: GO_BACKWARD })

export const goForward = () => ({ type: GO_FORWARD })

export const goHome = () => ({ type: GO_HOME })

export const goSide = ({ focus }) => ({
  type: GO_SIDE,
  payload: { focus },
})

export const setSelectedDiory = (diory = {}) => ({
  type: SET_SELECTED_DIORY,
  payload: { diory },
})
