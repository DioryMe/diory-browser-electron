import React from 'react'
import PropTypes from 'prop-types'

import { PanelGroup } from 'react-resizable-panels'

import { debounce } from '../../utils'
import { closeSidePanel, openSidePanel, setSidePanelWidth } from './sidePanelActions'
import { useDispatchActions, useSelector } from '../../store'

const useWidthChange = () => {
  const { showSidePanels, sidePanelWidths } = useSelector((state) => state.sidePanel)

  const { dispatch } = useDispatchActions()
  return {
    onWidthChange: (newWidth, side) => {
      const sidePanelWidth = sidePanelWidths[side]
      const showSidePanel = showSidePanels[side]
      if (newWidth !== sidePanelWidth && newWidth !== 1) {
        dispatch(setSidePanelWidth(side, newWidth))
      }
      if (newWidth > 1 && !showSidePanel) {
        dispatch(openSidePanel(side))
      }
      if (newWidth === 1 && showSidePanel) {
        dispatch(closeSidePanel(side))
      }
    },
  }
}

const PanelContainer = ({ direction = 'horizontal', children, sidePanels }) => {
  const { onWidthChange } = useWidthChange()

  const onLayout = (widths) => {
    widths.forEach((newWidth, index) => {
      if (sidePanels[index]) {
        onWidthChange(newWidth, sidePanels[index])
      }
    })
  }

  return (
    <PanelGroup direction={direction} onLayout={debounce(onLayout, 100)}>
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
