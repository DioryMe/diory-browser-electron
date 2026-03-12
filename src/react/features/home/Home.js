import React from 'react'
import { useDispatchActions, useSelector } from '../../store'

import { useGetHomeEffect } from './useGetHomeEffect'
import { useAddFolderTool } from '../tools/actions/addFolder'
import { useSaveHomeAddress } from './utils/useSaveHomeAddress'
import { useIsHome } from './utils/useIsHome'

import { setDiographAddress } from '../diograph/diographActions'
import { setIsHome } from './homeActions'

import { getStoryDiories } from '../diograph/utils/getStoryDiories'

import { HomeView } from './components/HomeView'
import { HomeNavigation } from './components/HomeNavigation'
import Fullscreen from '../../components/Fullscreen'
import BackgroundDiory from '../../components/diories/BackgroundDiory'
import { NavigationBar } from '../navigation/components/NavigationBar'

// TODO move to hooks
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

  // TODO move to browser, create root?
  const { address } = useSelector((state) => state.home)
  const { diograph } = useSelector((state) => state.diograph)
  const { story = {} } = getStoryDiories(address, diograph)
  const { memories } = getStoryDiories(`${address}folders`, diograph)

  const actions = useActions()

  return (
    <Fullscreen>
      <NavigationBar>
        <HomeNavigation
          home={{ text: 'DIORY' }}
          onLogout={useSaveHomeAddress()}
        />
      </NavigationBar>
      <BackgroundDiory diory={story} />
      <HomeView story={story} memories={memories} {...actions} />
    </Fullscreen>
  )
}

export const Home = () => {
  useGetHomeEffect()

  const { address } = useSelector((state) => state.home)
  return useIsHome() && address ? <HomeData /> : null
}
