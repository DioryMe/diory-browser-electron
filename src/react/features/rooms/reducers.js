import { SET_ROOMS, ADD_ROOM, REMOVE_ROOM, UPDATE_ROOM, SAVE_HOME } from './actionsTypes'
import { createReducer, promiseReducers } from '../../store'

export const initialState = {
  rooms: {},
  updated: false,
}

const setRooms = (state, { payload }) => ({
  ...state,
  rooms: payload.rooms,
  updated: false,
})

const addRoom = (state, { payload }) => ({
  ...state,
  rooms: {
    ...state.rooms,
    [payload.id]: payload.diory,
  },
  updated: true,
})

const removeRoom = (state, { payload }) => {
  // eslint-disable-next-line no-unused-vars
  const { [payload.id]: omit, ...rooms } = state.rooms
  return {
    ...state,
    rooms,
    updated: true,
  }
}

const updateRoom = (state, { payload }) => ({
  ...state,
  rooms: {
    ...state.rooms,
    [payload.id]: payload.diory,
  },
  updated: true,
})

export default createReducer({
  [SET_ROOMS]: setRooms,
  [ADD_ROOM]: addRoom,
  [REMOVE_ROOM]: removeRoom,
  [UPDATE_ROOM]: updateRoom,
  ...promiseReducers(SAVE_HOME, 'updated', 'saving', 'saved', 'error'),
})
