import React from 'react'
import PropTypes from 'prop-types'

import { isDefaultImage } from '../../features/diograph/utils/getDefaultImage'

import Diory from './Diory'

const blurStyle = {
  filter: 'blur(20px)',
  inset: '-40px',
  backgroundColor: '#9bc53d',
}

const backgroundStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: -1000,
  opacity: 0.9,
}

const BackgroundDiory = ({ diory, ...styleProps }) => {
  const style = {
    ...diory.style,
    image: {
      ...blurStyle,
      ...(diory.style && diory.style.image),
    },
    text: {
      display: 'none',
    },
    links: {
      display: 'none',
    },
    ...styleProps,
  }

  return isDefaultImage(diory.image) ? null : (
    <div style={backgroundStyle}>
      <Diory diory={{ ...diory, style }} />
    </div>
  )
}

BackgroundDiory.propTypes = {
  diory: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    style: PropTypes.object,
  }),
}

export default BackgroundDiory
