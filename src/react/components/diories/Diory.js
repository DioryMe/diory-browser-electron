import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import { Pane, Icon } from 'evergreen-ui'
import Image from './Image'

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
  const { id, text, image, style: dioryStyle = {}, data } = diory
  const { image: styleImage, text: styleText, width: flexBasis, ...style } = dioryStyle
  return (
    <Box
      id={id}
      flexBasis={flexBasis}
      height="100%"
      {...props}
      {...style}
      onClick={(event) => onClick && onClick({ diory, event })}
    >
      <Box {...defaultStyle.container} background="#fa7921">
        {image && (
          <Image
            image={image}
            style={styleImage}
            gradient={Boolean(text) && !RegExp('^data:').exec(image)}
            gradientRgba="0, 0, 0, 0.2"
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
    id: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
  }),
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default Diory
