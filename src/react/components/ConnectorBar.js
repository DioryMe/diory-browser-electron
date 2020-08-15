import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const ConnectorBar = ({ children }) => (
  <Pane
    {...{
      display: 'flex',
      position: 'fixed',
      zIndex: 15,
      bottom: 0,
      cursor: 'pointer',
      left: '50%',
      padding: 8,
      transform: 'translateX(-50%)',
    }}
  >
    {children}
  </Pane>
)

ConnectorBar.defaultProps = {
  children: null,
}

ConnectorBar.propTypes = {
  children: PropTypes.node,
}

export default ConnectorBar
