import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from 'evergreen-ui'

import { useSideBar } from './useSideBar'

import Icon from '../../components/Icon'

const SideBarNavigation = ({ side }) => {
  const { showSideBar, toggleSideBar } = useSideBar(side)
  const closeIcon = side === 'left' ? 'right' : 'left'
  const icon = showSideBar ? side : closeIcon
  return (
    <IconButton
      appearance="minimal"
      icon={<Icon icon={`chevron-${icon}`} size={24} />}
      onClick={toggleSideBar}
      data-testid="toggleSideBar"
    />
  )
}

SideBarNavigation.propTypes = {
  side: PropTypes.string,
}

export default SideBarNavigation
