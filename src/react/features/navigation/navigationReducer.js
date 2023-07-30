import {
  SELECT_CONTEXT,
  SELECT_STORY,
  SELECT_MEMORY,
  GO_BACKWARD,
  GO_FORWARD,
  GO_HOME,
  GO_SIDE,
} from './navigationActionTypes'

import { createReducer } from '../../store'

const initialState = {
  contextId: undefined,
  storyId: undefined,
  memoryId: null,
  backward: [],
  forward: [],
  path: [],
}

export const selectContext = (state, { payload }) => {
  if (payload.id === state.contextId) {
    return state
  }

  return {
    ...state,
    contextId: payload.id,
  }
}

export const selectStory = (state, { payload }) => {
  if (payload.id === state.storyId) {
    return state
  }

  return {
    ...state,
    contextId: state.storyId,
    storyId: payload.id,
    backward: state.storyId ? [state.storyId, ...state.backward] : state.backward,
    forward: [],
    path: [...state.path, payload.id],
  }
}

export const selectMemory = (state, { payload }) => ({
  ...state,
  memoryId: payload.id,
})

export const goSide = (state, { payload }) => ({
  ...state,
  storyId: payload.storyId,
  forward: [],
  path: Object.assign([], state.path, {
    [state.path.length - 1]: payload.storyId,
  }),
})

export const goBackward = (state) => {
  const [storyId, ...backward] = state.backward
  return {
    ...state,
    storyId,
    backward,
    forward: [state.storyId, ...state.forward],
    path: [...state.path].slice(0, -1),
  }
}

export const goForward = (state) => {
  const [storyId, ...forward] = state.forward
  return {
    ...state,
    storyId,
    backward: [state.storyId, ...state.backward],
    forward,
    path: [...state.path, storyId],
  }
}

export const goHome = (state) => ({
  ...state,
  storyId: undefined,
  backward: [state.storyId, ...state.backward],
  forward: [],
  path: [],
})

export default createReducer(initialState, {
  [SELECT_CONTEXT]: selectContext,
  [SELECT_STORY]: selectStory,
  [SELECT_MEMORY]: selectMemory,
  [GO_BACKWARD]: goBackward,
  [GO_FORWARD]: goForward,
  [GO_SIDE]: goSide,
  [GO_HOME]: goHome,
})
