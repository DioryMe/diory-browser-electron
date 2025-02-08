import React from 'react'
import { Tablist } from 'evergreen-ui'

import { useDiograph } from '../diograph/useDiograph'
import { useDispatchActions, useSelector } from '../../store'

import { goHome, selectContext, selectStory } from '../navigation/navigationActions'

import LensesNavigation from '../lenses/LensesNavigation'

import NavigationBar from '../../components/NavigationBar'
import DiographNavigation from '../../components/diograph/DiographNavigation'
import NavigationButton from '../../components/NavigationButton'
import { setDiographConnection } from '../home/homeActions'

const useHomeButton = () => {
  const { homeConnection } = useSelector((state) => state.home)
  const { dispatch } = useDispatchActions()
  return {
    text: 'DIORY',
    onClick: () => {
      dispatch(setDiographConnection(homeConnection))
      dispatch(goHome())
    },
    fontWeight: 'bold',
  }
}

export const DioryNavigation = () => {
  const diograph = useDiograph()
  return (
    <NavigationBar>
      <NavigationButton {...useHomeButton()} />
      <Tablist display="flex" alignSelf="center">
        <DiographNavigation {...diograph} selectStory={selectStory} selectContext={selectContext} />
      </Tablist>
      <Tablist alignSelf="center" marginRight={8}>
        <LensesNavigation />
      </Tablist>
    </NavigationBar>
  )
}
