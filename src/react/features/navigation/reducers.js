import * as types from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  roomId: undefined,
  focus: undefined,
  backward: [],
  forward: [],
  path: [],
}

export const enterRoom = (state, { payload }) => ({
  ...state,
  roomId: payload.roomId,
  focus: payload.roomId,
  backward: [[]],
  forward: [],
  path: [payload.roomId],
})

export const setFocus = (state, { payload }) => ({
  ...state,
  focus: payload.focus,
  backward: [[state.roomId, state.focus], ...state.backward],
  forward: [],
  path: [...state.path, payload.focus],
})

export const goSide = (state, { payload }) => ({
  ...state,
  focus: payload.focus,
  forward: [],
  path: Object.assign([], state.path, {
    [state.path.length - 1]: payload.focus,
  }),
})

export const goBackward = state => {
  const [[roomId, focus], ...backward] = state.backward
  return {
    ...state,
    roomId,
    focus,
    backward,
    forward: [[state.roomId, state.focus], ...state.forward],
    path: [...state.path].slice(0, -1),
  }
}

export const goForward = state => {
  const [[roomId, focus], ...forward] = state.forward
  return {
    ...state,
    roomId,
    focus,
    backward: [[state.roomId, state.focus], ...state.backward],
    forward,
    path: [...state.path, focus],
  }
}

export const goHome = state => {
  return {
    ...state,
    roomId: undefined,
    focus: undefined,
    backward: [[state.roomId, state.focus], ...state.backward],
    forward: [],
    path: [],
  }
}

export default createReducer({
  [types.ENTER_ROOM]: enterRoom,
  [types.SET_FOCUS]: setFocus,
  [types.GO_BACKWARD]: goBackward,
  [types.GO_FORWARD]: goForward,
  [types.GO_HOME]: goHome,
  [types.GO_SIDE]: goSide,
})
