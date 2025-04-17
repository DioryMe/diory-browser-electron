import React, { useEffect, useRef } from 'react'

import { Panel } from 'react-resizable-panels'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const SideBarPanel = ({ side, children }) => {
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

SideBarPanel.propTypes = {
  side: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { SideBarPanel }
