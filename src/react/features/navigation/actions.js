import * as types from './actionsTypes'

export const enterRoom = room => ({ type: types.ENTER_ROOM, payload: { room } })

export const setFocus = ({ focus }) => ({
  type: types.SET_FOCUS,
  payload: { focus },
})

export const goBackward = () => ({ type: types.GO_BACKWARD })

export const goForward = () => ({ type: types.GO_FORWARD })

export const goHome = () => ({ type: types.GO_HOME })

export const goSide = ({ focus }) => ({
  type: types.GO_SIDE,
  payload: { focus },
})
