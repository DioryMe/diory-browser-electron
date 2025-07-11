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
  contextKey: null,
  storyKey: undefined,
  memoryKey: null,
  backward: [],
  forward: [],
  path: [],
  selectedDiories: [],
}

export const selectContext = (state, { payload }) => ({
  ...state,
  contextKey: payload.key,
})

const init = (array) => array || []

export const selectStory = (state, { payload }) => {
  if (payload.key === state.storyKey) {
    return state
  }

  return {
    ...state,
    contextKey: state.storyKey,
    storyKey: payload.key,
    backward: state.storyKey ? [state.storyKey, ...init(state.backward)] : state.backward,
    forward: [],
    path: [...init(state.path), payload.key],
  }
}

export const selectMemory = (state, { payload }) => ({
  ...state,
  memoryKey: payload.key,
})

export const goSide = (state, { payload }) => ({
  ...state,
  storyKey: payload.key,
  forward: [],
  path: Object.assign([], state.path, {
    [state.path.length - 1]: payload.key,
  }),
})

export const goBackward = (state) => {
  const [storyKey, ...backward] = state.backward
  return {
    ...state,
    storyKey,
    backward,
    forward: [state.storyKey, ...state.forward],
    path: [...state.path].slice(0, -1),
  }
}

export const goForward = (state) => {
  const [storyKey, ...forward] = state.forward
  return {
    ...state,
    storyKey,
    backward: [state.storyKey, ...init(state.backward)],
    forward,
    path: [...init(state.path), storyKey],
  }
}

export const goHome = (state) => ({
  ...state,
  storyKey: undefined,
  backward: [state.storyKey, ...(state.backward || [])],
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
