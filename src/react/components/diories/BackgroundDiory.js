import React from 'react'
import PropTypes from 'prop-types'
import {Heading, Pane} from 'evergreen-ui'

import {useDrag} from 'react-dnd'

import Image from './Image'

const BackgroundDiory = ({ diory, gradient, gradientRgba, children, ...props }) => {
  const { id, text, image, style: dioryStyle = {} } = diory
  const { text: textStyle, image: imageStyle, ...style } = dioryStyle
  const [, drag] = useDrag({
    type: 'DIORY',
    item: {
      id: diory.id,
    },
  })

  return (
    <Pane
      id={`background-${id}`}
      height="100%"
      display="flex"
      flexWrap="wrap"
      margin={24}
      alignContent="flex-start"
      style={style}
      {...props}
    >
      {image && (
        <Image
          image={image}
          zIndex={-1}
          position="fixed"
          gradient={gradient}
          gradientRgba={gradientRgba}
          {...imageStyle}
        />
      )}
      { text && <Heading
        ref={drag}
        color={image ? 'white' : 'rgb(102, 120, 138)'}
        fontWeight="bold"
        width="100%"
        {...textStyle}
      >
        {text}
      </Heading>}
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
  gradient: PropTypes.bool,
  gradientRgba: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default BackgroundDiory
