import React from 'react'
import { Tablist } from 'evergreen-ui'

import { useDiograph } from '../diograph/useDiograph'
import { useDispatchActions, useSelector } from '../../store'

import { selectStory } from './navigationActions'

import LensesNavigation from '../lenses/LensesNavigation'

import NavigationBar from '../../components/NavigationBar'
import DiographNavigation from '../../components/diograph/DiographNavigation'
import NavigationButton from '../../components/NavigationButton'

const useHomeButton = () => {
  const { address } = useSelector((state) => state.home)
  const { dispatch } = useDispatchActions()
  return {
    text: 'DIORY',
    onClick: () => {
      dispatch(selectStory({ address }))
    },
    fontWeight: 'bold',
  }
}

export const Navigation = () => {
  const diograph = useDiograph()
  return (
    <NavigationBar>
      <NavigationButton {...useHomeButton()} />
      <Tablist display="flex" alignSelf="center">
        <DiographNavigation {...diograph} selectStory={selectStory} />
      </Tablist>
      <Tablist alignSelf="center" marginRight={8}>
        <LensesNavigation />
      </Tablist>
    </NavigationBar>
  )
}
