import * as types from './actionsTypes'

export const enterRoom = room => ({ type: types.ENTER_ROOM, payload: { room } })

export const setFocus = ({ focus, context }) => ({ type: types.SET_FOCUS, payload: { focus, context } })

export const goBackward = () => ({ type: types.GO_BACKWARD })

export const goForward = () => ({ type: types.GO_FORWARD })

export const goHome = () => ({ type: types.GO_HOME })

export const goLeft = () => ({ type: types.GO_LEFT })

export const goRight = () => ({ type: types.GO_RIGHT })
