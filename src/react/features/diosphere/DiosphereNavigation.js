import React from 'react'
import { Tablist } from 'evergreen-ui'

import { useDispatchActions, useSelector } from '../../store'
import { useDiograph } from '../home/useDiograph'

import { goHome, selectContext, selectStory } from '../navigation/navigationActions'
import { setStore } from '../home/homeActions'

import NavigationBar from '../../components/NavigationBar'
import DiographNavigation from '../../components/diograph/DiographNavigation'
import NavigationButton from '../../components/NavigationButton'

const useHomeButton = () => {
  const { storeId } = useSelector((state) => state.home)
  const { dispatch } = useDispatchActions()
  return {
    text: 'DIOSPHERE',
    isSelected: storeId === 'diosphere',
    onClick: () => {
      storeId !== 'diosphere' ? dispatch(setStore('diosphere')) : dispatch(goHome())
    },
    fontWeight: 'bold',
  }
}

export const DiosphereNavigation = () => {
  const diograph = useDiograph()
  return (
    <NavigationBar bottom={0}>
      <NavigationButton {...useHomeButton()} />
      <Tablist display="flex" alignSelf="center">
        <DiographNavigation {...diograph} selectStory={selectStory} selectContext={selectContext} />
      </Tablist>
    </NavigationBar>
  )
}
