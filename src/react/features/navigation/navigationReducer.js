import { SELECT_STORY, GO_BACKWARD, GO_FORWARD, GO_HOME, GO_SIDE } from './navigationActionTypes'

import { createReducer } from '../../store'

const initialState = {
  storyKey: undefined,
  backward: [],
  forward: [],
  path: [],
  selectedDiories: [],
}

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
  [SELECT_STORY]: selectStory,
  [GO_BACKWARD]: goBackward,
  [GO_FORWARD]: goForward,
  [GO_SIDE]: goSide,
  [GO_HOME]: goHome,
})
