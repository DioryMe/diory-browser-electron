import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from '../../../components/menu/MenuItem'
import { NavigationContent } from '../../navigation/components/NavigationContent'
import { NavigationBar } from '../../navigation/components/NavigationBar'

const HomeNavigation = ({ onLogout }) => (
  <NavigationBar>
    <NavigationContent>
      <MenuItem diory={{ text: 'DIORY' }} color="white" fontWeight="bold" />
    </NavigationContent>

    <NavigationContent paddingRight={8}>
      <MenuItem diory={{ icon: 'log-out' }} onClick={onLogout} fontWeight="bold" />
    </NavigationContent>
  </NavigationBar>
)

HomeNavigation.propTypes = {
  onLogout: PropTypes.func.isRequired,
}

export { HomeNavigation }
