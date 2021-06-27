import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'

const defaultStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundImage: 'linear-gradient(rgba(50,50,50), rgba(50,50,50),rgba(0,0,0))',
}

const videoStyles = {
  display: 'block',
  height: '100%',
  margin: '0 auto',
}

const Video = ({ video, controls, loop, autoPlay, children, cover, ...props }) => (
  <Box {...defaultStyle} {...props}>
    <video
      src={video}
      controls={controls}
      loop={loop}
      autoPlay={autoPlay}
      style={{
        ...videoStyles,
        ...(!cover && { maxWidth: '100%' }),
      }}
    />
    {children}
  </Box>
)

Video.defaultProps = {
  controls: true,
  loop: false,
  autoPlay: false,
  cover: false,
}

Video.propTypes = {
  video: PropTypes.string.isRequired,
  controls: PropTypes.bool,
  loop: PropTypes.bool,
  autoPlay: PropTypes.bool,
  cover: PropTypes.bool,
  children: PropTypes.node,
}

export default Video
