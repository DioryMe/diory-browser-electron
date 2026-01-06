import React from 'react'
import { useDispatchActions, useSelector } from '../../store'

import { useGetHomeEffect } from './useGetHomeEffect'
import { useAddFolderTool } from '../tools/addFolder'
import { useDiories } from '../diograph/utils/useDiories'
import { useSaveHomeAddress } from './utils/useSaveHomeAddress'

import { setDiographAddress } from '../diograph/diographActions'

import { HomeView } from './components/HomeView'
import { HomeNavigation } from './components/HomeNavigation'
import Fullscreen from '../../components/Fullscreen'

const useActions = () => {
  const { address } = useSelector((state) => state.home)
  const saveHomeAddress = useSaveHomeAddress()

  const { dispatch } = useDispatchActions()
  return {
    onStoryClick: ({ diory }) => {
      address ? dispatch(setDiographAddress(diory.key, true)) : saveHomeAddress()
    },
    onMemoryClick: ({ diory }) => dispatch(setDiographAddress(diory.key, false)),
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

  const { story } = useDiories(address)
  const { memories } = useDiories(`${address}folders`)

  const actions = useActions()

  return (
    <Fullscreen>
      <HomeNavigation onLogout={useSaveHomeAddress()} />
      <HomeView story={story || welcomeStory} memories={memories} {...actions} />
    </Fullscreen>
  )
}
