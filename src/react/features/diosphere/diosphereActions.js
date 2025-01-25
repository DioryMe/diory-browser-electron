import {
  GET_DIOSPHERE_DIOGRAPH,
  GENERATE_DIOSPHERE_DIOGRAPH,
  UPDATE_DIOSPHERE_DIOGRAPH,
} from './diosphereActionTypes'
import { createActions } from '../../store/storeUtils'
import { selectStory } from '../navigation/navigationActions'

const updateDiographAction = (diograph) => ({
  type: UPDATE_DIOSPHERE_DIOGRAPH,
  payload: { diograph },
})

export const updateDiograph =
  () =>
  (dispatch, _, { diosphereClient }) => {
    dispatch(updateDiographAction(diosphereClient.diograph.toObject()))
  }

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
        dispatch(
          selectStory(diosphereClient.diograph.getDiory({ id: '/' }).toObject(), 'diosphere')
        )
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
