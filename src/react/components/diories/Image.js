import React from 'react'
import Box from 'ui-box'
import PropTypes from 'prop-types'
import { useStore } from '../../store'

export const getImageUrl = (imageUrl) => {
  const [{ connections }] = useStore((state) => state.connectors)
  console.log(connections)
  let filePathPrefix
  Object.keys(connections).forEach((path) => {
    if (connections[path].connected) {
      filePathPrefix = path
    }
  })

  // Images from internet
  if (/^http(s)?:\/\//.exec(imageUrl)) {
    return imageUrl
  }

  console.log(`${imageUrl}`)
  console.log(`${filePathPrefix}`)

  // Development content (./public)
  if (/^\.\/public/.exec(filePathPrefix)) {
    return `${filePathPrefix.replace('./public', 'http://localhost:3300')}${imageUrl}`
  }

  // Everything else
  console.log(`file://${filePathPrefix}${imageUrl}`)
  return `file://${filePathPrefix}${imageUrl}`
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
