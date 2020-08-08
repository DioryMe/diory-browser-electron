import {
  SET_CONNECTIONS,
  REMOVE_CONNECTION,
  UPDATE_CONNECTION,
  ADD_CONNECTION,
} from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  connections: {
    '/file//Users/op/2020/diory/IPFS': {
      room: '11909355-48ed-475b-86a9-a47dbd15c492',
      connected: false,
    },
    '/ipns/QmahMVyKf4xpE6mwPTPqZ3eo4Z1xYJnhGAFmjc9kFuMhou': {
      room: '11909355-48ed-475b-86a9-a47dbd15c492',
      connected: false,
    },
  },
  updated: false,
}

const setConnections = (state, { payload }) => ({
  ...state,
  connections: payload.connections,
  updated: true,
})

const addConnection = (state, { payload }) => ({
  ...state,
  connections: {
    ...state.connections,
    [payload.address]: {
      room: payload.room,
      connected: false,
    },
  },
  updated: true,
})

const removeConnection = (state, { payload }) => {
  const { [payload.address]: omit, ...connections } = state.connections
  return {
    ...state,
    connections,
    updated: true,
  }
}

const updateConnection = (state, { payload: { address, room, connected } }) => ({
  ...state,
  connections: {
    ...state.connections,
    [address]: { room, connected },
  },
  updated: false,
})

export default createReducer({
  [SET_CONNECTIONS]: setConnections,
  [ADD_CONNECTION]: addConnection,
  [REMOVE_CONNECTION]: removeConnection,
  [UPDATE_CONNECTION]: updateConnection,
})
