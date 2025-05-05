import React from 'react'
import PropTypes from 'prop-types'

import { useSideBarToggle } from '../useSideBar'
import { MenuItem } from '../../../components/MenuItem'

const SideBarToggle = ({ side, children }) => {
  const { showSideBar, toggleSideBar } = useSideBarToggle(side)

  const closeIcon = side === 'left' ? 'right' : 'left'
  const icon = showSideBar ? side : closeIcon
  return (
    <>
      <MenuItem
        icon={`chevron-${icon}`}
        onClick={toggleSideBar}
        alignSelf={side === 'left' ? 'flex-end' : 'flex-start'}
        data-testid="toggleSideBar"
      />
      {showSideBar ? children : null}
    </>
  )
}

SideBarToggle.propTypes = {
  side: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { SideBarToggle }
