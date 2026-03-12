import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem } from '../../../components/menu/MenuItem'
import { NavigationContent } from '../../navigation/components/NavigationContent'

const HomeNavigation = ({ home, onLogout }) => (
  <>
    <NavigationContent>
      <MenuItem diory={home} color="white" fontWeight="bold" />
    </NavigationContent>
    <NavigationContent paddingRight={8}>
      <MenuItem diory={{ icon: 'log-out' }} onClick={onLogout} fontWeight="bold" />
    </NavigationContent>
  </>
)

HomeNavigation.propTypes = {
  home: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
}

export { HomeNavigation }
