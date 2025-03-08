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
  contextId: null,
  storyId: undefined,
  memoryId: null,
  backward: [],
  forward: [],
  path: [],
}

export const selectContext = (state, { payload }) => ({
  ...state,
  contextId: payload.address,
})

const init = (array) => array || []

export const selectStory = (state, { payload }) => {
  if (payload.address === state.storyId) {
    return state
  }

  return {
    ...state,
    contextId: state.storyId,
    storyId: payload.address,
    backward: state.storyId ? [state.storyId, ...init(state.backward)] : state.backward,
    forward: [],
    path: [...init(state.path), payload.address],
  }
}

export const selectMemory = (state, { payload }) => ({
  ...state,
  memoryId: payload.address,
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
    backward: [state.storyId, ...init(state.backward)],
    forward,
    path: [...init(state.path), storyId],
  }
}

export const goHome = (state) => ({
  ...state,
  storyId: undefined,
  backward: [state.storyId, ...(state.backward || [])],
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
