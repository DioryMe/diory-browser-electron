import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import { Pane, Icon } from 'evergreen-ui'

import Image from './Image'
import { getBackgroundImage } from '../utils'

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
  },
}

const Diory = ({ diory, onClick, children, ...props }) => {
  const { id, text, image, style: dioryStyle = {}, data } = diory
  const { image: styleImage, text: styleText, ...style } = dioryStyle
  return (
    <Box id={id} {...props} onClick={(event) => onClick && onClick({ diory, event })} {...style}>
      <Box {...defaultStyle.container} background={getRandom(colors)}>
        {image && (
          <Image
            image={image}
            style={styleImage}
            backgroundImage={getBackgroundImage(image, text, '0, 0, 0, 0.2')}
          />
        )}
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
    text: PropTypes.string,
    image: PropTypes.string,
    style: PropTypes.object,
  }),
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default Diory
