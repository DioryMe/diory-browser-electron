import React from 'react'
import Box from 'ui-box'
import PropTypes from 'prop-types'

import Image from './Image'

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

const getBackgroundImage = (image, text) => text
  ? `linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)), url(${encodeURI(image)})`
  : `url(${encodeURI(image)})`

const Diory = ({ diory, onClick, children, ...props }) => {
  const { text, image, style = {} } = diory
  return (
    <Box {...props}>
      <Box
        {...defaultStyle.container}
        onClick={event => onClick && onClick({ diory, event })}
      >
        {image && (
          <Image
            image={image}
            style={style.image}
            backgroundImage={getBackgroundImage(image, text)}
          />
        )}
        {text && (
          <Box {...defaultStyle.text} {...style.text}>
            {text}
          </Box>
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
