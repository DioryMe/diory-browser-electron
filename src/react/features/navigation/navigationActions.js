import {
  SELECT_ROOM,
  SELECT_CONTEXT,
  SELECT_STORY,
  SELECT_MEMORY,
  GO_FORWARD,
  GO_BACKWARD,
  GO_HOME,
  GO_SIDE,
} from './navigationActionTypes'

export const selectRoom = ({ id }) => ({
  type: SELECT_ROOM,
  payload: { id },
})

export const selectContext = ({ id }) => ({
  type: SELECT_CONTEXT,
  payload: { id },
})

export const selectStory = ({ id }) => ({
  type: SELECT_STORY,
  payload: { id },
})

export const selectMemory = ({ id } = {}) => ({
  type: SELECT_MEMORY,
  payload: { id },
})

export const goBackward = () => ({ type: GO_BACKWARD })

export const goForward = () => ({ type: GO_FORWARD })

export const goHome = () => ({ type: GO_HOME })

export const goSide = ({ storyId }) => ({
  type: GO_SIDE,
  payload: { storyId },
})
