import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import Image from './Image'
import Diory from './Diory'
import Fullscreen from '../Fullscreen'

const blurStyle = {
  filter: 'blur(20px)',
  top: '-20px',
  left: '-20px',
  bottom: '-20px',
  right: '-20px',
}

const BackgroundDiory = ({ diory, onClick, children, ...props }) => {
  const style = {
    ...diory.style,
    image: {
      ...(diory.style && diory.style.image),
      ...blurStyle,
    },
  }

  return (
    <Pane
      height="100%"
      display="flex"
      flexWrap="wrap"
      margin={24}
      alignContent="flex-start"
      {...props}
    >
      <Fullscreen marginTop={48}>
        <Diory diory={{ ...diory, style }}>
          <Image image={diory.image} backgroundSize="contain" />
        </Diory>
      </Fullscreen>
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
