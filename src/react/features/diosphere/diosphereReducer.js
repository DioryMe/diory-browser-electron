import {
  GET_DIOSPHERE_DIOGRAPH,
  GENERATE_DIOSPHERE_DIOGRAPH,
  UPDATE_DIOSPHERE_DIOGRAPH,
  SELECT_DIOSPHERE_CONTEXT,
  SELECT_DIOSPHERE_STORY,
  SELECT_DIOSPHERE_MEMORY,
  GO_DIOSPHERE_BACKWARD,
  GO_DIOSPHERE_FORWARD,
  GO_DIOSPHERE_SIDE,
  GO_DIOSPHERE_HOME,
} from './diosphereActionTypes'

import { createReducer, promiseReducers } from '../../store'

const initialState = {
  address: undefined,
  diograph: {},
  contextId: null,
  storyId: null,
  memoryId: null,
  backward: [],
  forward: [],
  path: [],
}

export const updateDiograph = (state, { payload: { diograph } }) => ({
  ...state,
  diograph,
})

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
    storyId: payload.id || state.diograph[payload.key].id,
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
  storyId: state.diograph['/'].id,
  backward: [state.storyId, ...state.backward],
  forward: [],
  path: [],
})

export default createReducer(initialState, {
  ...promiseReducers(GET_DIOSPHERE_DIOGRAPH, 'loading', 'loaded', 'error'),
  ...promiseReducers(GENERATE_DIOSPHERE_DIOGRAPH, 'generating', 'generated', 'error'),
  [UPDATE_DIOSPHERE_DIOGRAPH]: updateDiograph,
  [SELECT_DIOSPHERE_CONTEXT]: selectContext,
  [SELECT_DIOSPHERE_STORY]: selectStory,
  [SELECT_DIOSPHERE_MEMORY]: selectMemory,
  [GO_DIOSPHERE_BACKWARD]: goBackward,
  [GO_DIOSPHERE_FORWARD]: goForward,
  [GO_DIOSPHERE_SIDE]: goSide,
  [GO_DIOSPHERE_HOME]: goHome,
})
