import {
  GO_FORWARD,
  GO_BACKWARD,
  SELECT_CONTEXT,
  SELECT_STORY,
  GO_HOME,
  GO_SIDE,
  SET_SELECTED_DIORY,
} from './actionsTypes'

export const selectContext = (context) => ({
  type: SELECT_CONTEXT,
  payload: { context },
})

export const selectStory = ({ id }) => ({
  type: SELECT_STORY,
  payload: { id },
})

export const goBackward = () => ({ type: GO_BACKWARD })

export const goForward = () => ({ type: GO_FORWARD })

export const goHome = () => ({ type: GO_HOME })

export const goSide = ({ storyId }) => ({
  type: GO_SIDE,
  payload: { storyId },
})

export const setSelectedDiory = (diory = {}) => ({
  type: SET_SELECTED_DIORY,
  payload: { diory },
})
