import { SET_ROOMS, ADD_ROOM, REMOVE_ROOM, UPDATE_ROOM, SAVE_HOME } from './actionsTypes'
import { createReducer, promiseReducers } from '../../store'

export const initialState = {
  rooms: {},
  updated: false,
}

export const setRooms = (state, { payload }) => ({
  ...state,
  rooms: payload.rooms,
  updated: false,
})

export const addRoom = (state, { payload }) => ({
  ...state,
  rooms: {
    ...state.rooms,
    [payload.room.id]: payload.room,
  },
  updated: true,
})

export const removeRoom = (state, { payload }) => {
  const { [payload.room.id]: omit, ...rooms } = state.rooms
  return {
    ...state,
    rooms,
    updated: true,
  }
}

export const updateRoom = (state, { payload }) => ({
  ...state,
  rooms: {
    ...state.rooms,
    [payload.room.id]: payload.room,
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
