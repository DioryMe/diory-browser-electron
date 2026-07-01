import { getHomeDiographActions, saveHomeDiographActions, SET_IS_HOME } from './homeActionTypes'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'
import { getDiory } from '../diograph/utils/getDiory'

export const setIsHome = (isHome) => ({
  type: SET_IS_HOME,
  payload: { isHome },
})

const homeAddress = 'home'

const DEFAULT_HOME_DIOGRAPH = {
  diory: { id: 'diory', text: 'Welcome to Diory! \n\n Click to choose your Diory location.' },
  folders: { id: 'folders' },
}

export const getHomeDiograph =
  () =>
  async (dispatch, getState, { diographClient }) => {
    const { loading } = getState().home
    if (!loading) {
      dispatch(getHomeDiographActions.begin())
      try {
        const { diograph = DEFAULT_HOME_DIOGRAPH } = await invokeChannel(channels.GET_HOME_DIOGRAPH)
        diographClient.addDiograph(homeAddress, diograph)

        dispatch(getHomeDiographActions.success({ diograph }))
      } catch (error) {
        console.error(error)
        dispatch(getHomeDiographActions.failure(error))
      }
    }
  }

export const addHomeDiory =
  (address) =>
  async (dispatch, getState, { diographClient }) => {
    const { saving, diograph: currentDiograph } = getState().home
    if (!saving) {
      dispatch(saveHomeDiographActions.begin())
      try {
        await diographClient.generateDiograph(address, '/', { saveDiograph: true })
        const { text, image, links } = diographClient
          .getDiograph(address)
          .getDiory({ id: '/' })
          .toObject()

        const home = diographClient.getDiograph(homeAddress)

        const previousStory = getDiory('diory', currentDiograph || {})
        if (previousStory && previousStory.key !== previousStory.id) {
          home.removeDiory({ id: previousStory.key })
        }

        home.getDiory({ id: 'diory' }).update({ text, image, links })
        home.addDiory({ id: 'diory' }, address)

        const diograph = home.toObject()

        await invokeChannel(channels.SAVE_HOME_DIOGRAPH, { diograph })
        dispatch(saveHomeDiographActions.success({ diograph }))
      } catch (error) {
        dispatch(saveHomeDiographActions.failure(error))
      }
    }
  }

export const addHomeFolder =
  (address, path = '/') =>
  async (dispatch, getState, { diographClient }) => {
    console.log('addHomeFolder', address)
    try {
      await diographClient.generateDiograph(address, path, { saveDiograph: false })
      const diory = diographClient.getDiograph(address).getDiory({ id: '/' }).toObject()

      diographClient.getDiograph('home').addDiory(diory, address)

      diographClient.getDiograph('home').getDiory({ id: 'folders' }).addLink(diory)

      const diograph = diographClient.getDiograph('home').toObject()
      console.log(diograph)

      await invokeChannel(channels.SAVE_HOME_DIOGRAPH, { diograph })
      dispatch(saveHomeDiographActions.success({ diograph }))
    } catch (error) {
      dispatch(saveHomeDiographActions.failure(error))
    }
  }
