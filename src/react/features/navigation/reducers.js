import {
  ENTER_ROOM,
  GO_SIDE,
  GO_HOME,
  SET_FOCUS,
  GO_BACKWARD,
  GO_FORWARD,
  SET_LINK,
} from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  roomId: undefined,
  focus: undefined,
  link: null,
  backward: [],
  forward: [],
  path: [],
}

export const enterRoom = (state, { payload }) => ({
  ...state,
  roomId: payload.id,
  focus: payload.id,
  backward: [[]],
  forward: [],
  path: [payload.id],
})

export const setFocus = (state, { payload }) => {
  if (payload.focus === state.focus) {
    return state
  }

  return {
    ...state,
    focus: payload.focus,
    backward: [[state.roomId, state.focus], ...state.backward],
    forward: [],
    path: [...state.path, payload.focus],
  }
}

export const goSide = (state, { payload }) => ({
  ...state,
  focus: payload.focus,
  forward: [],
  path: Object.assign([], state.path, {
    [state.path.length - 1]: payload.focus,
  }),
})

export const goBackward = (state) => {
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

export const goForward = (state) => {
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

export const goHome = (state) => ({
  ...state,
  roomId: null,
  focus: null,
  backward: [[state.roomId, state.focus], ...state.backward],
  forward: [],
  path: [],
})

export const setLink = (state, { payload }) => ({
  ...state,
  link: payload.link.id,
})

export default createReducer({
  [ENTER_ROOM]: enterRoom,
  [SET_FOCUS]: setFocus,
  [GO_BACKWARD]: goBackward,
  [GO_FORWARD]: goForward,
  [GO_HOME]: goHome,
  [GO_SIDE]: goSide,
  [SET_LINK]: setLink,
})
