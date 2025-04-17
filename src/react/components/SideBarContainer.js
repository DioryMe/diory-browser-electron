import React from 'react'
import { Pane } from 'evergreen-ui'
import PropTypes from 'prop-types'

export const SideBarContainer = ({ children }) => (
  <Pane
    id="left"
    height="100%"
    backgroundColor="#222"
    display="flex"
    flexDirection="column"
    justifyContent="top"
  >
    {children}
  </Pane>
)

SideBarContainer.propTypes = {
  children: PropTypes.node,
}
