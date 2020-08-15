import {
  SET_CONNECTIONS,
  REMOVE_CONNECTION,
  UPDATE_CONNECTION,
  ADD_CONNECTION,
} from './actionsTypes'
import { createReducer } from '../../store'

export const initialState = {
  connections: {},
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
      connector: payload.connector,
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

const updateConnection = (state, { payload: { address, ...props } }) => ({
  ...state,
  connections: {
    ...state.connections,
    [address]: { ...state.connections[address], ...props },
  },
  updated: false,
})

export default createReducer({
  [SET_CONNECTIONS]: setConnections,
  [ADD_CONNECTION]: addConnection,
  [REMOVE_CONNECTION]: removeConnection,
  [UPDATE_CONNECTION]: updateConnection,
})
