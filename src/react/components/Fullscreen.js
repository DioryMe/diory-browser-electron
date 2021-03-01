import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'

const Fullscreen = ({ children, ...props }) => (
  <Box position="fixed" top={0} right={0} bottom={0} left={0} overflow="auto" {...props}>
    {children}
  </Box>
)

Fullscreen.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Fullscreen
