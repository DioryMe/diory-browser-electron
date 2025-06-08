import {
  SELECT_CONTEXT,
  SELECT_STORY,
  SELECT_MEMORY,
  SELECT_DIORY,
  GO_FORWARD,
  GO_BACKWARD,
  GO_HOME,
  GO_SIDE,
} from './navigationActionTypes'

export const selectContext = ({ key }) => ({
  type: SELECT_CONTEXT,
  payload: { key },
})

export const selectStory = ({ key }) => ({
  type: SELECT_STORY,
  payload: { key },
})

export const selectMemory = ({ key } = {}) => ({
  type: SELECT_MEMORY,
  payload: { key },
})

export const selectDiory = ({ key } = {}) => ({
  type: SELECT_DIORY,
  payload: { key },
})

export const goBackward = () => ({ type: GO_BACKWARD })

export const goForward = () => ({ type: GO_FORWARD })

export const goHome = () => ({ type: GO_HOME })

export const goSide = ({ key }) => ({
  type: GO_SIDE,
  payload: { key },
})
