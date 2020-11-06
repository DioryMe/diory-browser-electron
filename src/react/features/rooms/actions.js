import { SET_ROOMS, ADD_ROOM, REMOVE_ROOM, UPDATE_ROOM, SAVE_HOME } from './actionsTypes'

export const setRooms = (rooms) => ({
  type: SET_ROOMS,
  payload: { rooms },
})

export const addRoom = (id, diory) => ({
  type: ADD_ROOM,
  payload: { id, diory },
})

export const removeRoom = ({ id }) => ({
  type: REMOVE_ROOM,
  payload: { id },
})

export const updateRoom = (room) => ({
  type: UPDATE_ROOM,
  payload: { room },
})

export const saveHome = () => ({
  type: SAVE_HOME,
})
