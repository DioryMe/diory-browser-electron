import { SAVE_HOME } from '../home/actionsTypes'
import {
  SET_CONNECTIONS,
  REMOVE_CONNECTION,
  UPDATE_CONNECTION,
  ADD_CONNECTION,
  SET_CONNECTION,
} from './actionsTypes'

import { createReducer, promiseReducers } from '../../store'

export const initialState = {
  connections: {},
  updated: false,
}

const setConnections = (state, { payload }) => ({
  ...state,
  connections: payload.connections,
  updated: false,
})

const addConnection = (state, { payload }) => ({
  ...state,
  connections: {
    ...state.connections,
    [payload.address]: {
      room: payload.room,
      root: payload.root,
      connector: payload.connector,
      connect: true,
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
  updated: true,
})

const setConnection = (state, { payload: { address, ...props } }) => ({
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
  [SET_CONNECTION]: setConnection,
  ...promiseReducers(SAVE_HOME, 'updated', 'saving', 'saved', 'error'),
})
