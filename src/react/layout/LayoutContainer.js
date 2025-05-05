import React from 'react'
import { useSelector } from 'react-redux'
import { PanelGroup } from 'react-resizable-panels'

import PropTypes from 'prop-types'
import { useDispatchActions } from '../store'

import { setSideBarWidth } from '../features/sideBar/sideBarActions'

import { debounce } from '../utils'

import Fullscreen from '../components/Fullscreen'

const LayoutContainer = ({ children }) => {
  const { sideBarWidth } = useSelector((state) => state.sideBar)

  const { dispatch } = useDispatchActions()
  const onLayout = (widths) => {
    const newRightSideBarWidth = widths[widths.length - 1]
    if (newRightSideBarWidth !== sideBarWidth.right) {
      dispatch(setSideBarWidth('right', widths[widths.length - 1]))
    }
  }

  return (
    <Fullscreen top={44}>
      <PanelGroup direction="horizontal" onLayout={debounce(onLayout, 100)}>
        {children}
      </PanelGroup>
    </Fullscreen>
  )
}

LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export { LayoutContainer }
