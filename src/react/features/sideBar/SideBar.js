import React from 'react'
import PropTypes from 'prop-types'

import { useSideBar } from './useSideBar'

import { SideBarResize } from './components/SideBarResize'
import { SideBarContainer } from '../../components/SideBarContainer'
import { SideBarToggle } from './components/SideBarToggle'
import { SideBarToggleButton } from './components/SideBarToggleButton'

const SideBar = ({ side, children }) => {
  const { sideBarWidth, showSideBar } = useSideBar(side)

  return (
    <SideBarResize width={sideBarWidth}>
      <SideBarContainer>
        <SideBarToggle show={showSideBar}>{children}</SideBarToggle>
      </SideBarContainer>
    </SideBarResize>
  )
}

SideBar.propTypes = {
  side: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { SideBar }
