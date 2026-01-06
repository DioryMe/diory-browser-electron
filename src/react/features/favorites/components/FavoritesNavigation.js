import React from 'react'

import { MenuItem } from '../../../components/menu/MenuItem'
import { NavigationContent } from '../../navigation/components/NavigationContent'
import { NavigationBar } from '../../navigation/components/NavigationBar'

const FavoritesNavigation = ({ diory, onLogout, onDioryClick }) => (
  <NavigationBar>
    <NavigationContent>
      <MenuItem
        diory={{ icon: 'log-out' }}
        onClick={onLogout}
        fontWeight="bold"
        transform="scaleX(-1)"
      />
      <MenuItem diory={diory} fontWeight="bold" color="white" onClick={onDioryClick} />
    </NavigationContent>
  </NavigationBar>
)

export { FavoritesNavigation }
