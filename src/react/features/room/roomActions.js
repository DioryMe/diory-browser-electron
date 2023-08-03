import { SAVE_ROOM, GET_ROOM, SET_ROOM_CONNECTIONS } from './roomActionTypes'
import { createActions } from '../../store/storeUtils'

export const setRoomConnections = (connections) => ({
  type: SET_ROOM_CONNECTIONS,
  payload: { connections },
})

const getRoomActions = createActions(GET_ROOM)

export const getRoom =
  (doorConnections) =>
  async (dispatch, getState, { connectors }) => {
    const { loading } = getState().room
    if (!loading) {
      dispatch(getRoomActions.begin())
      try {
        const { address } = doorConnections[0]
        const { id, connections, doors } = await connectors.folder.getDiograph(address)
        dispatch(getRoomActions.success({ id, connections, doors }))
      } catch (error) {
        dispatch(getRoomActions.failure(error))
      }
    }
  }

const saveRoomActions = createActions(SAVE_ROOM) // createPromiseActions, createPromiseReducers

export const saveRoom =
  (connections) =>
  async (dispatch, getState, { connectors }) => {
    const { saving } = getState().room
    if (!saving) {
      dispatch(saveRoomActions.begin())
      try {
        // TODO save room
        // const { connections } = getState().room
        // const { address } = connections[0]
        // await connectors.folder.saveRoom({ room, address })
        dispatch(saveRoomActions.success())
      } catch (error) {
        dispatch(saveRoomActions.failure(error))
      }
    }
  }
