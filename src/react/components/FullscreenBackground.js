import React from 'react'
import PropTypes from 'prop-types'
import Fullscreen from './Fullscreen'

const backgroundGradient = {
  backgroundImage: 'linear-gradient(rgba(50,50,50), rgba(50,50,50),rgba(0,0,0))',
}

const ScrollBackground = ({ children, ...props }) => (
  <Fullscreen overflow="hidden" {...backgroundGradient} {...props}>
    {children}
  </Fullscreen>
)

ScrollBackground.propTypes = {
  children: PropTypes.node,
}

export default ScrollBackground
