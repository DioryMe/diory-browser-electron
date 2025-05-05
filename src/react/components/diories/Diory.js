import React from 'react'
import PropTypes from 'prop-types'
import Box from 'ui-box'
import { Pane, Icon } from 'evergreen-ui'

import Image from './Image'

const defaultStyle = {
  container: {
    position: 'relative',
    height: '100%',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  text: {
    position: 'relative',
    padding: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold',
  },
  links: {
    position: 'absolute',
    padding: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold',
    top: 0,
    right: 0,
  },
}

const Diory = ({ diory, onClick, children, ...props }) => {
  const { id, text, image, style: dioryStyle = {}, data, links } = diory
  const {
    image: styleImage,
    text: styleText,
    links: styleLinks,
    width: flexBasis,
    background = '#414141',
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
      <Box {...defaultStyle.container} background={background}>
        {image && (
          <Image
            image={image}
            style={styleImage}
            gradient={Boolean(text) && !/^data:/.exec(image)}
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
        {links && links.length && (
          <Box {...defaultStyle.links} {...styleLinks}>
            {links.length}
          </Box>
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
    data: PropTypes.array,
    links: PropTypes.array,
  }),
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default Diory
