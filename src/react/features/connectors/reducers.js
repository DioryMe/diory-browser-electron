import {
  SET_CONNECTIONS,
  REMOVE_CONNECTION,
  UPDATE_CONNECTION,
  ADD_CONNECTION,
} from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  connections: {
    '/file//Users/op/2020/diory/IPFS': '11909355-48ed-475b-86a9-a47dbd15c492',
    '/ipns/QmahMVyKf4xpE6mwPTPqZ3eo4Z1xYJnhGAFmjc9kFuMhou': '11909355-48ed-475b-86a9-a47dbd15c492',
  },
  updated: false,
}

export const setConnections = (state, { payload }) => ({
  ...state,
  connections: payload.connections,
  updated: false,
})

export const addConnection = (state, { payload }) => ({
  ...state,
  connections: {
    ...state.connections,
    [payload.address]: payload.room,
  },
  updated: true,
})

export const removeConnection = (state, { payload }) => {
  const { [payload.address]: omit, ...connections } = state.connections
  return {
    ...state,
    connections,
    updated: true,
  }
}

export const updateConnection = (state, { payload }) => {
  const { [payload.previousAddress]: omit, ...connections } = state.connections
  return {
    ...state,
    connections: {
      ...connections,
      [payload.nextAddress]: payload.room,
    },
    updated: true,
  }
}

export default createReducer({
  [SET_CONNECTIONS]: setConnections,
  [ADD_CONNECTION]: addConnection,
  [REMOVE_CONNECTION]: removeConnection,
  [UPDATE_CONNECTION]: updateConnection,
})
