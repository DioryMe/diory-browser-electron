import React from 'react'
import PropTypes from 'prop-types'

import { useSidePanel } from './useSidePanel'

import { SidePanelSize } from './components/SidePanelSize'
import { SidePanelContainer } from '../../components/SidePanelContainer'
import { SidePanelToggle } from './components/SidePanelToggle'

const SidePanel = ({ side, children }) => {
  const { sidePanelWidth, showSidePanel } = useSidePanel(side)

  return (
    <SidePanelSize width={sidePanelWidth}>
      <SidePanelContainer>
        <SidePanelToggle show={showSidePanel}>{children}</SidePanelToggle>
      </SidePanelContainer>
    </SidePanelSize>
  )
}

SidePanel.propTypes = {
  side: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { SidePanel }
