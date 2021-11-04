import React from 'react'
import Box from 'ui-box'
import PropTypes from 'prop-types'
import { convertRelativePath, convertToFileUrl } from '../../utils'
import { useStore } from '../../store'

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
    ? `linear-gradient(rgba(${gradientRgba}),rgba(${gradientRgba})), url("${convertToFileUrl(
        image
      )}")`
    : `url("${convertToFileUrl(image)}")`

const Image = ({ image, gradient, gradientRgba, ...props }) => {
  const [{ folderLocation }] = useStore((state) => state.diograph)
  const absoluteImageUrl = convertRelativePath(image, folderLocation)
  return (
    <Box
      {...defaultStyle}
      backgroundImage={getBackgroundImage(absoluteImageUrl, gradient, gradientRgba)}
      {...props}
    />
  )
}

Image.propTypes = {
  image: PropTypes.string,
  style: PropTypes.object,
  gradient: PropTypes.bool,
  gradientRgba: PropTypes.string,
}

export default Image
