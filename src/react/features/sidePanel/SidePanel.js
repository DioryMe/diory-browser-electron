import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'
import { PanelResizeHandle } from 'react-resizable-panels'

import { useSidePanel } from './useSidePanel'

import { SidePanelSize } from './components/SidePanelSize'
import { SidePanelToggle } from './components/SidePanelToggle'

const SidePanelContainer = ({ children }) => (
  <Pane height="100%" display="flex" flexDirection="column">
    {children}
  </Pane>
)

SidePanelContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const SidePanel = ({ side, children }) => {
  const { sidePanelWidth, showSidePanel } = useSidePanel(side)

  return (
    <>
      {(side === 'right' || side === 'bottom') && <PanelResizeHandle />}
      <SidePanelSize width={sidePanelWidth}>
        <SidePanelContainer>
          <SidePanelToggle show={showSidePanel}>{children}</SidePanelToggle>
        </SidePanelContainer>
      </SidePanelSize>
      {side === 'left' && <PanelResizeHandle />}
    </>
  )
}

SidePanel.propTypes = {
  side: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { SidePanel }
