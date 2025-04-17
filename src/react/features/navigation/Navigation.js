import React from 'react'
import { Tablist } from 'evergreen-ui'

import { useDispatchActions, useSelector } from '../../store'

import { selectStory } from './navigationActions'

import NavigationBar from '../../components/NavigationBar'
import NavigationButton from '../../components/NavigationButton'
import DiographNavigation from '../../components/diograph/DiographNavigation'
import LensesNavigation from '../lenses/LensesNavigation'

const useHomeButton = () => {
  const { address: key } = useSelector((state) => state.home)
  const { dispatch } = useDispatchActions()
  return {
    text: 'DIORY',
    onClick: () => {
      dispatch(selectStory({ key }))
    },
    fontWeight: 'bold',
    color: 'grey',
  }
}

export const Navigation = () => {
  return (
    <NavigationBar>
      <NavigationButton {...useHomeButton()} />
      <Tablist display="flex" alignSelf="center">
        <DiographNavigation />
      </Tablist>
      <Tablist alignSelf="center" marginRight={8}>
        <LensesNavigation />
      </Tablist>
    </NavigationBar>
  )
}
