import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { useDispatchActions, useSelector } from '../../store'
import { useSaveHomeAddress } from '../home/useSaveHomeAddress'

import { selectStory } from './navigationActions'

import { NavigationBar } from './components/NavigationBar'
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

const useChangeHomeButton = () => {
  const { onClick } = useSaveHomeAddress()
  return {
    icon: 'cross',
    onClick,
  }
}

const NavigationContent = ({ children }) => (
  <Pane alignSelf="center" display="flex" flexDirection="row">
    {children}
  </Pane>
)

NavigationContent.propTypes = {
  children: PropTypes.node,
}

export const Navigation = () => (
  <NavigationBar>
    <NavigationContent>
      <SideBarToggle side="left" />
      <MenuItem fontWeight="bold" {...useHomeButton()} />
    </NavigationContent>
    <NavigationContent>
      <DiographNavigation />
    </NavigationContent>
    <NavigationContent>
      <LensesNavigation />
      <MenuItem fontWeight="bold" {...useChangeHomeButton()} />
    </NavigationContent>
  </NavigationBar>
)
