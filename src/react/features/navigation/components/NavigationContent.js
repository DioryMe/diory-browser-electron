import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

const NavigationContent = ({ children, ...props }) => (
  <Pane alignSelf="center" display="flex" flexDirection="row" {...props}>
    {children}
  </Pane>
)

NavigationContent.propTypes = {
  children: PropTypes.node,
}

export { NavigationContent }
