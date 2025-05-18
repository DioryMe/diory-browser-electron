import React from 'react'
import PropTypes from 'prop-types'

import { useSideBar } from '../useSideBar'
import { MenuItem } from '../../../components/MenuItem'

const SideBarToggle = ({ side }) => {
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

SideBarToggle.propTypes = {
  side: PropTypes.string.isRequired,
}

export { SideBarToggle }
