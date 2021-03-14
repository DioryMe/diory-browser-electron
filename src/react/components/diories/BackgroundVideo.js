import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import Video from './Video'

const overlayStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
}

const BackgroundVideo = ({ video, ...props }) => (
  <Video video={video} loop autoPlay controls={false} cover {...props}>
    <Box {...overlayStyle} />
  </Video>
)

BackgroundVideo.propTypes = {
  video: PropTypes.string,
}

export default BackgroundVideo
