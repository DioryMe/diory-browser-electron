import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-resizable-panels'

import { useSideBar } from '../useSideBar'

const SideBarPanel = ({ side, children }) => {
  const { sideBarWidth } = useSideBar(side)

  const ref = useRef()
  useEffect(() => {
    if (ref.current) {
      ref.current.resize(sideBarWidth)
    }
  }, [ref, sideBarWidth])

  return (
    <Panel ref={ref} defaultSize={sideBarWidth} minSize={1} style={{ position: 'relative' }}>
      {children}
    </Panel>
  )
}

SideBarPanel.propTypes = {
  side: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { SideBarPanel }
