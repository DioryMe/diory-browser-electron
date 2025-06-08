import React from 'react'
import Box from 'ui-box'
import PropTypes from 'prop-types'

const defaultStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

const Image = ({ image, children, ...props }) => (
  <Box backgroundImage={`url("${image}")`} {...defaultStyle} {...props}>
    {children}
  </Box>
)

Image.propTypes = {
  image: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
}

export { Image }
