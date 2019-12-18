import * as types from './actionsTypes'
import createReducer from '../../store/createReducer'

export const initialState = {
  room: undefined,
  focus: undefined,
  backward: [],
  forward: [],
  left: [],
  right: [],
  path: [],
}

export const enterRoom = (state, { payload }) => ({
  ...state,
  room: payload.room,
  focus: payload.room,
  backward: [[]],
  forward: [],
  path: [payload.room],
})

export const setFocus = (state, { payload }) => {
  const focusIndex = payload.context.indexOf(payload.focus)
  return ({
    ...state,
    focus: payload.focus,
    backward: [[state.room, state.focus], ...state.backward],
    forward: [],
    left: payload.context.slice(0, focusIndex),
    right: payload.context.slice(focusIndex + 1),
    path: [...state.path, payload.focus],
  })
}

export const goBackward = state => {
  const [[room, focus], ...backward] = state.backward
  return {
    ...state,
    room,
    focus,
    backward,
    forward: [[state.room, state.focus], ...state.forward],
    path: [...state.path].slice(0, -1),
  }
}

export const goForward = state => {
  const [[room, focus], ...forward] = state.forward
  return {
    ...state,
    room,
    focus,
    backward: [[state.room, state.focus], ...state.backward],
    forward,
    path: [...state.path, focus],
  }
}

export const goHome = state => {
  return {
    ...state,
    room: undefined,
    focus: undefined,
    backward: [[state.room, state.focus], ...state.backward],
    forward: [],
    path: [],
  }
}

export const goLeft = state => {
  if (!state.left.length) {
    return state
  }

  const [focus, ...left] = state.left
  return {
    ...state,
    focus,
    left,
    right: [state.focus, ...state.right],
    path: [...[...state.path].slice(0, -1), focus],
  }
}

export const goRight = state => {
  if (!state.right.length) {
    return state
  }

  const [focus, ...right] = state.right
  return {
    ...state,
    focus,
    left: [state.focus, ...state.left],
    right,
    path: [...[...state.path].slice(0, -1), focus],
  }
}

export default createReducer({
  [types.ENTER_ROOM]: enterRoom,
  [types.SET_FOCUS]: setFocus,
  [types.GO_BACKWARD]: goBackward,
  [types.GO_FORWARD]: goForward,
  [types.GO_HOME]: goHome,
  [types.GO_LEFT]: goLeft,
  [types.GO_RIGHT]: goRight,
})
