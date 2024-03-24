import { UPDATE_DIOSPHERE } from './diosphereActionTypes'

const updateDiosphereAction = (diosphere) => ({
  type: UPDATE_DIOSPHERE,
  payload: { diosphere },
})

export const updateDiosphere =
  () =>
  (dispatch, _, { dioryClient }) => {
    dispatch(updateDiosphereAction(dioryClient.diosphere.toObject()))
  }

export const addRoom =
  (roomData) =>
  (dispatch, _, { dioryClient }) => {
    const room = dioryClient.diosphere.addRoom(roomData)
    dispatch(updateDiosphere())
    return { room: room.toObject() }
  }

export const updateRoom =
  (roomData) =>
  (dispatch, getState, { dioryClient }) => {
    dioryClient.diosphere.updateRoom(roomData)
    dispatch(updateDiosphere())
  }

export const deleteRoom =
  (roomData) =>
  (dispatch, _, { dioryClient }) => {
    dioryClient.diosphere.removeRoom(roomData)
    dispatch(updateDiosphere())
  }

export const addDoor =
  (roomObject, linkedRoomObject) =>
  (dispatch, getState, { dioryClient }) => {
    dioryClient.diosphere.addRoomDoor(roomObject, linkedRoomObject)
    dispatch(updateDiosphere())
  }

export const removeDoor =
  (roomObject, linkedRoomObject) =>
  (dispatch, getState, { dioryClient }) => {
    dioryClient.diosphere.removeRoomDoor(roomObject, linkedRoomObject)
    dispatch(updateDiosphere())
  }

export const removeDoors =
  (deletedDoors) =>
  (dispatch, getState, { dioryClient }) => {
    deletedDoors.forEach(({ fromRoom, toRoom }) => {
      dioryClient.diosphere.removeRoomDoor(fromRoom, toRoom)
    })
    dispatch(updateDiosphere())
  }

export const resetDiosphere =
  () =>
  async (dispatch, getState, { dioryClient }) => {
    dioryClient.diosphere.resetRooms()
    dispatch(updateDiosphere())
  }
