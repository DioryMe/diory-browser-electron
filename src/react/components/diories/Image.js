import React from 'react'
import Box from 'ui-box'
import PropTypes from 'prop-types'
import { useStore } from '../../store'

export const getImageUrl = (imageUrl) => {
  const [{ connections }] = useStore((state) => state.connectors)
  console.log(connections)
  const filePathPrefix = Object.keys(connections)[1]
  console.log(filePathPrefix)

  if (/^http(s)?:\/\//.exec(imageUrl)) {
    return imageUrl
  }

  return filePathPrefix
    ? `file://${filePathPrefix}${imageUrl}`
    : `http://localhost:3300/${imageUrl}`
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
