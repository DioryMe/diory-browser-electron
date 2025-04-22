import React from 'react'
import PropTypes from 'prop-types'

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
}

const BackgroundDiory = ({ diory, children, ...styleProps }) => {
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

  return (
    <div style={backgroundStyle}>
      <Diory diory={{ ...diory, style }} />
      {children}
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
  children: PropTypes.node,
}

export default BackgroundDiory
