import React from 'react'
import PropTypes from 'prop-types'

import { useSideBar } from '../useSideBar'
import { MenuItem } from '../../../components/MenuItem'

const SideBarToggleButton = ({ side }) => {
  const { showSideBar, toggleSideBar } = useSideBar(side)

  const closeIcon = side === 'left' ? 'right' : 'left'
  const icon = showSideBar ? side : closeIcon
  return (
    <MenuItem
      icon={`chevron-${icon}`}
      onClick={toggleSideBar}
      alignSelf={side === 'left' ? 'flex-end' : 'flex-start'}
      data-testid="toggleSideBar"
    />
  )
}

SideBarToggleButton.propTypes = {
  side: PropTypes.string.isRequired,
}

export { SideBarToggleButton }
