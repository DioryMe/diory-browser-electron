import {
  GET_DIOSPHERE_DIOGRAPH,
  GENERATE_DIOSPHERE_DIOGRAPH,
  UPDATE_DIOSPHERE_DIOGRAPH,
  SELECT_DIOSPHERE_CONTEXT,
  SELECT_DIOSPHERE_STORY,
  SELECT_DIOSPHERE_MEMORY,
  GO_DIOSPHERE_FORWARD,
  GO_DIOSPHERE_BACKWARD,
  GO_DIOSPHERE_HOME,
  GO_DIOSPHERE_SIDE,
} from './diosphereActionTypes'
import { createActions } from '../../store/storeUtils'

const updateDiographAction = (diograph) => ({
  type: UPDATE_DIOSPHERE_DIOGRAPH,
  payload: { diograph },
})

export const updateDiograph =
  () =>
  (dispatch, _, { diosphereClient }) => {
    dispatch(updateDiographAction(diosphereClient.diograph.toObject()))
  }

export const selectContext = ({ id }) => ({
  type: SELECT_DIOSPHERE_CONTEXT,
  payload: { id },
})

export const selectStory = ({ id }) => ({
  type: SELECT_DIOSPHERE_STORY,
  payload: { id },
})

export const selectMemory = ({ id } = {}) => ({
  type: SELECT_DIOSPHERE_MEMORY,
  payload: { id },
})

export const goBackward = () => ({ type: GO_DIOSPHERE_BACKWARD })
export const goForward = () => ({ type: GO_DIOSPHERE_FORWARD })

export const goSide = ({ storyId }) => ({
  type: GO_DIOSPHERE_SIDE,
  payload: { storyId },
})

export const goHome = () => ({ type: GO_DIOSPHERE_HOME })

const getDiographActions = createActions(GET_DIOSPHERE_DIOGRAPH)
export const getDiograph =
  (connection) =>
  async (dispatch, getState, { diosphereClient }) => {
    const { loading } = getState().diosphere
    if (!loading) {
      dispatch(getDiographActions.begin())
      try {
        await diosphereClient.getDiograph([connection])
        dispatch(updateDiograph())
        dispatch(selectStory(diosphereClient.diograph.getDiory({ id: '/' }).toObject()))
        dispatch(getDiographActions.success())
      } catch (error) {
        console.error(error)
        dispatch(getDiographActions.failure(error))
      }
    }
  }

const generateDiosphereActions = createActions(GENERATE_DIOSPHERE_DIOGRAPH)
export const generateDiograph =
  (connection) =>
  async (dispatch, getState, { diosphereClient }) => {
    const { loading } = getState().diosphere
    if (!loading) {
      dispatch(generateDiosphereActions.begin())
      try {
        await diosphereClient.generateDiograph([connection])
        dispatch(updateDiograph())
        dispatch(generateDiosphereActions.success())
      } catch (error) {
        console.error(error)
        dispatch(generateDiosphereActions.failure(error))
      }
    }
  }
