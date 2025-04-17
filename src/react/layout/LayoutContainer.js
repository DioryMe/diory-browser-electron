import React from 'react'
import { PanelGroup } from 'react-resizable-panels'

import { useDispatchActions } from '../store'

import { setSideBarWidth } from '../features/sideBar/sideBarActions'

import { debounce } from '../utils'
import Fullscreen from '../components/Fullscreen'
import { useSelector } from 'react-redux'

export const LayoutContainer = ({ children }) => {
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
