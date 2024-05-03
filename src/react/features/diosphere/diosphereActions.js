import { UPDATE_DIOSPHERE } from './diosphereActionTypes'

const updateDiosphereAction = (diosphere) => ({
  type: UPDATE_DIOSPHERE,
  payload: { diosphere },
})

export const updateDiosphere =
  () =>
  (dispatch, _, { dioryClient: adapter }) => {
    // Update also room in focus
    dispatch(updateDiosphereAction(adapter.getDiosphereObject()))
  }

export const addRoom =
  (roomData) =>
  (dispatch, _, { dioryClient: adapter }) => {
    const room = adapter.diosphere.addRoom(roomData)
    dispatch(updateDiosphere())
    return { room: room.toObject() }
  }

export const updateRoom =
  (roomData) =>
  (dispatch, getState, { dioryClient: adapter }) => {
    adapter.diosphere.updateRoom(roomData)
    dispatch(updateDiosphere())
  }

export const deleteRoom =
  (roomData) =>
  (dispatch, _, { dioryClient: adapter }) => {
    adapter.diosphere.removeRoom(roomData)
    dispatch(updateDiosphere())
  }

export const addDoor =
  (roomObject, linkedRoomObject) =>
  (dispatch, getState, { dioryClient: adapter }) => {
    adapter.diosphere.addRoomDoor(roomObject, linkedRoomObject)
    dispatch(updateDiosphere())
  }

export const removeDoor =
  (roomObject, linkedRoomObject) =>
  (dispatch, getState, { dioryClient: adapter }) => {
    adapter.diosphere.removeRoomDoor(roomObject, linkedRoomObject)
    dispatch(updateDiosphere())
  }

export const removeDoors =
  (deletedDoors) =>
  (dispatch, getState, { dioryClient: adapter }) => {
    deletedDoors.forEach(({ fromRoom, toRoom }) => {
      adapter.diosphere.removeRoomDoor(fromRoom, toRoom)
    })
    dispatch(updateDiosphere())
  }

export const resetDiosphere =
  () =>
  async (dispatch, getState, { dioryClient: adapter }) => {
    adapter.diosphere.resetRooms()
    dispatch(updateDiosphere())
  }
