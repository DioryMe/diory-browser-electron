import React from 'react'
import PropTypes from 'prop-types'

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

FavoritesNavigation.propTypes = {
  diory: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
  onDioryClick: PropTypes.func.isRequired,
}

export { FavoritesNavigation }
