import * as types from '../actions'
import createReducer from './createReducer'

export const initialState = {
  room: undefined,
  focus: undefined,
  backward: [],
  forward: [],
  path: [],
}

export const enterRoom = (state, {payload}) => ({
  ...state,
  room: payload.room,
  focus: payload.room,
  backward: [[]],
  forward: [],
})

export const setFocus = (state, {payload}) => ({
  ...state,
  focus: payload.focus,
  backward: [[state.room, state.focus], ...state.backward],
  forward: [],
  path: [...state.path, payload.focus]
})

export const goBackward = (state) => {
  const [[room,focus], ...backward] = state.backward
  return ({
    ...state,
    room,
    focus,
    backward,
    forward: [[state.room, state.focus], ...state.forward],
    path: [...state.path].slice(0,-1)
  })
}

export const goForward = (state) => {
  const [[room,focus], ...forward] = state.forward
  return ({
    ...state,
    room,
    focus,
    backward: [[state.room, state.focus], ...state.backward],
    forward,
    path: [...state.path, focus]
  })
}

export const goHome = (state) => {
  return ({
    ...state,
    room: undefined,
    focus: undefined,
    backward: [[state.room, state.focus], ...state.backward],
    forward: [],
    path: [],
  })
}

export default createReducer({
  [types.ENTER_ROOM]: enterRoom,
  [types.SET_FOCUS]: setFocus,
  [types.GO_BACKWARD]: goBackward,
  [types.GO_FORWARD]: goForward,
  [types.GO_HOME]: goHome,
})
