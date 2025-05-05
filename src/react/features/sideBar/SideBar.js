import React from 'react'
import PropTypes from 'prop-types'

import { SideBarPanel } from './components/SideBarPanel'
import { SideBarContainer } from '../../components/SideBarContainer'
import { SideBarToggle } from './components/SideBarToggle'

const SideBar = ({ side, children }) => (
  <SideBarPanel side={side}>
    <SideBarContainer>
      <SideBarToggle side={side}>{children}</SideBarToggle>
    </SideBarContainer>
  </SideBarPanel>
)

SideBar.propTypes = {
  side: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { SideBar }
