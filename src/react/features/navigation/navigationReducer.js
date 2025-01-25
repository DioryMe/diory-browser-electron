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

// type NavigationState = {
//   contextId: null,
//   storyId: null,
//   memoryId: null,
//   backward: [],
//   forward: [],
//   path: [],
// }

const initialState = {}

const addToStore = (oldState, storeId, newState) => ({
  ...oldState,
  [storeId]: {
    ...oldState[storeId],
    ...newState,
  },
})

export const selectContext = (state, { payload, storeId }) =>
  addToStore(state, storeId, {
    contextId: payload.id,
  })

const init = (array) => array || []

export const selectStory = (state, { payload, storeId }) => {
  const previousState = state[storeId] || {}
  if (payload.id === previousState.storyId) {
    return state
  }

  return addToStore(state, storeId, {
    contextId: previousState.storyId,
    storyId: payload.id,
    backward: previousState.storyId
      ? [previousState.storyId, ...init(previousState.backward)]
      : previousState.backward,
    forward: [],
    path: [...init(previousState.path), payload.id],
  })
}

export const selectMemory = (state, { payload, storeId }) =>
  addToStore(state, storeId, {
    memoryId: payload.id,
  })

export const goSide = (state, { payload, storeId }) => {
  const previousState = state[storeId] || {}

  return addToStore(state, storeId, {
    storyId: payload.storyId,
    forward: [],
    path: Object.assign([], previousState.path, {
      [previousState.path.length - 1]: payload.storyId,
    }),
  })
}

export const goBackward = (state, { storeId }) => {
  const previousState = state[storeId] || {}

  const [storyId, ...backward] = previousState.backward
  return addToStore(state, storeId, {
    storyId,
    backward,
    forward: [previousState.storyId, ...previousState.forward],
    path: [...previousState.path].slice(0, -1),
  })
}

export const goForward = (state, { storeId }) => {
  const previousState = state[storeId] || {}

  const [storyId, ...forward] = previousState.forward
  return addToStore(state, storeId, {
    storyId,
    backward: [previousState.storyId, ...init(previousState.backward)],
    forward,
    path: [...init(previousState.path), storyId],
  })
}

export const goHome = (state, { storeId }) => {
  const previousState = state[storeId] || {}

  return addToStore(state, storeId, {
    storyId: undefined,
    backward: [previousState.storyId, ...previousState.backward],
    forward: [],
    path: [],
  })
}

export default createReducer(initialState, {
  [SELECT_CONTEXT]: selectContext,
  [SELECT_STORY]: selectStory,
  [SELECT_MEMORY]: selectMemory,
  [GO_BACKWARD]: goBackward,
  [GO_FORWARD]: goForward,
  [GO_SIDE]: goSide,
  [GO_HOME]: goHome,
})
