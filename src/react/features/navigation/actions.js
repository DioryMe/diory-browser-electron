import { ENTER_ROOM, GO_FORWARD, GO_BACKWARD, SET_FOCUS, GO_HOME, GO_SIDE } from './actionsTypes'

export const enterRoom = (roomId) => ({
  type: ENTER_ROOM,
  payload: { roomId },
})

export const setFocus = ({ focus }) => ({
  type: SET_FOCUS,
  payload: { focus },
})

export const goBackward = () => ({ type: GO_BACKWARD })

export const goForward = () => ({ type: GO_FORWARD })

export const goHome = () => ({ type: GO_HOME })

export const goSide = ({ focus }) => ({
  type: GO_SIDE,
  payload: { focus },
})
