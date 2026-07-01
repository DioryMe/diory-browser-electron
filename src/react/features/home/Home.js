import React from 'react'
import { useDispatchActions, useSelector } from '../../store'

import { useGetHomeEffect } from './useGetHomeEffect'
import { useAddFolderTool } from '../tools/actions/addFolder'
import { useAddHomeDiory } from './utils/useAddHomeDiory'

import { setDiographAddress } from '../diograph/diographActions'
import { setIsHome } from './homeActions'
import { getStoryDiories } from '../diograph/utils/getStoryDiories'
import { selectStory } from '../navigation/navigationActions'

import { HomeView } from './components/HomeView'
import { HomeNavigation } from './components/HomeNavigation'
import Fullscreen from '../../components/Fullscreen'
import { NavigationBar } from '../navigation/components/NavigationBar'

const useActions = (addHomeDiory) => {
  const { dispatch } = useDispatchActions()
  return {
    onStoryClick: ({ diory }) => {
      if (diory.key === diory.id) {
        addHomeDiory()
        return
      }
      dispatch(setIsHome(false))
      dispatch(setDiographAddress(diory.key, true))
    },
    onMemoryClick: ({ diory }) => {
      dispatch(setIsHome(false))
      dispatch(setDiographAddress(diory.key, false))
      dispatch(selectStory({ key: '/' }))
    },
  }
}

const HomeData = () => {
  useAddFolderTool()

  const { diograph } = useSelector((state) => state.home) // Needs whole diograph for links to other diographs
  const { story = {} } = getStoryDiories('diory', diograph)
  const { memories } = getStoryDiories('folders', diograph)

  const addHomeDiory = useAddHomeDiory()
  const actions = useActions(addHomeDiory)

  return (
    <Fullscreen>
      <NavigationBar>
        <HomeNavigation logo={{ text: 'DIORY' }} home={{ text: 'Home' }} onLogout={addHomeDiory} />
      </NavigationBar>
      <HomeView story={story} memories={memories} {...actions} />
    </Fullscreen>
  )
}

export const Home = () => {
  const { loaded } = useGetHomeEffect()
  return loaded ? <HomeData /> : null
}
