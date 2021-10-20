import {
  ENTER_ROOM,
  GO_SIDE,
  GO_HOME,
  SET_FOCUS,
  GO_BACKWARD,
  GO_FORWARD,
  SET_SELECTED_DIORY,
} from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  roomId: undefined,
  storyId: undefined,
  memoryId: null,
  backward: [],
  forward: [],
  path: [],
}

export const enterRoom = (state, { payload }) => ({
  ...state,
  roomId: payload.id,
  storyId: payload.id, // rootId
  backward: [[]],
  forward: [],
  path: [payload.id],
})

export const setFocus = (state, { payload }) => {
  if (payload.id === state.storyId) {
    return state
  }

  return {
    ...state,
    storyId: payload.id,
    backward: [[state.roomId, state.storyId], ...state.backward],
    forward: [],
    path: [...state.path, payload.id],
  }
}

export const goSide = (state, { payload }) => ({
  ...state,
  storyId: payload.focus,
  forward: [],
  path: Object.assign([], state.path, {
    [state.path.length - 1]: payload.focus,
  }),
})

export const goBackward = (state) => {
  const [[roomId, storyId], ...backward] = state.backward
  return {
    ...state,
    roomId,
    storyId,
    backward,
    forward: [[state.roomId, state.storyId], ...state.forward],
    path: [...state.path].slice(0, -1),
  }
}

export const goForward = (state) => {
  const [[roomId, storyId], ...forward] = state.forward
  return {
    ...state,
    roomId,
    storyId,
    backward: [[state.roomId, state.storyId], ...state.backward],
    forward,
    path: [...state.path, storyId],
  }
}

export const goHome = (state) => ({
  ...state,
  roomId: null,
  storyId: null,
  backward: [[state.roomId, state.storyId], ...state.backward],
  forward: [],
  path: [],
})

export const setSelectedDiory = (state, { payload }) => ({
  ...state,
  memoryId: payload.diory.id,
})

export default createReducer({
  [ENTER_ROOM]: enterRoom,
  [SET_FOCUS]: setFocus,
  [GO_BACKWARD]: goBackward,
  [GO_FORWARD]: goForward,
  [GO_HOME]: goHome,
  [GO_SIDE]: goSide,
  [SET_SELECTED_DIORY]: setSelectedDiory,
})
