import React, { useState } from 'react'
import Box from 'ui-box'
import PropTypes from 'prop-types'
import { getDefaultImage } from '../../../shared/getDefaultImage'
import Diory from './Diory'

const defaultStyle = {
  objectFit: 'cover',
  objectPosition: 'center center',
  height: '100%',
  width: '100%',
}

const GridImage = ({ image, children, ...props }) => {
  const [isBroken, setIsBroken] = useState(false)

  if (isBroken) {
    return (
      <Diory
        diory={{
          text: 'Image not found',
          image: getDefaultImage(),
        }}
      />
    )
  }

  return (
    <img
      alt={image}
      src={image}
      style={{ ...defaultStyle, ...props }}
      onError={() => setIsBroken(true)}
    />
  )
}

GridImage.propTypes = {
  image: PropTypes.string,
  children: PropTypes.node,
}

export { GridImage }
