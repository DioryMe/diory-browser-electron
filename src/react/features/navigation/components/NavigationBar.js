import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const NavigationBar = ({ side, children, ...props }) => (
  <Pane
    zIndex={10}
    height="32px"
    flex="0 0 32px"
    display="flex"
    justifyContent={side || 'space-between'}
    {...props}
  >
    {children}
  </Pane>
)

NavigationBar.propTypes = {
  side: PropTypes.string,
  children: PropTypes.node,
}

export { NavigationBar }
