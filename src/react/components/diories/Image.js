import React from 'react'
import Box from 'ui-box'
import PropTypes from 'prop-types'
import { useStore } from '../../store'

export const getImageUrl = (imageUrl) => {
  // Define diograph folder path
  let diographFolderPath
  const [{ connections }] = useStore((state) => state.connectors)
  Object.keys(connections).forEach((path) => {
    if (connections[path].connected) {
      diographFolderPath = path
    }
  })

  // Images from internet
  if (/^http(s)?:\/\//.exec(imageUrl)) {
    return imageUrl
  }

  // Development content (./public)
  if (/^\.\/public/.exec(diographFolderPath)) {
    return `${diographFolderPath.replace('./public', 'http://localhost:3300')}${imageUrl}`
  }

  // Everything else
  return `file://${diographFolderPath}${imageUrl}`
}

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

const getBackgroundImage = (image, gradient, gradientRgba = '255, 255, 255, 0.5') =>
  gradient
    ? `linear-gradient(rgba(${gradientRgba}),rgba(${gradientRgba})), url("${getImageUrl(image)}")`
    : `url("${getImageUrl(image)}")`

export const Image = ({ image, gradient, gradientRgba, ...props }) => (
  <Box
    {...defaultStyle}
    backgroundImage={getBackgroundImage(image, gradient, gradientRgba)}
    {...props}
  />
)

Image.propTypes = {
  image: PropTypes.string,
  style: PropTypes.object,
}
