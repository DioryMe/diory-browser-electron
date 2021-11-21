import React from 'react'
import PropTypes from 'prop-types'

const videoStyles = {
  display: 'block',
  height: '100%',
  margin: '0 auto',
}

const Video = ({ playRef, video, controls, loop, autoPlay, cover }) => (
  <video
    ref={playRef}
    src={video}
    controls={controls}
    loop={loop}
    autoPlay={autoPlay}
    style={{
      ...videoStyles,
      ...(!cover && { maxWidth: '100%' }),
    }}
  />
)

Video.defaultProps = {
  controls: false,
  loop: true,
  autoPlay: true,
  cover: false,
}

Video.propTypes = {
  playRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  video: PropTypes.string.isRequired,
  controls: PropTypes.bool,
  loop: PropTypes.bool,
  autoPlay: PropTypes.bool,
  cover: PropTypes.bool,
}

export default Video
