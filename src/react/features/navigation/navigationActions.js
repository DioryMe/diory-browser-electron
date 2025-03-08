import {
  SELECT_CONTEXT,
  SELECT_STORY,
  SELECT_MEMORY,
  GO_FORWARD,
  GO_BACKWARD,
  GO_HOME,
  GO_SIDE,
} from './navigationActionTypes'

export const selectContext = ({ address }) => ({
  type: SELECT_CONTEXT,
  payload: { address },
})

export const selectStory = ({ address }) => ({
  type: SELECT_STORY,
  payload: { address },
})

export const selectMemory = ({ address } = {}) => ({
  type: SELECT_MEMORY,
  payload: { address },
})

export const goBackward = () => ({ type: GO_BACKWARD })

export const goForward = () => ({ type: GO_FORWARD })

export const goHome = () => ({ type: GO_HOME })

export const goSide = ({ address }) => ({
  type: GO_SIDE,
  payload: { address },
})
