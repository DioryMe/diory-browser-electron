import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatchActions, useSelector } from '../../store'

import { selectStory } from './navigationActions'

import NavigationBar from './components/NavigationBar'
import { MenuItem } from '../../components/MenuItem'
import { DiographNavigation } from './DiographNavigation'
import { LensesNavigation } from './LensesNavigation'
import { SideBarToggle } from '../sideBar/components/SideBarToggle'

const useHomeButton = () => {
  const { address: key } = useSelector((state) => state.home)
  const { dispatch } = useDispatchActions()
  return {
    text: 'DIORY',
    onClick: () => dispatch(selectStory({ key })),
  }
}

export const Navigation = () => (
  <NavigationBar>
    <Pane alignSelf="center" display="flex" flexDirection="row">
      <SideBarToggle side="left" />
      <MenuItem fontWeight="bold" {...useHomeButton()} />
    </Pane>
    <Pane alignSelf="center" marginRight={8} display="flex" flexDirection="row">
      <DiographNavigation />
    </Pane>
    <LensesNavigation />
  </NavigationBar>
)
