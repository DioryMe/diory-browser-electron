import {
  GO_FORWARD,
  GO_BACKWARD,
  SELECT_STORY,
  GO_HOME,
  GO_SIDE,
  SELECT_MEMORY,
} from './actionsTypes'

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
