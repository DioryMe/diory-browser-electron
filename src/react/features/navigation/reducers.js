import {
  GO_SIDE,
  GO_HOME,
  SELECT_CONTEXT,
  SET_FOCUS,
  GO_BACKWARD,
  GO_FORWARD,
  SET_SELECTED_DIORY,
} from './actionsTypes'

import { createReducer } from '../../store'

export const initialState = {
  contextId: undefined,
  storyId: undefined,
  memoryId: null,
  backward: [],
  forward: [],
  path: [],
}

export const selectContext = (state, { payload }) => {
  if (payload.context.id === state.contextId) {
    return state
  }

  return {
    ...state,
    contextId: payload.context.id,
    backward: [[state.storyId, state.contextId], ...state.backward],
    forward: [],
  }
}

export const setFocus = (state, { payload }) => {
  if (payload.id === state.storyId) {
    return state
  }

  return {
    ...state,
    contextId: undefined,
    storyId: payload.id,
    backward: [[state.storyId, state.contextId], ...state.backward],
    forward: [],
    path: [...state.path, payload.id],
  }
}

export const goSide = (state, { payload }) => ({
  ...state,
  storyId: payload.storyId,
  forward: [],
  path: Object.assign([], state.path, {
    [state.path.length - 1]: payload.storyId,
  }),
})

export const goBackward = (state) => {
  const [[storyId, contextId], ...backward] = state.backward
  return {
    ...state,
    contextId,
    storyId,
    backward,
    forward: [[state.storyId, state.contextId], ...state.forward],
    path: [...state.path].slice(0, -1),
  }
}

export const goForward = (state) => {
  const [[storyId, contextId], ...forward] = state.forward
  return {
    ...state,
    contextId,
    storyId,
    backward: [[state.storyId, state.contextId], ...state.backward],
    forward,
    path: [...state.path, storyId],
  }
}

export const goHome = (state) => ({
  ...state,
  focusId: null,
  backward: [[state.storyId, state.contextId], ...state.backward],
  forward: [],
  path: [],
})

export const setSelectedDiory = (state, { payload }) => ({
  ...state,
  memoryId: payload.diory.id,
})

export default createReducer({
  [SELECT_CONTEXT]: selectContext,
  [SET_FOCUS]: setFocus,
  [GO_BACKWARD]: goBackward,
  [GO_FORWARD]: goForward,
  [GO_HOME]: goHome,
  [GO_SIDE]: goSide,
  [SET_SELECTED_DIORY]: setSelectedDiory,
})
