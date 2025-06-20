import React from 'react'
import PropTypes from 'prop-types'

import { PanelGroup } from 'react-resizable-panels'

import { debounce } from '../../utils'
import { useSidePanel } from './useSidePanel'

const PanelContainer = ({ direction = 'horizontal', children, sidePanels }) => {
  const actions = {}
  sidePanels.forEach((sidePanel, index) => {
    if (sidePanel) {
      const { onWidthChange } = useSidePanel(sidePanel)
      actions[index] = onWidthChange
    }
  })

  const onWidthChange = (widths) => {
    widths.forEach((width, index) => {
      actions[index] && actions[index](width)
    })
  }

  return (
    <PanelGroup direction={direction} onLayout={debounce(onWidthChange, 100)}>
      {children}
    </PanelGroup>
  )
}

PanelContainer.propTypes = {
  direction: PropTypes.string,
  sidePanels: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
}

export { PanelContainer }
