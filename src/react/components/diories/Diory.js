import React from 'react'
import Box from 'ui-box'
import PropTypes from 'prop-types'

import Image from './Image'
import { getBackgroundImage } from '../../lib/utils'

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
  const { id, text, image, style = {} } = diory
  return (
    <Box
      id={id}
      {...props}
      onClick={event => onClick && onClick({ diory, event })}
    >
      <Box {...defaultStyle.container}>
        {image && (
          <Image
            image={image}
            style={style.image}
            backgroundImage={getBackgroundImage(image, text, '0, 0, 0, 0.2')}
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
