import React, { useEffect, useRef } from 'react'

import { useSidebarData } from '../utils/useSidebarData'
import { useKey } from '../utils/useKey'

import { SideBarContainer } from '../../../components/SideBarContainer'
import { FavoritesView } from './FavoritesView'
import SideBarToggle from './SideBarToggle'
import SideBar from '../SideBar'
import { Panel } from 'react-resizable-panels'
import { useSelector } from 'react-redux'

export const SideBarPanel = ({ side, children }) => {
  const { sideBarWidth } = useSelector((state) => state.sideBar)
  const width = sideBarWidth[side]

  const ref = useRef()
  useEffect(() => {
    if (ref.current) {
      ref.current.resize(width)
    }
  }, [ref, width])

  return (
    <Panel ref={ref} defaultSize={width} minSize={1} style={{ position: 'relative' }}>
      {children}
    </Panel>
  )
}
