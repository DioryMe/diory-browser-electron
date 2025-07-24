import { SELECT_STORY, GO_FORWARD, GO_BACKWARD, GO_HOME, GO_SIDE } from './navigationActionTypes'

export const selectStory = ({ key }) => ({
  type: SELECT_STORY,
  payload: { key },
})

export const goBackward = () => ({ type: GO_BACKWARD })

export const goForward = () => ({ type: GO_FORWARD })

export const goHome = () => ({ type: GO_HOME })

export const goSide = ({ key }) => ({
  type: GO_SIDE,
  payload: { key },
})
