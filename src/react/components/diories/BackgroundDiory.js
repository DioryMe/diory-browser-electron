import React from 'react'
import PropTypes from 'prop-types'
import { Pane, Heading } from 'evergreen-ui'
import BackgroundVideo from './BackgroundVideo'

import Image from './Image'

const BackgroundDiory = ({ diory, gradient, gradientRgba, onClick, children, ...props }) => {
  const { id, text, image, video, style: dioryStyle = {} } = diory
  const { text: textStyle, image: imageStyle, video: videoStyle, ...style } = dioryStyle
  return (
    <Pane
      id={id}
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
      {video && <BackgroundVideo video={video} zIndex={-1} position="fixed" {...videoStyle} />}
      <Heading
        color={image ? 'white' : 'rgb(102, 120, 138)'}
        fontWeight="bold"
        width="100%"
        {...textStyle}
        onClick={(event) => onClick({ diory, event })}
      >
        {text || '`'}
      </Heading>
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
