import React from 'react'
import PropTypes from 'prop-types'

import { useSidePanel } from '../useSidePanel'
import { MenuItem } from '../../../components/menu/MenuItem'

const SidePanelToggleButton = ({ side }) => {
  const { showSidePanel, toggleSidePanel } = useSidePanel(side)

  const closeIcon = side === 'left' ? 'right' : 'left'
  const icon = showSidePanel ? side : closeIcon
  return (
    <MenuItem
      diory={{ icon: `chevron-${icon}` }}
      onClick={toggleSidePanel}
      alignSelf={side === 'left' ? 'flex-end' : 'flex-start'}
      data-testid="toggleSidePanel"
    />
  )
}

SidePanelToggleButton.propTypes = {
  side: PropTypes.string.isRequired,
}

export { SidePanelToggleButton }
