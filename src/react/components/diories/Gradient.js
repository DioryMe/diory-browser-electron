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

const getBackground = (gradientRgba = '0, 0, 0, 0.3') =>
  `linear-gradient(rgba(${gradientRgba}), rgba(0, 0, 0, 0))`

const Gradient = ({ gradientRgba, ...props }) => (
  <Box {...defaultStyle} background={getBackground(gradientRgba)} {...props} />
)

Gradient.propTypes = {
  gradientRgba: PropTypes.string,
  children: PropTypes.node,
}

export { Gradient }
