import {
  SET_CONNECTIONS,
  ADD_CONNECTION,
  REMOVE_CONNECTION,
  UPDATE_CONNECTION,
} from './actionsTypes'

export const setConnections = (connections) => ({
  type: SET_CONNECTIONS,
  payload: { connections },
})

export const addConnection = ({ address, room }) => ({
  type: ADD_CONNECTION,
  payload: { address, room },
})

export const removeConnection = ({ address, room }) => ({
  type: REMOVE_CONNECTION,
  payload: { address, room },
})

export const updateConnection = (connection) => ({
  type: UPDATE_CONNECTION,
  payload: connection,
})
