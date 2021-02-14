import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import { Pane, Icon } from 'evergreen-ui'

import Image from './Image'
import Video from './Video'

const colors = ['#5bc0eb', '#fcd600', '#9bc53d', '#e55934', '#fa7921']
const getRandom = (array) => array[Math.floor(Math.random() * array.length)]

const defaultStyle = {
  container: {
    position: 'relative',
    height: '100%',
  },
  text: {
    position: 'relative',
    padding: '16px',
    color: 'white',
    fontWeight: 'bold',
  },
}

const Diory = ({ diory, onClick, children, ...props }) => {
  const { id, text, image, video, style: dioryStyle = {}, data } = diory
  const {
    image: styleImage,
    video: styleVideo,
    text: styleText,
    width: flexBasis,
    ...style
  } = dioryStyle
  return (
    <Box
      id={id}
      flexBasis={flexBasis}
      height="100%"
      {...props}
      {...style}
      onClick={(event) => onClick && onClick({ diory, event })}
    >
      <Box {...defaultStyle.container} background={getRandom(colors)}>
        {image && (
          <Image
            image={`file://${process.env.PWD}${image}`}
            style={styleImage}
            gradient={Boolean(text)}
            gradientRgba="0, 0, 0, 0.2"
          />
        )}
        {video && <Video video={video} style={styleVideo} />}
        {text && (
          <Box {...defaultStyle.text} {...styleText}>
            {text}
          </Box>
        )}
        {data && data.icon && (
          <Pane>
            <Icon key="icon" size={80} style={{ width: '100%', opacity: 0.8 }} {...data} />
          </Pane>
        )}
      </Box>
      {children}
    </Box>
  )
}

Diory.propTypes = {
  diory: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    video: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
  }),
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default Diory
