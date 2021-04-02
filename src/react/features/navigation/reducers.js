import {
  ENTER_ROOM,
  GO_SIDE,
  GO_HOME,
  SET_FOCUS,
  SET_LENS,
  GO_BACKWARD,
  GO_FORWARD,
  SET_SELECTED_LINK,
} from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  roomId: undefined,
  focus: undefined,
  link: null,
  lens: null,
  backward: [],
  forward: [],
  path: [],
}

export const enterRoom = (state, { payload }) => ({
  ...state,
  roomId: payload.id,
  focus: payload.id, // rootId
  backward: [[]],
  forward: [],
  path: [payload.id],
})

export const setLens = (state, { payload }) => ({
  ...state,
  lens: payload.lensId,
  backward: [[state.roomId, state.focus, state.lens], ...state.backward],
  forward: [],
})

export const setFocus = (state, { payload }) => {
  if (payload.focus === state.focus) {
    return state
  }

  return {
    ...state,
    focus: payload.focus,
    lens: payload.lens || state.lens,
    backward: [[state.roomId, state.focus, state.lens], ...state.backward],
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
  const [[roomId, focus, lens], ...backward] = state.backward
  return {
    ...state,
    roomId,
    focus,
    lens,
    backward,
    forward: [[state.roomId, state.focus, state.lens], ...state.forward],
    path: [...state.path].slice(0, -1),
  }
}

export const goForward = (state) => {
  const [[roomId, focus, lens], ...forward] = state.forward
  return {
    ...state,
    roomId,
    focus,
    lens,
    backward: [[state.roomId, state.focus, state.lens], ...state.backward],
    forward,
    path: [...state.path, focus],
  }
}

export const goHome = (state) => ({
  ...state,
  focus: state.roomId,
  lens: 'grid',
  backward: [[state.roomId, state.focus, state.lens], ...state.backward],
  forward: [],
  path: [],
})

export const setSelectedLink = (state, { payload }) => ({
  ...state,
  link: payload.link.id,
})

export default createReducer({
  [ENTER_ROOM]: enterRoom,
  [SET_FOCUS]: setFocus,
  [SET_LENS]: setLens,
  [GO_BACKWARD]: goBackward,
  [GO_FORWARD]: goForward,
  [GO_HOME]: goHome,
  [GO_SIDE]: goSide,
  [SET_SELECTED_LINK]: setSelectedLink,
})
