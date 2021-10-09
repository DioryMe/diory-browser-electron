import {
  ENTER_ROOM,
  GO_SIDE,
  GO_HOME,
  SELECT_STORY,
  SET_FOCUS,
  GO_BACKWARD,
  GO_FORWARD,
  SET_SELECTED_DIORY,
} from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  roomId: undefined,
  storyId: undefined,
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

export const selectStory = (state, { payload }) => {
  if (payload.story.id === state.storyId) {
    return state
  }

  return {
    ...state,
    storyId: payload.story.id,
    backward: [[state.roomId, state.focusId, state.storyId], ...state.backward],
    forward: [],
  }
}

export const setFocus = (state, { payload }) => {
  if (payload.id === state.focusId) {
    return state
  }

  return {
    ...state,
    storyId: undefined,
    focusId: payload.id,
    backward: [[state.roomId, state.focusId, state.storyId], ...state.backward],
    forward: [],
    path: [...state.path, payload.id],
  }
}

export const goSide = (state, { payload }) => ({
  ...state,
  focusId: payload.focus,
  forward: [],
  path: Object.assign([], state.path, {
    [state.path.length - 1]: payload.focus,
  }),
})

export const goBackward = (state) => {
  const [[roomId, focusId, storyId], ...backward] = state.backward
  return {
    ...state,
    roomId,
    focusId,
    storyId,
    backward,
    forward: [[state.roomId, state.focusId, state.storyId], ...state.forward],
    path: [...state.path].slice(0, -1),
  }
}

export const goForward = (state) => {
  const [[roomId, focusId, storyId], ...forward] = state.forward
  return {
    ...state,
    roomId,
    focusId,
    storyId,
    backward: [[state.roomId, state.focusId, state.storyId], ...state.backward],
    forward,
    path: [...state.path, focusId],
  }
}

export const goHome = (state) => ({
  ...state,
  roomId: null,
  focusId: null,
  backward: [[state.roomId, state.focusId, state.storyId], ...state.backward],
  forward: [],
  path: [],
})

export const setSelectedDiory = (state, { payload }) => ({
  ...state,
  selectedDioryId: payload.diory.id,
})

export default createReducer({
  [ENTER_ROOM]: enterRoom,
  [SELECT_STORY]: selectStory,
  [SET_FOCUS]: setFocus,
  [GO_BACKWARD]: goBackward,
  [GO_FORWARD]: goForward,
  [GO_HOME]: goHome,
  [GO_SIDE]: goSide,
  [SET_SELECTED_DIORY]: setSelectedDiory,
})
