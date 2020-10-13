import React from 'react'
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

const Video = ({
  video,
  controls = true,
  loop = false,
  autoPlay = false,
  children,
  cover = false,
  ...props
}) => (
  <Box {...defaultStyle} {...props}>
    <video
      controls={controls}
      loop={loop}
      autoPlay={autoPlay}
      style={{
        ...videoStyles,
        ...(!cover && { maxWidth: '100%' }),
      }}
    >
      <source src={video} type="video/mp4" />
      <track kind="captions" />
    </video>
    {children}
  </Box>
)

export default Video
