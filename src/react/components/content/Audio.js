import React from 'react'
import PropTypes from 'prop-types'

const videoStyles = {
  display: 'block',
  height: '100%',
  margin: '0 auto',
}

const Audio = ({ playRef, audio, controls, loop, autoPlay, children, cover }) => (
  <audio
    ref={playRef}
    src={audio}
    controls={controls}
    loop={loop}
    autoPlay={autoPlay}
    style={{
      ...videoStyles,
      ...(!cover && { maxWidth: '100%' }),
    }}
  />
)

Audio.defaultProps = {
  controls: false,
  loop: true,
  autoPlay: true,
  cover: false,
}

Audio.propTypes = {
  playRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
  audio: PropTypes.string.isRequired,
  controls: PropTypes.bool,
  loop: PropTypes.bool,
  autoPlay: PropTypes.bool,
  cover: PropTypes.bool,
  children: PropTypes.node,
}

export default Audio
