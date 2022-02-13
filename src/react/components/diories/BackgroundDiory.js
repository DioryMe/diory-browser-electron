import React from 'react'
import PropTypes from 'prop-types'

import Diory from './Diory'

const blurStyle = {
  filter: 'blur(20px)',
  inset: '-40px',
  backgroundColor: '#9bc53d',
}

const BackgroundDiory = ({ diory, children }) => {
  const style = {
    ...diory.style,
    zIndex: -1000,
    image: {
      ...blurStyle,
      ...(diory.style && diory.style.image),
    },
  }

  return (
    <>
      <Diory diory={{ ...diory, style }} />
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
