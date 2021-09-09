import {
  ENTER_ROOM,
  GO_HOME,
  SET_FOCUS,
  GO_BACKWARD,
  GO_FORWARD,
  SET_SELECTED_DIORY,
} from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  roomId: undefined,
  focusId: undefined,
  selectedDioryId: null,
  backward: [],
  forward: [],
  path: [],
}

export const enterRoom = (state, { payload }) => ({
  ...state,
  roomId: payload.id,
  focusId: payload.id, // rootId
  backward: [[]],
  forward: [],
  path: [payload.id],
})

export const setFocus = (state, { payload }) => {
  if (payload.id === state.focusId) {
    return state
  }

  return {
    ...state,
    focusId: payload.id,
    backward: [[state.roomId, state.focusId], ...state.backward],
    forward: [],
    path: [...state.path, payload.id],
  }
}

export const goBackward = (state) => {
  const [[roomId, focusId], ...backward] = state.backward
  return {
    ...state,
    roomId,
    focusId,
    backward,
    forward: [[state.roomId, state.focusId], ...state.forward],
    path: [...state.path].slice(0, -1),
  }
}

export const goForward = (state) => {
  const [[roomId, focusId], ...forward] = state.forward
  return {
    ...state,
    roomId,
    focusId,
    backward: [[state.roomId, state.focusId], ...state.backward],
    forward,
    path: [...state.path, focusId],
  }
}

export const goHome = (state) => ({
  ...state,
  roomId: null,
  focusId: null,
  backward: [[state.roomId, state.focusId], ...state.backward],
  forward: [],
  path: [],
})

export const setSelectedDiory = (state, { payload }) => ({
  ...state,
  selectedDioryId: payload.diory.id,
})

export default createReducer({
  [ENTER_ROOM]: enterRoom,
  [SET_FOCUS]: setFocus,
  [GO_BACKWARD]: goBackward,
  [GO_FORWARD]: goForward,
  [GO_HOME]: goHome,
  [SET_SELECTED_DIORY]: setSelectedDiory,
})
