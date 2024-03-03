import { UPDATE_DIOSPHERE, GET_DIOSPHERE, SAVE_DIOSPHERE } from './diosphereActionTypes'

import { createActions } from '../../store/storeUtils'

const updateDiosphere = (rooms) => ({
  type: UPDATE_DIOSPHERE,
  payload: { rooms },
})

export const addDiosphere =
  (diosphereData) =>
  (dispatch, _, { diosphereStore }) => {
    diosphereStore.addDiosphere(diosphereData)
    dispatch(updateDiosphere(diosphereStore.toObject()))
  }

export const addRoom =
  (roomData) =>
  (dispatch, _, { diosphereStore }) => {
    const room = diosphereStore.addRoom(roomData)
    dispatch(updateDiosphere(diosphereStore.toObject()))
    return { room: room.toObject() }
  }

export const updateRoom =
  (roomData) =>
  (dispatch, getState, { diosphereStore }) => {
    diosphereStore.updateRoom(roomData)
    dispatch(updateDiosphere(diosphereStore.toObject()))
  }

export const deleteRoom =
  (roomData) =>
  (dispatch, _, { diosphereStore }) => {
    diosphereStore.removeRoom(roomData)
    dispatch(updateDiosphere(diosphereStore.toObject()))
  }

export const addDoor =
  (roomObject, linkedRoomObject) =>
  (dispatch, getState, { diosphereStore }) => {
    diosphereStore.addRoomDoor(roomObject, linkedRoomObject)
    dispatch(updateDiosphere(diosphereStore.toObject()))
  }

export const removeDoor =
  (roomObject, linkedRoomObject) =>
  (dispatch, getState, { diosphereStore }) => {
    diosphereStore.removeRoomDoor(roomObject, linkedRoomObject)
    dispatch(updateDiosphere(diosphereStore.toObject()))
  }

export const removeDoors =
  (deletedDoors) =>
  (dispatch, getState, { diosphereStore }) => {
    deletedDoors.forEach(({ fromRoom, toRoom }) => {
      diosphereStore.removeRoomDoor(fromRoom, toRoom)
    })
    dispatch(updateDiosphere(diosphereStore.toObject()))
  }

const getDiosphereActions = createActions(GET_DIOSPHERE)
export const getDiosphere =
  (address) =>
  async (dispatch, getState, { diosphereStore, connectors }) => {
    const { loading } = getState().diosphere
    if (!loading) {
      dispatch(getDiosphereActions.begin())
      try {
        const { rooms } = await connectors.folder.getDiosphere(address)
        diosphereStore.resetDiosphere().addDiosphere(rooms)
        dispatch(getDiosphereActions.success({ rooms: diosphereStore.toObject() }))
      } catch (error) {
        console.log(error)
        dispatch(getDiosphereActions.failure(error.message))
      }
    }
  }

const saveDiosphereActions = createActions(SAVE_DIOSPHERE)
export const saveDiosphere =
  (address) =>
  async (dispatch, getState, { diosphereStore, connectors }) => {
    const { saving } = getState().diosphere
    if (!saving) {
      dispatch(saveDiosphereActions.begin())
      try {
        await connectors.folder.saveDiosphere(address, diosphereStore.toObject())
        dispatch(saveDiosphereActions.success())
      } catch (error) {
        console.error(error)
        dispatch(saveDiosphereActions.failure(error))
      }
    }
  }

export const resetDiosphere =
  () =>
  async (dispatch, getState, { diosphereStore }) => {
    diosphereStore.resetDiosphere()
  }
