import React from 'react'
import { useDispatchActions, useSelector } from '../../store'

import { useGetHomeEffect } from './useGetHomeEffect'
import { useAddFolderTool } from '../tools/actions/addFolder'
import { useSaveHomeAddress } from './utils/useSaveHomeAddress'

import { setDiographAddress } from '../diograph/diographActions'
import { setIsHome } from './homeActions'

import { getStoryDiories } from '../diograph/utils/getStoryDiories'

import { HomeView } from './components/HomeView'
import { HomeNavigation } from './components/HomeNavigation'
import Fullscreen from '../../components/Fullscreen'
import { NavigationBar } from '../navigation/components/NavigationBar'
import { useDiograph } from '../diograph/utils/useDiograph'

const useActions = () => {
  const { address } = useSelector((state) => state.home)

  const { dispatch } = useDispatchActions()
  return {
    onStoryClick: () => {
      dispatch(setIsHome(false))
      dispatch(setDiographAddress(address, true))
    },
    onMemoryClick: ({ diory }) => {
      dispatch(setIsHome(false))
      dispatch(setDiographAddress(diory.key, false))
    },
  }
}

const HomeData = () => {
  useAddFolderTool()

  const { address } = useSelector((state) => state.home)
  const { diograph } = useSelector((state) => state.diograph) // Needs whole diograph for links to other diographs
  const { createDiory } = useDiograph(address)

  const { story = {} } = getStoryDiories(address, diograph)

  const foldersDiory = createDiory({ id: 'folders' })
  const { memories } = getStoryDiories(foldersDiory.key, diograph)

  const actions = useActions()

  return (
    <Fullscreen>
      <NavigationBar>
        <HomeNavigation
          logo={{ text: 'DIORY' }}
          home={{ text: 'Home' }}
          onLogout={useSaveHomeAddress()}
        />
      </NavigationBar>
      <HomeView story={story} memories={memories} {...actions} />
    </Fullscreen>
  )
}

export const Home = () => {
  const { loaded } = useGetHomeEffect()

  return loaded ? <HomeData /> : null
}
