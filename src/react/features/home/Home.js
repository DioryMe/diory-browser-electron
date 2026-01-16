import React from 'react'
import { useDispatchActions, useSelector } from '../../store'

import { useGetHomeEffect } from './useGetHomeEffect'
import { useAddFolderTool } from '../tools/addFolder'
import { getStoryDiories } from '../diograph/utils/getStoryDiories'
import { useSaveHomeAddress } from './utils/useSaveHomeAddress'

import { setDiographAddress } from '../diograph/diographActions'
import { setIsHome } from './homeActions'

import { HomeView } from './components/HomeView'
import { HomeNavigation } from './components/HomeNavigation'
import Fullscreen from '../../components/Fullscreen'

const useActions = () => {
  const { address } = useSelector((state) => state.home)
  const saveHomeAddress = useSaveHomeAddress()

  const { dispatch } = useDispatchActions()
  return {
    onStoryClick: () => {
      if (!address) {
        saveHomeAddress()
      }

      if (address) {
        dispatch(setIsHome(false))
        dispatch(setDiographAddress(address, true))
      }
    },
    onMemoryClick: ({ diory }) => {
      dispatch(setIsHome(false))
      dispatch(setDiographAddress(diory.key, false))
    },
  }
}

const welcomeStory = {
  text: 'Welcome to Diory! \n\n Click to choose your Diory location.',
  image:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcfdT2PwAGPgKeWQwJuAAAAABJRU5ErkJggg==',
}

export const Home = () => {
  useGetHomeEffect()
  useAddFolderTool()

  const { address } = useSelector((state) => state.home)

  const { diograph } = useSelector((state) => state.diograph)
  const { story } = getStoryDiories(address, diograph)
  const { memories } = getStoryDiories(`${address}folders`, diograph)

  const actions = useActions()

  return (
    <Fullscreen>
      <HomeNavigation onLogout={useSaveHomeAddress()} />
      <HomeView story={story || welcomeStory} memories={memories} {...actions} />
    </Fullscreen>
  )
}
