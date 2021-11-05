import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import { useStore } from '../../store'

import Image from './Image'
import { convertRelativePath } from '../../utils'

const BackgroundDiory = ({ diory, gradient, gradientRgba, onClick, children, ...props }) => {
  const { id, image, style: dioryStyle = {} } = diory
  const { image: imageStyle, ...style } = dioryStyle

  const [{ folderLocation }] = useStore((state) => state.diograph)

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
          image={convertRelativePath(image, folderLocation)}
          zIndex={-1}
          position="fixed"
          gradient={gradient}
          gradientRgba={gradientRgba}
          {...imageStyle}
        />
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
  gradient: PropTypes.bool,
  gradientRgba: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default BackgroundDiory
