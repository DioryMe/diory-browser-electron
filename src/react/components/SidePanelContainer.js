import React from 'react'
import { Pane } from 'evergreen-ui'
import PropTypes from 'prop-types'

export const SidePanelContainer = ({ children }) => (
  <Pane height="100%" backgroundColor="#222" display="flex" flexDirection="column">
    {children}
  </Pane>
)

SidePanelContainer.propTypes = {
  children: PropTypes.node,
}
