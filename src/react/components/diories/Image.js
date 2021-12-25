import React from 'react'
import Box from 'ui-box'
import PropTypes from 'prop-types'

import { useSelector } from '../../store'

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

const getBackgroundImage = (absoluteImageFileUrl, gradient, gradientRgba = '255, 255, 255, 0.5') =>
  gradient
    ? `linear-gradient(rgba(${gradientRgba}),rgba(${gradientRgba})), url("${absoluteImageFileUrl}")`
    : `url("${absoluteImageFileUrl}")`

const Image = ({ image, gradient, gradientRgba, children, ...props }) => {
  const { dioryFolderLocation } = useSelector((state) => state.settings)
  const absoluteImageFileUrl = convertToFileUrl(image, dioryFolderLocation)
  return (
    <Box
      {...defaultStyle}
      backgroundImage={getBackgroundImage(absoluteImageFileUrl, gradient, gradientRgba)}
      {...props}
    >
      {children}
    </Box>
  )
}

Image.propTypes = {
  image: PropTypes.string,
  style: PropTypes.object,
  gradient: PropTypes.bool,
  gradientRgba: PropTypes.string,
  children: PropTypes.node,
}

export default Image
