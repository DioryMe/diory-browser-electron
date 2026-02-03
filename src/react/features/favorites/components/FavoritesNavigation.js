import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from '../../../components/menu/MenuItem'
import { NavigationContent } from '../../navigation/components/NavigationContent'
import { NavigationBar } from '../../navigation/components/NavigationBar'

const FavoritesNavigation = ({ onLogout }) => (
  <NavigationBar>
    <NavigationContent>
      <MenuItem
        diory={{ icon: 'log-out' }}
        onClick={onLogout}
        fontWeight="bold"
        transform="scaleX(-1)"
      />
    </NavigationContent>
  </NavigationBar>
)

FavoritesNavigation.propTypes = {
  onLogout: PropTypes.func.isRequired,
}

export { FavoritesNavigation }
