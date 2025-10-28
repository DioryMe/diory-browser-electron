import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { getDefaultImage } from '../../features/diograph/utils/getDefaultImage'

import { Image } from './Image'

const defaultStyle = {
  objectFit: 'cover',
  objectPosition: 'center center',
  height: '100%',
  width: '100%',
}

const GridImage = ({ image, style }) => {
  const [isBroken, setIsBroken] = useState(false)

  if (isBroken) {
    return <Image image={getDefaultImage()} />
  }

  return (
    <img
      alt={image}
      src={image}
      style={{ ...defaultStyle, ...style }}
      onError={() => setIsBroken(true)}
    />
  )
}

GridImage.propTypes = {
  image: PropTypes.string,
  style: PropTypes.object,
}

export { GridImage }
