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

const addToStore = (oldState, connection, newState) => ({
  ...oldState,
  [connection]: {
    ...oldState[connection],
    ...newState,
  },
})

export const selectContext = (state, { payload, connection }) =>
  addToStore(state, connection, {
    contextId: payload.id,
  })

const init = (array) => array || []

export const selectStory = (state, { payload, connection }) => {
  const previousState = state[connection] || {}
  if (payload.id === previousState.storyId) {
    return state
  }

  return addToStore(state, connection, {
    contextId: previousState.storyId,
    storyId: payload.id,
    backward: previousState.storyId
      ? [previousState.storyId, ...init(previousState.backward)]
      : previousState.backward,
    forward: [],
    path: [...init(previousState.path), payload.id],
  })
}

export const selectMemory = (state, { payload, connection }) =>
  addToStore(state, connection, {
    memoryId: payload.id,
  })

export const goSide = (state, { payload, connection }) => {
  const previousState = state[connection] || {}

  return addToStore(state, connection, {
    storyId: payload.storyId,
    forward: [],
    path: Object.assign([], previousState.path, {
      [previousState.path.length - 1]: payload.storyId,
    }),
  })
}

export const goBackward = (state, { connection }) => {
  const previousState = state[connection] || {}

  const [storyId, ...backward] = previousState.backward
  return addToStore(state, connection, {
    storyId,
    backward,
    forward: [previousState.storyId, ...previousState.forward],
    path: [...previousState.path].slice(0, -1),
  })
}

export const goForward = (state, { connection }) => {
  const previousState = state[connection] || {}

  const [storyId, ...forward] = previousState.forward
  return addToStore(state, connection, {
    storyId,
    backward: [previousState.storyId, ...init(previousState.backward)],
    forward,
    path: [...init(previousState.path), storyId],
  })
}

export const goHome = (state, { connection }) => {
  const previousState = state[connection] || {}
  console.log(previousState)
  return addToStore(state, connection, {
    storyId: undefined,
    backward: [previousState.storyId, ...(previousState.backward || [])],
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
