import React from 'react'
import Box from 'ui-box'

const FullScreenView = ({ children, ...props }) => (
  <Box position="absolute" top={0} right={0} bottom={0} left={0} children={children} {...props} />
)

export default FullScreenView
