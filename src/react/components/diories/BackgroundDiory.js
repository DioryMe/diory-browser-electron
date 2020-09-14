import React from 'react'
import PropTypes from 'prop-types'
import { Pane, Heading } from 'evergreen-ui'

import Image from './Image'

const BackgroundDiory = ({ diory, onClick, children }) => {
  const { id, text, image, style: dioryStyle = {} } = diory
  const { image: imageStyle, text: textStyle, ...style } = dioryStyle
  return (
    <Pane
      id={id}
      height="100%"
      display="flex"
      flexWrap="wrap"
      margin={24}
      alignContent="flex-start"
      style={style}
    >
      <Image iamge={image} zIndex={-1} style={imageStyle} />
      {text && (
        <Heading
          color="darkgrey"
          fontWeight="bold"
          width="100%"
          {...textStyle}
          onClick={(event) => onClick({ diory, event })}
        >
          {text}
        </Heading>
      )}
      {children}
    </Pane>
  )
}

BackgroundDiory.propTypes = {
  diory: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    style: PropTypes.object,
  }),
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default BackgroundDiory
