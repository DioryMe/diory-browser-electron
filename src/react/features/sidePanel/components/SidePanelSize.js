import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-resizable-panels'

const SidePanelSize = ({ width, children }) => {
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

SidePanelSize.propTypes = {
  width: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
}

export { SidePanelSize }
