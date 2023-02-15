import { SAVE_ROOM, GET_ROOM, SET_ROOM_ADDRESS } from './roomActionTypes'
import { createActions } from '../../store/storeUtils'

export const setRoomAddress = (address) => ({
  type: SET_ROOM_ADDRESS,
  payload: { address },
})

const saveRoomActions = createActions(SAVE_ROOM)

export const saveRoom =
  () =>
  async (dispatch, getState, { connectors }) => {
    const { saving } = getState().room
    if (!saving) {
      dispatch(saveRoomActions.begin())
      try {
        const { address } = getState().room
        await connectors.folder.saveRoom({ address })
        dispatch(saveRoomActions.success())
      } catch (error) {
        dispatch(saveRoomActions.failure(error))
      }
    }
  }

const getRoomActions = createActions(GET_ROOM)

export const getRoom =
  () =>
  async (dispatch, getState, { connectors }) => {
    const { loading } = getState().room
    if (!loading) {
      dispatch(getRoomActions.begin())
      try {
        const { address } = getState().room
        const { connections } = await connectors.folder.getRoom(address)
        dispatch(getRoomActions.success({ connections }))
      } catch (error) {
        dispatch(getRoomActions.failure(error))
      }
    }
  }
