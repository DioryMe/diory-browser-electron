import React from 'react'
import PropTypes from 'prop-types'
import Fullscreen from './Fullscreen'

const backgroundGradient = {
  backgroundImage: 'linear-gradient(rgba(50,50,50), rgba(50,50,50),rgba(0,0,0))',
}

const FullscreenBackground = ({ children, ...props }) => (
  <Fullscreen overflow="hidden" {...backgroundGradient} {...props}>
    {children}
  </Fullscreen>
)

FullscreenBackground.propTypes = {
  children: PropTypes.node,
}

export default FullscreenBackground
