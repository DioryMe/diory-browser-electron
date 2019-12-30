import * as types from './actionsTypes'
import createReducer from '../../store/createReducer'

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
  [types.SET_ROOMS]: setRooms,
  [types.ADD_ROOM]: addRoom,
  [types.REMOVE_ROOM]: removeRoom,
  [types.UPDATE_ROOM]: updateRoom,
})
