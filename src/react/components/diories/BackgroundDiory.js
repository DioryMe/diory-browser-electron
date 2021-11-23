import React from 'react'
import PropTypes from 'prop-types'

import Image from './Image'
import Diory from './Diory'
import Fullscreen from '../Fullscreen'

const blurStyle = {
  filter: 'blur(20px)',
  inset: '-40px',
  backgroundColor: '#9bc53d',
}

const BackgroundDiory = ({ diory, children }) => {
  const style = {
    ...diory.style,
    background: 'transparent',
    image: {
      ...(diory.style && diory.style.image),
      backgroundSize: 'contain',
    },
  }

  return (
    <>
      <Image image={diory.image} style={blurStyle} />
      <Fullscreen>
        <Diory diory={{ ...diory, style }} />
      </Fullscreen>
      {children}
    </>
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
