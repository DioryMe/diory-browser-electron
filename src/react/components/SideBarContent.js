import React from 'react'
import { Pane } from 'evergreen-ui'
import PropTypes from 'prop-types'

export const SideBarContent = ({ children }) => (
  <Pane
    id="left"
    height="100%"
    backgroundColor="#222"
    paddingLeft={24}
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
  >
    {children}
  </Pane>
)

SideBarContent.propTypes = {
  children: PropTypes.node,
}
