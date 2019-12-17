import * as types from './actionsTypes'

export const setRooms = rooms => ({
  type: types.SET_ROOMS,
  payload: { rooms },
})

export const addRoom = room => ({ type: types.ADD_ROOM, payload: { room } })

export const removeRoom = room => ({
  type: types.REMOVE_ROOM,
  payload: { room },
})

export const updateRoom = room => ({
  type: types.UPDATE_ROOM,
  payload: { room },
})
