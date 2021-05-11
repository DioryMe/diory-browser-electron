import React from 'react'
import Box from 'ui-box'
import PropTypes from 'prop-types'
import { convertToFileUrl } from '../../utils'

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

const useGetBackgroundImage = (image, gradient, gradientRgba = '255, 255, 255, 0.5') =>
  gradient
    ? `linear-gradient(rgba(${gradientRgba}),rgba(${gradientRgba})), url("${convertToFileUrl(
        image
      )}")`
    : `url("${convertToFileUrl(image)}")`

const Image = ({ image, gradient, gradientRgba, ...props }) => (
  <Box
    {...defaultStyle}
    backgroundImage={useGetBackgroundImage(image, gradient, gradientRgba)}
    {...props}
  />
)

Image.propTypes = {
  image: PropTypes.string,
  style: PropTypes.object,
  gradient: PropTypes.bool,
  gradientRgba: PropTypes.string,
}

export default Image
