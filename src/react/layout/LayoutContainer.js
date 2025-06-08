import React from 'react'
import PropTypes from 'prop-types'

import { PanelGroup } from 'react-resizable-panels'

import { useSideBar } from '../features/sideBar/useSideBar'

import { debounce } from '../utils'

import Fullscreen from '../components/Fullscreen'

const LayoutContainer = ({ children }) => {
  const { onWidthChange: onWidthChangeLeft } = useSideBar('left')
  const { onWidthChange: onWidthChangeRight } = useSideBar('right')

  const onWidthChange = (widths) => {
    onWidthChangeLeft(widths[0])
    onWidthChangeRight(widths[widths.length - 1])
  }

  return (
    <PanelGroup direction="horizontal" onLayout={debounce(onWidthChange, 100)}>
      {children}
    </PanelGroup>
  )
}

LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export { LayoutContainer }
