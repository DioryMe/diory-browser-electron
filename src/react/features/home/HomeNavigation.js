import React from 'react'

import { useSelector } from '../../store'
import { useNavigationActions } from '../navigation/useNavigationActions'

import { MenuItem } from '../../components/MenuItem'
import { NavigationContent } from '../navigation/components/NavigationContent'
import { NavigationBar } from '../navigation/components/NavigationBar'

const HomeNavigation = () => {
  const { address } = useSelector((state) => state.home)
  const { onClick } = useNavigationActions()

  return (
    <NavigationBar>
      <NavigationContent>
        <MenuItem
          diory={{ text: 'DIORY', key: address }}
          fontWeight="bold"
          paddingLeft={10}
          onClick={onClick}
        />
      </NavigationContent>
    </NavigationBar>
  )
}

export { HomeNavigation }
