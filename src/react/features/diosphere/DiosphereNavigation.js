import React from 'react'
import { Tablist } from 'evergreen-ui'

import { useDispatchActions, useSelector } from '../../store'
import { useDiosphere } from './useDiosphere'

import { goHome, selectContext, selectStory } from './diosphereActions'
import { setStore } from '../home/homeActions'

import NavigationBar from '../../components/NavigationBar'
import DiographNavigation from '../../components/diograph/DiographNavigation'
import NavigationButton from '../../components/NavigationButton'

const useHomeButton = () => {
  const { store } = useSelector((state) => state.home)
  const { dispatch } = useDispatchActions()
  return {
    text: 'DIOSPHERE',
    isSelected: store === 'diosphere',
    onClick: () => {
      store !== 'diosphere' ? dispatch(setStore('diosphere')) : dispatch(goHome())
    },
    fontWeight: 'bold',
  }
}

export const DiosphereNavigation = () => {
  const diosphere = useDiosphere()
  return (
    <NavigationBar bottom={0}>
      <NavigationButton {...useHomeButton()} />
      <Tablist display="flex" alignSelf="center">
        <DiographNavigation
          {...diosphere}
          selectStory={selectStory}
          selectContext={selectContext}
        />
      </Tablist>
    </NavigationBar>
  )
}
